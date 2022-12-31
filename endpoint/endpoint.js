class EndpointController {
    constructor ($iframe, callback) {
        this.$iframe = $iframe;
        this.$iframe.attr('src', '/endpoint/index.html');
        this.$iframe.one('load', () => {
            this.window = this.$iframe.get(0).contentWindow;
            this.window.load(() => {
                Logger.log('ECLIENT', 'Client started');
                callback(this);
            });
        });
    }

    destroy () {
        this.window.destroy(() => {
            Logger.log('ECLIENT', 'Client stopped');
            this.$iframe.attr('src', '');
        });
    }

    login (server, username, password, callback, error) {
        this.window.callback['login'] = callback;
        this.window.error['login'] = error;

        Logger.log('ECLIENT', `Logging in as ${ username }@${ server }`);
        this.window.login(server, username, password);
    }

    login_query_only (server, username, password, callback, error) {
        // Bind error callbacks
        this.window.error['login'] = error;
        this.window.error['query'] = error;

        // Bind success callbacks
        this.window.callback['query'] = callback;
        this.window.callback['login'] = () => {
            // Fire collect on login success
            Logger.log('ECLIENT', `Collecting data`);
            this.window.query_collect();
        }

        // Login
        Logger.log('ECLIENT', `Logging in as ${ username }@${ server }`);
        this.window.login(server, username, password);
    }

    login_query_many (server, username, password, filter, callback, error, progress) {
        // Bind error callbacks
        this.window.error['login'] = error;
        this.window.error['query'] = error;

        // Bind success callbacks
        this.window.callback['progress'] = progress;
        this.window.callback['query'] = callback;
        this.window.callback['login'] = (text) => {
            // Query all
            Logger.log('ECLIENT', `Query many`);
            this.window.query_many(filter(text));
        }

        // Login
        Logger.log('ECLIENT', `Logging in as ${ username }@${ server }`);
        this.window.login(server, username, password);
    }

    login_query_hall_of_fame (server, username, password, callback, error, progress) {
        // Bind error callbacks
        this.window.error['login'] = error;
        this.window.error['query'] = error;

        // Bind success callbacks
        this.window.callback['progress'] = progress;
        this.window.callback['query'] = callback;
        this.window.callback['login'] = () => {
            // Query all
            Logger.log('ECLIENT', `Query HOF`);
            this.window.query_hall_of_fame();
        }

        // Login
        Logger.log('ECLIENT', `Logging in as ${ username }@${ server }`);
        this.window.login(server, username, password);
    }

    query_single (id, callback, error) {
        this.window.callback['query_single'] = callback;
        this.window.error['query'] = callback;

        Logger.log('ECLIENT', `Querying character: ${ id }`);
        this.window.query_single(id);
    }

    query_collect (callback) {
        this.window.callback['query'] = callback;

        Logger.log('ECLIENT', `Collecting data`);
        this.window.query_collect();
    }
}

const Endpoint = new ( class {
    start () {
        return new Promise(resolve => {
            if (!this.$parent) {
                this._createModal();
                this._addBindings();
            }

            this.resolveFunction = resolve;
            this._show();
        })
    }

    _intl (key) {
        return intl(`endpoint.${key}`);
    }

    _show () {
        this.$step1.show();
        this.$step2.hide();
        this.$step3.hide();
        this.$step4.hide();
        this.$step5.hide();
        this.$step6.hide();

        this.$parent.modal({
            centered: true,
            closable: false,
            transition: 'fade'
        }).modal('show');
    }

    _setModeSelection () {
        let selectionMode = SharedPreferences.getRaw('endpoint_mode', 'default');
        switch (selectionMode) {
            case 'own': {
                this.$modeOwn.checkbox('set checked');
                break;
            }
            case 'all':
            case 'all_members': {
                this.$modeAllMembers.checkbox('set checked');
                break;
            }
            case 'all_friends': {
                this.$modeAllFriends.checkbox('set checked');
                break;
            }
            case 'hall_of_fame': {
                this.$modeHallOfFame.checkbox('set checked');
                break;
            }
            default: {
                this.$modeDefault.checkbox('set checked');
            }
        }

        this.$modeDefault.checkbox({ onChecked: () => SharedPreferences.setRaw('endpoint_mode', 'default') });
        this.$modeOwn.checkbox({ onChecked: () => SharedPreferences.setRaw('endpoint_mode', 'own') });
        this.$modeAllMembers.checkbox({ onChecked: () => SharedPreferences.setRaw('endpoint_mode', 'all_members') });
        this.$modeAllFriends.checkbox({ onChecked: () => SharedPreferences.setRaw('endpoint_mode', 'all_friends') });
        this.$modeHallOfFame.checkbox({ onChecked: () => SharedPreferences.setRaw('endpoint_mode', 'hall_of_fame') });
    }

    _showError (text, hard = false) {
        this.$step6.show();

        this.$errorText.text(text);
        this.$errorButton.one('click', () => {
            this.$step6.hide();

            if (hard) {
                this._funcShutdown(false);
            } else {
                this.$step1.show();
            }
        });
    }

    _setDownloading (name) {
        this.downloading.push(name);
        if (this.downloading.length > 0) {
            this.$import.attr('disabled', 'true');
            this.$import.addClass('loading');
        }
    }

    _removeDownloading (name) {
        this.downloading.splice(this.downloading.indexOf(name), 1);
        if (this.downloading.length == 0) {
            this.$import.removeAttr('disabled');
            this.$import.removeClass('loading');
        }
    }

    _hide (actionSuccess) {
        this.resolveFunction(actionSuccess);
        this.$parent.modal('hide');
    }

    _addBindings () {
        // Login Form
        this.$step1 = this.$parent.find('[data-op="step1"]');
        // Unity Loader
        this.$step2 = this.$parent.find('[data-op="step2"]');
        // Player Selector
        this.$step3 = this.$parent.find('[data-op="step3"]');
        // Generic Loader
        this.$step4 = this.$parent.find('[data-op="step4"]');
        // Progress Bar
        this.$step5 = this.$parent.find('[data-op="step5"]');
        // Error
        this.$step6 = this.$parent.find('[data-op="step6"]');

        this.$progress = this.$step5.find('.ui.progress');

        this.$errorText = this.$parent.find('[data-op="error-text"]');
        this.$errorButton = this.$parent.find('[data-op="error-button"]');

        this.$username = this.$parent.find('[data-op="username"]');
        this.$password = this.$parent.find('[data-op="password"]');

        this.$modeDefault = this.$parent.find('[data-op="modeDefault"]').checkbox();
        this.$modeOwn = this.$parent.find('[data-op="modeOwn"]').checkbox();
        this.$modeAllMembers = this.$parent.find('[data-op="modeAllMembers"]').checkbox();
        this.$modeAllFriends = this.$parent.find('[data-op="modeAllFriends"]').checkbox();
        this.$modeHallOfFame = this.$parent.find('[data-op="modeHallOfFame"]').checkbox();
        this._setModeSelection();

        this.$iframe = this.$parent.find('[data-op="iframe"]');
        this.$list = this.$parent.find('[data-op="list"]');
        this.$import = this.$parent.find('[data-op="import"]');
        this.$login = this.$parent.find('[data-op="login"]');

        this.endpoint = undefined;
        this.downloading = [];

        this.$parent.find('[data-op="back"]').click(() => this._funcShutdown(false));

        this.$import.click(() => {
            this.$step4.show();
            this.$step3.hide();
            this.endpoint.query_collect((text) => {
                DatabaseManager.import(text, Date.now(), new Date().getTimezoneOffset() * 60 * 1000).catch((e) => {
                    Toast.error(intl('database.import_error'), e.message);
                    Logger.error(e, 'Error occured while trying to import a file!');
                }).then(() => {
                    this._funcShutdown(true);
                });
            });
        });

        const executeLogin = () => {
            var username = this.$username.val();
            var password = this.$password.val();
            var server = '';

            const mode_own = this.$modeOwn.checkbox('is checked');
            const mode_all_members = this.$modeAllMembers.checkbox('is checked');
            const mode_all_friends = this.$modeAllFriends.checkbox('is checked');
            const mode_hall_of_fame = this.$modeHallOfFame.checkbox('is checked');

            if (/^(.{3,})@(.+\.sfgame\..+)$/.test(username)) {
                [, username, server, ] = username.split(/^(.{3,})@(.+\.sfgame\..+)$/);
            } else {
                Toast.warn(this._intl('user_error.title'), this._intl('user_error.message'));
                return;
            }

            if (username.length < 3 || password.length < 3 || !/\.sfgame\./.test(server)) {
                return;
            } else {
                if (this.endpoint) {
                    this.$step1.hide();
                    this.$step4.show();

                    if (mode_own) {
                        this._funcLoginSingle(server, username, password);
                    } else if (mode_all_members) {
                        this._funcLoginAll(server, username, password, 'members');
                    } else if (mode_all_friends) {
                        this._funcLoginAll(server, username, password, 'friends');
                    } else if (mode_hall_of_fame) {
                        this._funcLoginHOF(server, username, password);
                    } else {
                        this._funcLogin(server, username, password);
                    }
                } else {
                    this.$step1.hide();
                    this.$step2.show();
                    this.endpoint = new EndpointController(this.$iframe, () => {
                        this.$step2.hide();
                        this.$step4.show();

                        if (mode_own) {
                            this._funcLoginSingle(server, username, password);
                        } else if (mode_all_members) {
                            this._funcLoginAll(server, username, password, 'members');
                        } else if (mode_all_friends) {
                            this._funcLoginAll(server, username, password, 'friends');
                        } else if (mode_hall_of_fame) {
                            this._funcLoginHOF(server, username, password);
                        } else {
                            this._funcLogin(server, username, password);
                        }
                    });
                }
            }
        }

        this.$login.click(() => executeLogin());
        this.$step1.on('keyup', (event) => {
            if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
                executeLogin();
            }
        });
    }

    _funcLoginSingle (server, username, password) {
        this.endpoint.login_query_only(server, username, password, (text) => {
            DatabaseManager.import(text, Date.now(), new Date().getTimezoneOffset() * 60 * 1000).catch((e) => {
                Toast.error(intl('database.import_error'), e.message);
                Logger.error(e, 'Error occured while trying to import a file!');
            }).then(() => {
                this._funcShutdown(true);
            });
        }, () => {
            this.$step4.hide();
            this._showError(this._intl('credentials_error'));
        });
    };

    _funcLoginHOF (server, username, password) {
        this.endpoint.login_query_hall_of_fame(server, username, password, (text) => {
            DatabaseManager.import(text, Date.now(), new Date().getTimezoneOffset() * 60 * 1000).catch((e) => {
                Toast.error(intl('database.import_error'), e.message);
                Logger.error(e, 'Error occured while trying to import a file!');
            }).then(() => {
                this._funcShutdown(true);
            });
        }, () => {
            this.$step4.hide();
            this.$step5.hide();
            this._showError(this._intl('credentials_error'));
        }, percentDone => {
            this.$step4.hide();
            this.$step5.show();
            this.$progress.progress({
                percent: percentDone
            })
        });
    }

    _funcLoginAll (server, username, password, kind = 'members') {
        this.endpoint.login_query_many(server, username, password, (text) => {
            const [members, friends] = text.split(';');
            return kind == 'members' ? members : friends;
        }, (text) => {
            DatabaseManager.import(text, Date.now(), new Date().getTimezoneOffset() * 60 * 1000).catch((e) => {
                Toast.error(intl('database.import_error'), e.message);
                Logger.error(e, 'Error occured while trying to import a file!');
            }).then(() => {
                this._funcShutdown(true);
            });
        }, () => {
            this.$step4.hide();
            this.$step5.hide();
            this._showError(this._intl('credentials_error'));
        }, percentDone => {
            this.$step4.hide();
            this.$step5.show();
            this.$progress.progress({
                percent: percentDone
            })
        });
    };

    _funcLogin (server, username, password) {
        this.endpoint.login(server, username, password, (text) => {
            this.$step4.hide();
            this.$step3.show();

            let content = '';
            let [members, friends] = text.split(';');

            for (var name of members.split(',')) {
                content += `
                    <div class="item">
                        <div class="ui checkbox w-full">
                            <input type="checkbox" name="${ name }">
                            <label for="${ name }">
                                <div class="flex justify-content-between">
                                    ${ name }
                                    <i class="ui user circle icon"></i>
                                </div>
                            </label>
                        </div>
                    </div>
                `;
            }

            for (var name of friends.split(',').slice(1)) {
                content += `
                    <div class="item">
                        <div class="ui checkbox w-full">
                            <input type="checkbox" name="${ name }">
                            <label for="${ name }">
                                <div class="flex justify-content-between">
                                    ${ name }
                                    <i class="ui thumbs up icon"></i>
                                </div>
                            </label>
                        </div>
                    </div>
                `;
            }

            this.$list.html(content);
            $('.list .checkbox').checkbox({
                uncheckable: false
            }).first().checkbox('set checked', 'true').checkbox('set disabled');

            for (const checkbox of $('.list .checkbox').slice(1)) {
                const name = $(checkbox).find('input').attr('name');

                $(checkbox).checkbox('setting', 'onChecked', () => {
                    this._setDownloading(name);
                    this.endpoint.query_single(name, (value) => {
                        this._removeDownloading(name);
                    }, () => {
                        this.$step3.hide();
                        this._showError(this._intl('download_error'));
                    });
                })
            }
        }, () => {
            this.$step4.hide();
            this._showError(this._intl('credentials_error'));
        });
    }

    _funcShutdown (actionSuccess) {
        if (this.endpoint) {
            this.endpoint.destroy();
            this.endpoint = undefined;
        }

        this._hide(actionSuccess);
    }

    _createModal () {
        this.$parent = $(`
            <div class="ui basic modal">
                <iframe class="opacity-0 pointer-events-none position-fixed" data-op="iframe"></iframe>
                <div class="ui grid">
                    <div class="five wide column"></div>
                    <div class="six wide column">
                        <div data-op="step1" style="display: none;">${this._createStep1()}</div>
                        <div data-op="step2" style="display: none;">${this._createStep2()}</div>
                        <div data-op="step3" style="display: none;">${this._createStep3()}</div>
                        <div data-op="step4" style="display: none;">${this._createStep4()}</div>
                        <div data-op="step5" style="display: none;">${this._createStep5()}</div>
                        <div data-op="step6" style="display: none;">${this._createStep6()}</div>
                    </div>
                    <div class="five wide column"></div>
                </div>
            </div>
        `);
        
        $(window.body).append(this.$parent);
    }

    _createStep1 () {
        return `
            <div class="ui inverted form">
                <div class="field">
                    <label>${this._intl('username')}</label>
                    <div class="ui inverted input">
                        <input type="text" autocomplete="username" data-op="username" name="username" placeholder="username@s1.sfgame.de">
                    </div>
                </div>
                <div class="field">
                    <label>${this._intl('password')}</label>
                    <input type="password" autocomplete="current-password" name="password" data-op="password">
                </div>
                <div class="grouped fields">
                    <div class="field">
                        <div class="ui radio checkbox" data-op="modeOwn">
                            <input type="radio" name="endpointMode">
                            <label>${this._intl('mode.own')}</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox" data-op="modeDefault">
                            <input type="radio" name="endpointMode" checked="checked">
                            <label>${this._intl('mode.default')}</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox" data-op="modeAllMembers">
                            <input type="radio" name="endpointMode">
                            <label>${this._intl('mode.guild')}</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox" data-op="modeAllFriends">
                            <input type="radio" name="endpointMode">
                            <label>${this._intl('mode.friends')}</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox" data-op="modeHallOfFame">
                            <input type="radio" name="endpointMode">
                            <label>${this._intl('mode.hall_of_fame')}</label>
                        </div>
                    </div>
                </div>
                <div class="ui two buttons">
                    <button class="ui secondary button" data-op="back">${this._intl('cancel')}</button>
                    <button class="ui primary button" data-op="login">${this._intl('continue')}</button>
                </div>
            </div>
        `;
    }

    _createStep2 () {
        return `
            <img class="ui centered image unity-loading" src="/endpoint/logo.png">
            <h3 class="ui white centered header">${this._intl('step2.title')}</h3>
        `;
    }

    _createStep3 () {
        return `
            <h2 class="ui header centered white">${this._intl('step3.title')}</h2>
            <hr/>
            <div class="ui celled relaxed list text-white" data-op="list" style="height: 30em; overflow-y: auto; font-size: 110%;">

            </div>
            <div class="ui two buttons">
                <button class="ui secondary button" data-op="back">${this._intl('cancel')}</button>
                <button class="ui primary button" data-op="import">${this._intl('continue')}</button>
            </div>
        `;
    }

    _createStep4 () {
        return `
            <div class="ui large active text loader">${this._intl('step4.title')}</div>
        `;
    }

    _createStep5 () {
        return `
            <h3 class="ui white centered header">${this._intl('step4.message')}</h3>
            <div class="ui green active progress" data-percent="0">
                <div class="bar"></div>
            </div>
        `;
    }

    _createStep6 () {
        return `
            <h2 class="ui white centered header" data-op="error-text"></h2>
            <br/>
            <br/>
            <button class="ui secondary button fluid" data-op="error-button">${this._intl('continue')}</button>
        `;
    }
})();

const StatisticsIntegration = new (class {
    configure ({ profile, type, callback, scope, generator }) {
        this.type = type;
        this.profile = profile;
        this.callback = callback;
        this.scope = scope;
        this.generator = generator;

        // Parent
        this.$parent = $(this._html()).appendTo($(document.body));

        // Containers
        this.$container = this.$parent.find('[data-op="container"]');
        this.$list = this.$parent.find('[data-op="list"]');

        // Buttons
        this.$poll = this.$parent.find('[data-op="poll"]');
        this.$poll.click(() => this._poll());
        
        this.$importEndpoint = this.$parent.find('[data-op="import-endpoint"]');
        this.$importEndpoint.click(() => this._importEndpoint());
        
        this.$importFile = this.$parent.find('[data-op="import-file"]');
        this.$importFile.change((event) => this._importFile(event));

        // Integration options
        this.options = new OptionsHandler(
            'integration',
            {
                limit: 0,
                slot: 0,
                ignore: []
            }
        )
    }

    _html () {
        return `
            <div class="position-absolute left-8 top-20 z-2" style="width: 18em;">
                <div class="ui fluid basic button" data-op="poll"><i class="sync alternate icon"></i>${intl(`simulator.poll.${this.type}`)}</div>
                <div data-op="container" style="display: none;">
                    <div data-op="list"></div>
                    <div class="mt-2">
                        <div class="ui two basic tiny fluid buttons">
                            <div class="ui button" data-op="import-endpoint">Endpoint</div>
                            <label class="ui button" for="endpoint-button-upload">HAR</label>
                            <input type="file" multiple data-op="import-file" accept=".har,.json" class="ui invisible file input" id="endpoint-button-upload">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    _importEndpoint () {
        Endpoint.start().then((actionSuccess) => {
            if (actionSuccess) {
                this._poll();
            }
        });
    }

    _importFile (event) {
        Loader.toggle(true);

        const promises = [];
        for (const file of Array.from(event.target.files)) {
            promises.push(file.text().then((fileContent) => DatabaseManager.import(fileContent, file.lastModified)).catch((e) => {
                Toast.error(intl('database.import_error'), e.message);
                Logger.error(e, 'Error occured while trying to import a file!');
            }));
        }

        Promise.all(promises).then(() => this._poll());
    }

    _generateItem (item) {
        if (this.type === 'players') {
            return {
                visible: `${item.Name} @ ${item.Prefix}`,
                hidden: `${intl('editor.level')} ${item.Level} ${intl(`general.class${item.Class}`)}`
            };
        } else /* if (this.type === 'guilds') */ {
            return {
                visible: `${item.Name} @ ${item.Prefix}`,
                hidden: formatDate(item.Timestamp)
            };
        }
    }

    _prepare (scope) {
        _sort_des(scope, item => item.Timestamp);

        if (this.options.ignore) {
            scope = scope.filter(item => !this.options.ignore.includes(item));
        }

        if (this.options.limit) {
            scope = scope.slice(0, this.options.limit);
        }

        return scope;
    }

    _generate () {
        this.$list.empty();

        if (typeof this.generator === 'undefined') {
            for (const item of this._prepare(this.scope(DatabaseManager))) {
                const { visible, hidden } = this._generateItem(item);
    
                this.$list.append(
                    $(`
                        <div class="ui small fluid basic vertical animated button !mt-2">
                            <div class="visible content text-black">${visible}</div>
                            <div class="hidden content text-black">${hidden}</div>
                        </div>
                    `).click(() => this.callback(item))
                );
            }
        } else {
            this.generator(DatabaseManager, this.$list);
        }
    }

    _poll () {
        Loader.toggle(true);
        DatabaseManager.load(Object.assign({ slot: this.options.slot }, this.profile)).then(() => {
            this._generate();

            this.$container.show();
        }).catch((e) => {
            Toast.error(intl('database.open_error.title'), intl('database.open_error.message'));
            Logger.error(e, `Database could not be opened! Reason: ${e.message}`);
            
            this.$container.hide();
        }).finally(function () {
            Loader.toggle(false);
        });
    }
})();
