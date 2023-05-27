Site.ready({ type: 'simulator' }, function (urlParams) {
    SimulatorUtils.configure({
        params: urlParams,
        onLog: (callback) => {
            executeSimulation(1, 50, callback);
        }
    });
    
    DOM.input({
        element: DOM.byID('sim-threads'),
        key: 'hellevator_sim/threads',
        def: 4,
        validator: (value)=> !isNaN(value) && value >= 1
    })

    DOM.input({
        element: DOM.byID('sim-iterations'),
        key: 'hellevator_sim/iterations',
        def: 5000,
        validator: (value)=> !isNaN(value) && value >= 1
    })

    // Validation
    const $simulateButton = $('#simulate');
    function updateButtons (valid) {
        if (valid) {
            $simulateButton.removeClass('disabled');
        } else {
            $simulateButton.addClass('disabled');
        }
    }

    // Editor
    Editor.createPlayerEditor('#sim-editor');
    const editor = new (class extends Editor {
        _bind () {
            this.fields['name'].editable(false);

            this.fields['range_theme'].initialize({
                values: HellevatorEnemies.HELLEVATOR_THEMES.map((value) => ({
                    name: intl(`hellevator.theme.${value}`),
                    value
                })),
                value: HellevatorEnemies.HELLEVATOR_THEMES[0]
            });

            for (const field of this.fieldsArray) {
                field.triggerAlways = true;
            }

            super._bind();
        }

        fill (object) {
            this.pauseListener();

            super.fill(object);
            
            this.resumeListener();
            this._changeListener();
        }

        _changeListener () {
            if (!this._ignoreChanges) {
                updateButtons(this.valid());
            }
        }
    })(
        '#sim-editor',
        null,
        Editor.getExtendedEditorFields(
            '#sim-editor',
            {
                range_start: new Field('#range-start', '1', Field.createRange(1, 500)),
                range_end: new Field('#range-end', '500', Field.createRange(1, 500)),
                range_theme: new Field('#range-theme', '')
            }
        )
    )

    // Paste
    $('input').on('paste', function (event) {
        event.stopPropagation();
    });

    function preparePlayerData (data) {
        let object = data.Class ? data : new PlayerModel(data);

        ItemModel.forceCorrectRune(object.Items.Wpn1);
        ItemModel.forceCorrectRune(object.Items.Wpn2);

        if (object.Class == WARRIOR && typeof object.BlockChance == 'undefined') {
            object.BlockChance = object.Items.Wpn2.DamageMin;
        }

        if (object.Class != ASSASSIN) {
            object.Items.Wpn2 = ItemModel.empty();
        }

        return object;
    }

    $(document.body).on('paste', function (event) {
        try {
            const pasteData = event.originalEvent.clipboardData.getData('text');
            const pasteJson = JSON.parse(pasteData);

            if (typeof pasteJson === 'object') {
                editor.fill(preparePlayerData(pasteJson));
            } else if (Array.isArray(pasteJson)) {
                editor.fill(preparePlayerData(pasteJson[0]));
            }
        } catch (e) {
            console.info(e);
        }
    });

    // Integration
    StatisticsIntegration.configure({
        profile: SELF_PROFILE,
        type: 'players',
        cheats: true,
        scope: (dm) => dm.getLatestPlayers(true),
        callback: (player) => {
            editor.fill(player);
        }
    });

    // Display
    const $enemyList = $('#enemy-list');
    function renderEnemies (enemies, scores) {
        let content = '';

        let firstPossibleLoss = enemies.length - 1;
        for (let i = 0; i < enemies.length; i++) {
            if ((scores[i] || 0) != 1) {
                firstPossibleLoss = i;
                break;
            }
        }

        let lastPossibleLoss = 0;
        for (let i = enemies.length - 1; i >= firstPossibleLoss; i--) {
            if ((scores[i] || 0) != 0) {
                lastPossibleLoss = i;
                break;
            }
        }

        if (firstPossibleLoss == lastPossibleLoss && enemies.length > 10) {
            content = `
                <div class="row">
                    <div class="sixteen wide text-center column">
                        ${intl(`hellevator.win.${scores[0] === 0 ? 'none' : 'all'}`, { count: enemies.length - 1 })}    
                    </div>
                </div>
            `
        } else {
            if (firstPossibleLoss > 0) {
                content += `
                    <div class="row">
                        <div class="sixteen wide text-center column">
                            ${intl('hellevator.win.first', { count: firstPossibleLoss })}    
                        </div>
                    </div>
                `
            }

            for (const [index, enemy] of Object.entries(enemies)) {
                if (index < firstPossibleLoss || index > lastPossibleLoss) {
                    continue;
                }
                
                const score = scores[index] || 0;

                content += `
                    <div class="row !p-0">
                        <div class="two wide text-center column">${enemy.Floor}</div>
                        <div class="three wide text-center column">
                            <img class="ui medium centered image" style="width: 50px;" src="${_classImageUrl(enemy.Class)}">
                        </div>
                        <div class="three wide text-center column">
                            <img class="ui medium centered image" style="width: 50px;" src="res/element${enemy.Items.Wpn1.AttributeTypes[2] - 40}.webp">    
                        </div>
                        <div class="three wide text-center column">${enemy.Level}</div>
                        <div class="five wide text-center column">${score === 0 ? intl('pets.bulk.not_possible') : `${(100 * score).toFixed(2)}%`}</div>
                    </div>
                `
            }

            if (lastPossibleLoss < enemies.length - 1) {
                content += `
                    <div class="row">
                        <div class="sixteen wide text-center column">
                            ${intl('hellevator.win.last', { count: enemies.length - 1 - lastPossibleLoss })}    
                        </div>
                    </div>
                `
            }
        }

        $enemyList.html(content);
    }

    async function executeSimulation (instances, iterations, logCallback) {
        if (editor.valid()) {
            $enemyList.empty();

            const player = editor.read();

            const start = player.GroupTournament.Floor;
            const end = player.RangeEnd;

            const enemies = await HellevatorEnemies.floorRange(start, Math.max(start, end), player.RangeTheme);
            const scores = [];
            let logs = [];

            const batch = new WorkerBatch('hellevator');

            for (const [index, enemy] of Object.entries(enemies)) {
                batch.add(
                    ({ score, logs: _logs }) => {
                        scores[index] = score;

                        if (logCallback) {
                            logs = logs.concat(_logs);
                        }
                    },
                    {
                        player,
                        iterations,
                        enemy,
                        log: !!logCallback,
                        config: SimulatorUtils.config,
                    }
                );
            }

            batch.run(instances).then((duration) => {
                Toast.info(intl('simulator.toast.title'), intl('simulator.toast.message', { duration: _formatDuration(duration) }));

                renderEnemies(enemies, scores);

                if (logs.length > 0) {
                    logCallback({
                        fights: logs,
                        players: [player].concat(enemies),
                        config: SimulatorUtils.config
                    });
                }
            });
        }
    }
    
    // Buttons
    $('#simulate').click(function () {
        const instances = Math.max(1, Number($('#sim-threads').val()) || 4);
        const iterations = Math.max(1, Number($('#sim-iterations').val()) || 5000);

        executeSimulation(instances, iterations);
    });
});