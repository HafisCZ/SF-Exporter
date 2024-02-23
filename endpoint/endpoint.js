class EndpointController {
    constructor (iframe, progressCallback) {
        this.iframe = iframe;
        this.progressCallback = progressCallback;
    }

    async destroy () {
        await this.window.destroy();

        Logger.log('ECLIENT', 'Client stopped');

        this.iframe.src = '';
    }

    load () {
        return new Promise((resolve) => {
            this.iframe.src = '/endpoint/index.html';
            this.iframe.addEventListener('load', async () => {
                this.window = this.iframe.contentWindow;
                await this.window.load();

                Logger.log('ECLIENT', 'Client started');
                resolve(this);
            }, { once: true });
        }) 
    }

    #promisify (callback) {
        return new Promise((resolve, reject) => {
            this.window.callback = (data) => {
                if (data.error) {
                    reject(data.error);
                } else if (data.progress) {
                    this.progressCallback(data.progress);
                } else {
                    resolve(data);
                }
            }

            callback();
        })
    }

    login (server, username, password) {
        Logger.log('ECLIENT', `Logging in as ${username}@${server}`);

        return this.#promisify(() => {
            this.window.login(server, username, password);
        })
    }

    continueLogin (server, username, id) {
        Logger.log('ECLIENT', `Continuing logging in as ${username}@${server}`);

        return this.#promisify(() => {
            this.window.continue_login(server, username, id);
        })
    }

    query (characterNames) {
        Logger.log('ECLIENT', 'Query many');

        return this.#promisify(() => {
            this.window.query_many(characterNames.join(','));
        })
    }

    querySelf () {
        Logger.log('ECLIENT', 'Query self');

        return this.#promisify(() => {
            this.window.query_self();
        })
    }

    queryHOF () {
        Logger.log('ECLIENT', 'Query HOF');

        return this.#promisify(() => {
            this.window.query_hall_of_fame();
        })
    }
}

const EndpointDialog = new (class EndpointDialog extends Dialog {
    intl (key) {
        return intl(`endpoint.${key}`);
    }

    _applyArguments (allowTemporary = false) {
        if (this._termsAccepted()) {
            this.$step0.hide();
            this.$step1.show();
        } else {
            this.$step0.show();
            this.$step1.hide();
        }

        this.$step2.hide();
        this.$step3.hide();
        this.$step4.hide();
        this.$step5.hide();
        this.$step6.hide();
        this.$step7.hide();

        // Toggle temporary capture checkbox
        this.$temporary.checkbox('set unchecked');
        this.$temporary.parent().toggle(allowTemporary);
    }

    _localizeError (rawError) {
        const error = rawError.toLowerCase().replace(/\s|:/g, '_');

        return this.intl(`errors.${error}`);
    }

    _showError (error, errorCritical = false) {
        this.errorCritical = errorCritical;

        this.$step5.hide();
        this.$step6.show();

        this.$errorText.text(this._localizeError(error));
    }

    _termsAccepted () {
        return SiteOptions.endpoint_terms_accepted === 2;
    }

    _termsAccept () {
        SiteOptions.endpoint_terms_accepted = 2;

        this.$step0.hide();
        this.$step1.show();
    }

    _createBindings () {
        // Terms and Conditions
        this.$step0 = this.$parent.find('[data-op="step0"]');
        this.$step0.operator('accept-terms').click(() => this._termsAccept());
        this.$step0.operator('reject-terms').click(() => {
            Toast.info(intl('terms.toast.rejected.title'), intl('terms.toast.rejected.message'));

            this.close(false);
        });

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
        // Character Selector
        this.$step7 = this.$parent.find('[data-op="step7"]');

        this.$progress = this.$step5.find('.ui.progress');

        this.$errorText = this.$parent.find('[data-op="error-text"]');
        this.$errorButton = this.$parent.find('[data-op="error-button"]');

        this.$errorButton.click(() => {
            this.$step6.hide();

            if (this.errorCritical) {
                this.close(false);
            } else {
                this.$step1.show();
            }
        });

        // Endpoint credentials
        this.$username = this.$parent.find('[data-op="username"]');
        this.$password = this.$parent.find('[data-op="password"]');

        // Endpoint mode
        this.$mode = this.$parent.operator('mode');
        this.$mode.dropdown({
            values: ['own', 'default', 'guild', 'friends', 'hall_of_fame'].map((value) => ({
                value,
                name: this.intl(`mode.${value}`),
                selected: value === Store.shared.get('endpoint_mode', 'default', true)
            })),
            onChange: (value) => {
                if (Store.isPermanent()) {
                    Store.shared.set('endpoint_mode', value, true);
                }
            }
        });

        // Capture mode
        this.$temporary = this.$parent.operator('temporary').checkbox();

        this.$iframe = this.$parent.find('[data-op="iframe"]');
        this.$list = this.$parent.find('[data-op="list"]');
        this.$characterList = this.$parent.operator('character-list');
        this.$login = this.$parent.find('[data-op="login"]');

        this.endpoint = undefined;

        this.$parent.find('[data-op="back"]').click(() => this.close(false));

        this.$import = this.$parent.find('[data-op="import"]');
        this.$import.click(() => {
            this._importSelection();
        });

        const executeLogin = async () => {
            var username = this.$username.val();
            var password = this.$password.val();
            var server = null;

            if (username.includes('@')) {
                // Separate username & server combo
                [ username, server ] = username.split('@', 2);
            } else {
                server = 'sso.playa-games.com';
            }

            const usernameTooShort = username.length < 3;
            const passwordTooShort = password.length < 3;
            const serverInvalid = !/\.(?:sfgame|playa-games)\./.test(server);

            if (usernameTooShort || passwordTooShort || serverInvalid) {
                Toast.warn(this.intl('user_error.title'), this.intl('user_error.message'));
                return;
            } else {
                this.$step1.hide();

                if (typeof this.endpoint === 'undefined') {
                    this.endpoint = new EndpointController(
                        this.$iframe.get(0),
                        (percent) => {
                            this.$step4.hide();
                            this.$step5.show();
                            this.$progress.progress({ percent })
                        }
                    );

                    this.$step2.show();
                    await this.endpoint.load();

                    this.$step2.hide();
                }

                this.$step4.show();

                const promise = this._funcLogin(server, username, password);
                
                const mode = this.$mode.dropdown('get value');
                if (mode === 'own') {
                    this._funcCaptureSelf(promise);
                } else if (mode === 'guild') {
                    this._funcCaptureMany(promise, 'members');
                } else if (mode === 'friends') {
                    this._funcCaptureMany(promise, 'friends');
                } else if (mode === 'hall_of_fame') {
                    this._funcCaptureHOF(promise);
                } else /* default */ {
                    this._funcCaptureSelect(promise);
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

    _import (text) {
        DatabaseManager.import(text, Date.now(), _timestampOffset(), { temporary: this.$temporary.checkbox('is checked') }).catch((e) => {
            Toast.error(intl('database.import_error'), e.message);
            Logger.error(e, 'Error occured while trying to import a file!');
        }).then(() => {
            this.close(true);
        });
    }

    async _getServer (id) {
        if (typeof this.serverList === 'undefined') {
            this.serverList = await fetch('/js/playa/servers.json').then((data) => data.json());
        }

        return this.serverList[id];
    }

    _funcLogin (server, username, password) {
        return this.endpoint.login(server, username, password).then((data) => {
            return new Promise(async (resolve, reject) => {
                if (data.type === 'sso') {
                    this.$characterList.empty();

                    // Inject server url
                    for (const character of data.characters) {
                        character.server = await this._getServer(character.server_id);
                    }

                    // Continue method
                    const continueLogin = (server, name, id) => {
                        this.endpoint.continueLogin(server, name, id)
                        .then((data) => resolve(data))
                        .catch((error) => reject(error));
                    }

                    const characters = _sortAsc(data.characters.filter((c) => c.server), (c) => c.order);
                    if (characters.length > 1) {
                        // Multiple characters in account, must choose
                        for (const { server, name, id } of characters) {
                            const $element = $(`
                                <div class="!border-radius-1 border-gray p-4 background-dark:hover cursor-pointer flex gap-2 items-center">
                                    <div>
                                        <div>${name}</div>
                                        <div class="text-gray">${server}</div>
                                    </div>
                                </div>
                            `);
                            
                            $element.click(() => {
                                this.$step7.hide();
                                this.$step4.show();
    
                                continueLogin(server, name, id);
                            });
    
                            this.$characterList.append($element);
                        }
        
                        this.$step4.hide();
                        this.$step7.show();
                    } else if (characters.length === 1) {
                        // One account, can just continue
                        const { server, name, id } = characters[0];

                        continueLogin(server, name, id);
                    } else {
                        // No accounts, show error
                        reject('playa_account_empty');
                    }
                } else {
                    resolve(data);
                }
            })
        });
    }

    _funcCaptureSelf (promise) {
        promise
        .then(() => this.endpoint.querySelf())
        .then((data) => this._import(data.data))
        .catch((error) => {
            this.$step4.hide();
            this._showError(error);
        })
    };

    _funcCaptureHOF (promise) {
        promise
        .then(() => this.endpoint.queryHOF())
        .then((data) => this._import(data.data))
        .catch((error) => {
            this.$step4.hide();
            this._showError(error);
        })
    }

    _funcCaptureMany (promise, kind = 'members') {
        promise
        .then((data) => this.endpoint.query(data[kind]))
        .then((data) => this._import(data.data))
        .catch((error) => {
            this.$step4.hide();
            this._showError(error);
        })
    };

    _renderSelectItems (array, icon) {
        let html = '';

        for (const name of array) {
            html += `
                <div class="item">
                    <div class="ui inverted checkbox w-full" data-selectable>
                        <input type="checkbox" name="${name}">
                        <label for="${name}">
                            <div class="flex justify-content-between">
                                <span>${name}</span>
                                <i class="ui ${icon} icon"></i>
                            </div>
                        </label>
                    </div>
                </div>
            `;
        }

        return html;
    }

    _funcCaptureSelect (promise) {
        promise
        .then((data) => {
            if (data.members.length > 0 || data.friends.length > 0) {
                this.$list.html(`
                    <div class="item" style="border: none;">
                        <div class="ui inverted checkbox w-full">
                            <input type="checkbox" name="-toggle-select-all">
                            <label for="-toggle-select-all">
                                <span>${this.intl('step3.toggle')}</span>
                            </label>
                        </div>
                    </div>
                    ${this._renderSelectItems(data.members, 'user circle')}
                    ${this._renderSelectItems(data.friends, 'thumbs up')}
                `);

                this.$list.find('.checkbox').checkbox();

                const $toggle = this.$list.find('.checkbox').first();
                $toggle.checkbox({
                    onChecked: () => {
                        this.$list.find('.checkbox[data-selectable]').checkbox('set checked');
                    },
                    onUnchecked: () => {
                        this.$list.find('.checkbox[data-selectable]').checkbox('set unchecked');
                    }
                }).checkbox('set unchecked');

                const recalculateToggle = () => {
                    const total = this.$list.find('.checkbox[data-selectable] input').length;
                    const checked = this.$list.find('.checkbox[data-selectable] input:checked').length;

                    if (total == checked) {
                        $toggle.checkbox('set checked');
                    } else if (checked > 0) {
                        $toggle.checkbox('set indeterminate');
                    } else if (checked === 0) {
                        $toggle.checkbox('set unchecked');
                    }
                }

                this.$list.find('.checkbox[data-selectable]').change(() => {
                    recalculateToggle()
                })

                this.$step4.hide();
                this.$step3.show();
            } else {
                this._funcCaptureSelf(promise);
            }
        }).catch((error) => {
            this.$step4.hide();
            this._showError(error);
        })
    }

    _importSelection () {
        this.$step4.show();
        this.$step3.hide();

        const names = this.$list.find('.checkbox[data-selectable] input:checked').get().map((input) => input.getAttribute('name'));

        this.endpoint.query(names)
            .then((data) => this._import(data.data))
            .catch((error) => {
            this.$step4.hide();
            this._showError(error);
        })
    }

    close (actionSuccess) {
        if (this.endpoint) {
            this.endpoint.destroy();
            this.endpoint = undefined;
        }

        super.close(actionSuccess);
    }

    _createModal () {
        return `
            <div class="very small basic dialog">
                <iframe class="opacity-0 pointer-events-none position-fixed" data-op="iframe"></iframe>
                <div data-op="step0">${this._createStep0()}</div>
                <div data-op="step1">${this._createStep1()}</div>
                <div data-op="step2">${this._createStep2()}</div>
                <div data-op="step3">${this._createStep3()}</div>
                <div data-op="step4">${this._createStep4()}</div>
                <div data-op="step5">${this._createStep5()}</div>
                <div data-op="step6">${this._createStep6()}</div>
                <div data-op="step7">${this._createStep7()}</div>
            </div>
        `;
    }

    // Terms and Conditions screen
    _createStep0 () {
        return `
            <div class="flex flex-col gap-2 p-4" style="border: 1px solid #262626; background: #0b0c0c; border-radius: 0.5em; margin: -2em;">
                <h1 class="ui inverted header text-center !mb-0" style="border-bottom: 1px solid #262626; padding-bottom: 0.25em;">${intl('terms.title')}</h1>
                <div class="text-white">
                    <ul>
                        <li>Endpoint is a small Unity application bundled with the tool that allows you to log into the game and collect limited game data without the lengthy process of creating a HAR file.</li>
                        <li class="mt-2">All data entered is sent directly to the game server without involvement of any 3rd party.</li>
                        <li class="mt-2">It is not possible to capture any other players than those explicitly stated within the application.</li>
                        <li class="mt-2">All data collection is done using normal means, without any use of forbidden actions.</li>
                    </ul>
                </div>
                <h1 class="ui inverted header text-center !mb-0 !mt-0" style="border-bottom: 1px solid #262626; padding-bottom: 0.25em;">${intl('terms.title2')}</h1>
                <div class="text-white">
                    <ul>
                        <li>You can access your S&F Account using your username and password.</li>
                        <li class="mt-2">You can access your unbound character using your character name and server url in the following format: <code>charname@s1.sfgame.de</code>.</li>
                    </ul>
                </div>
                <div class="ui two buttons">
                    <button class="ui secondary button" data-op="reject-terms">${intl('terms.button.reject')}</button>
                    <button class="ui !text-black !background-orange button" data-op="accept-terms">${intl('terms.button.accept')}</button>
                </div>
            </div>
        `;
    }

    // Login screen
    _createStep1 () {
        return `
            <div class="ui inverted form">
                <div class="field">
                    <label>${this.intl('username')}</label>
                    <div class="ui inverted input">
                        <input type="text" autocomplete="username" data-op="username" name="username">
                    </div>
                </div>
                <div class="field">
                    <label>${this.intl('password')}</label>
                    <div class="ui inverted input">
                        <input type="password" autocomplete="current-password" name="password" data-op="password">
                    </div>
                </div>
                <div class="field">
                    <label>${this.intl('mode.title')}</label>
                    <div class="ui fluid selection inverted dropdown" data-op="mode">
                        <div class="text"></div>
                        <i class="dropdown icon"></i>
                    </div>
                </div>
                <div class="field">
                    <div class="ui checkbox" data-op="temporary">
                        <input type="checkbox" class="hidden">
                        <label>${this.intl('temporary')}</label>
                    </div>
                </div>
                <div class="ui two buttons">
                    <button class="ui secondary button" data-op="back">${this.intl('cancel')}</button>
                    <button class="ui !text-black !background-orange button" data-op="login">${this.intl('continue')}</button>
                </div>
            </div>
        `;
    }

    // Unity loader
    _createStep2 () {
        return `
            <img class="ui centered image pulse-loader" src="/endpoint/logo.png">
            <h3 class="ui inverted centered header">${this.intl('step2.title')}</h3>
        `;
    }

    // Selection screen
    _createStep3 () {
        return `
            <h2 class="ui header centered inverted">${this.intl('step3.title')}</h2>
            <hr/>
            <div class="ui celled relaxed inverted list" data-op="list" style="height: 30em; overflow-y: auto; font-size: 110%;">

            </div>
            <div class="ui two buttons">
                <button class="ui secondary button" data-op="back">${this.intl('cancel')}</button>
                <button class="ui !text-black !background-orange button" data-op="import">${this.intl('continue')}</button>
            </div>
        `;
    }

    // Player selection screen
    _createStep7 () {
        return `
            <h2 class="ui header centered inverted">${this.intl('step7.title')}</h2>
            <hr/>
            <div data-op="character-list" class="text-white flex flex-col gap-2" style="height: 30em; overflow-y: auto;">

            </div>
            <button class="ui secondary button w-full" data-op="back">${this.intl('cancel')}</button>
        `;
    }

    // Loader
    _createStep4 () {
        return `
            <div class="ui large text-white active text loader">${this.intl('step4.title')}</div>
        `;
    }

    // Progress bar
    _createStep5 () {
        return `
            <h3 class="ui inverted centered header">${this.intl('step4.message')}</h3>
            <div class="ui green active inverted progress" data-percent="0">
                <div class="bar"></div>
            </div>
        `;
    }

    // Error message
    _createStep6 () {
        return `
            <h2 class="ui inverted centered header" data-op="error-text"></h2>
            <br/>
            <br/>
            <button class="ui secondary button fluid" data-op="error-button">${this.intl('continue')}</button>
        `;
    }
})();

const StatisticsIntegrationOptionsDialog = new (class StatisticsIntegrationOptionsDialog extends Dialog {
    constructor () {
        super({
            key: 'statistics_integration_options',
            dismissable: true
        });
    }

    _createModal () {
        return `
            <div class="small inverted bordered dialog">
                <div class="header">${this.intl('title')}</div>
                <div class="ui inverted form">
                    <div class="field">
                        <label>${this.intl('slot')}:</label>
                        <div class="ui fluid selection inverted dropdown" data-op="slot">
                            <div class="text"></div>
                            <i class="dropdown icon"></i>
                        </div>
                    </div>
                    <div class="field">
                        <label>${this.intl('limit.title')}:</label>
                        <div class="ui inverted input">
                            <input type="number" min="0" placeholder="${this.intl('limit.placeholder')}" data-op="limit">
                        </div>
                    </div>
                    <div class="field">
                        <label>${this.intl('ignored_duration.title')}:</label>
                        <div class="ui fluid search selection inverted dropdown" data-op="ignored_duration">
                            <div class="text"></div>
                            <i class="dropdown icon"></i>
                        </div>
                    </div>
                    <div class="field">
                        <label>${this.intl('ignored_identifiers.title')}:</label>
                        <div class="flex flex-col gap-2 pr-2 overflow-y-scroll" style="height: 15em;" data-op="ignored_identifiers"></div>
                    </div>
                </div>
                <div class="ui two fluid buttons">
                    <button class="ui black button" data-op="cancel">${intl('dialog.shared.cancel')}</button>
                    <button class="ui button !text-black !background-orange" data-op="save">${intl('dialog.shared.save')}</button>
                </div>
            </div>
        `;
    }

    _createBindings () {
        this.$cancel = this.$parent.operator('cancel');
        this.$cancel.click(() => {
            this.close();
        });

        this.$save = this.$parent.operator('save');
        this.$save.click(() => {
            this.close();
            this.callback({
                slot: parseInt(this.$slot.dropdown('get value')),
                limit: parseInt(this.$limit.val()),
                ignored_duration: parseInt(this.$ignored_duration.dropdown('get value')),
                ignored_identifiers: this.$ignored_identifiers.children().toArray().map(x => x.dataset.identifier)
            });
        });

        this.$slot = this.$parent.operator('slot');
        this.$slot.dropdown({
            values: [0, 1, 2, 3, 4, 5].map((i) => ({
                name: i === 0 ? intl('dialog.profile_create.default') : i,
                value: i
            }))
        });

        this.$limit = this.$parent.operator('limit');

        this.$ignored_duration = this.$parent.operator('ignored_duration');
        this.$ignored_duration.dropdown({
            values: [0, 86400000, 604800000, 2592000000, 7776000000].map((i) => ({
                name: this.intl(`ignored_duration.${i}`),
                value: i
            }))
        });

        this.$ignored_identifiers = this.$parent.operator('ignored_identifiers');
    }

    _applyArguments (options, callback) {
        this.options = options;
        this.callback = callback;

        this.$slot.dropdown('set selected', String(options.slot));
        this.$limit.val(options.limit);
        this.$ignored_duration.dropdown('set selected', String(options.ignored_duration));

        this.$ignored_identifiers.empty();
        for (const identifier of options.ignored_identifiers) {
            const $item = $(`
                <div class="ui disabled icon inverted input !opacity-100" data-identifier="${identifier}">
                    <input class="text-black" type="text" disabled="">
                    <i class="ui times link text-black icon"></i>
                </div>
            `);

            const data = _dig(DatabaseManager.isPlayer(identifier) ? DatabaseManager.getPlayer(identifier) : DatabaseManager.getGroup(identifier), 'Latest', 'Data');

            $item.find('input').val(data ? `${data.name} @ ${_formatPrefix(data.prefix)}` : identifier);
            $item.find('i').click(() => {
                $item.remove();
            });

            this.$ignored_identifiers.append($item);
        }
    }
})();

const StatisticsIntegrationCheatsDialog = new (class StatisticsIntegrationCheatsDialog extends Dialog {
    constructor () {
        super({
            key: 'statistics_integration_cheats',
            dismissable: true,
            opacity: 0,
            containerStyle: 'z-index: 1;',
            draggable: true
        })
    }

    _createModal () {
        return `
            <div class="very small inverted bordered dialog">
                <div class="header">${intl('dungeons.cheats.title')}</div>
                <div class="ui small inverted form">
                    <div class="field"><h3 class="ui inverted header">${intl('dungeons.cheats.general')}</h3></div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" class="hidden" data-cheat="enchantments">
                            <label>${intl('dungeons.cheats.enchantments')}</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" class="hidden" data-cheat="runes">
                            <label>${intl('dungeons.cheats.runes')}</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" class="hidden" data-cheat="pets">
                            <label>${intl('dungeons.cheats.pets')}</label>
                        </div>
                    </div>
                    <div class="field"><br/></div>
                    <div class="field"><h3 class="ui inverted header">${intl('dungeons.cheats.potions')}</h3></div>
                    <div class="two fields">
                        <div class="field">
                            <div class="ui checkbox !mt-0">
                                <input type="checkbox" class="hidden" data-cheat="strength">
                                <label>${intl('general.attribute1')}</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui checkbox !mt-0">
                                <input type="checkbox" class="hidden" data-cheat="dexterity">
                                <label>${intl('general.attribute2')}</label>
                            </div>
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <div class="ui checkbox !mt-0">
                                <input type="checkbox" class="hidden" data-cheat="intelligence">
                                <label>${intl('general.attribute3')}</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui checkbox !mt-0">
                                <input type="checkbox" class="hidden" data-cheat="constitution">
                                <label>${intl('general.attribute4')}</label>
                            </div>
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <div class="ui checkbox !mt-0">
                                <input type="checkbox" class="hidden" data-cheat="luck">
                                <label>${intl('general.attribute5')}</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui checkbox !mt-0">
                                <input type="checkbox" class="hidden" data-cheat="life">
                                <label>${intl('general.life_potion')}</label>
                            </div>
                        </div>
                    </div>
                    <div class="field"><br/></div>
                    <div class="field"><h3 class="ui inverted header">${intl('dungeons.cheats.class')}</h3></div>
                    <div class="field">
                        <div class="ui selection inverted dropdown" data-cheat="class">
                            <div class="text"></div>
                            <i class="dropdown icon"></i>
                        </div>
                    </div>
                </div>
                <div class="ui black fluid button" data-op="close">${intl('dialog.shared.close')}</div>
            </div>
        `
    }

    _setCheat (name, value) {
        this.cheats[name] = value;
    }

    _createBindings () {
        this.$checkboxes = this.$parent.find('.checkbox');
        this.$checkboxes.each((index, checkbox) => {
            const name = checkbox.children[0].dataset.cheat;

            $(checkbox).checkbox({
                onChecked: () => {
                    this._setCheat(name, true);
                },
                onUnchecked: () => {
                    this._setCheat(name, false);
                }
            });
        })

        this.$classDropdown = this.$parent.find('[data-cheat="class"]').dropdown({
            values: [
                {
                    name: intl('dungeons.cheats.keep_original'),
                    value: 0
                },
                ... CONFIG.indexes().map((e) => {
                    return {
                        name: `<img class="ui centered image !-ml-3 !mr-2" src="${_classImageUrl(e)}">${intl(`general.class${e}`)}`,
                        value: e
                    };
                })
            ],
            onChange: (value) => {
                this._setCheat('class', parseInt(value));
            }
        })

        this.$close = this.$parent.operator('close');
        this.$close.click(() => {
            this.close();
        })
    }

    _applyArguments (cheats) {
        this.cheats = cheats;

        this.$checkboxes.checkbox('set unchecked');
        this.$classDropdown.dropdown('set selected', '0');
    }
})

const StatisticsIntegration = new (class {
    configure ({ profile, type, callback, scope, generator, cheats }) {
        this.type = type;
        this.profile = profile;
        this.callback = callback;
        this.scope = scope;
        this.generator = generator;
        this.cheats = null;

        // Parent
        this.$parent = $(this.#html()).appendTo($(document.body));

        // Containers
        this.$container = this.$parent.operator('container');
        this.$list = this.$parent.operator('list');

        // Buttons
        this.$poll = this.$parent.operator('poll');
        this.$poll.click(() => this.#poll());
        
        this.$importEndpoint = this.$parent.operator('import-endpoint');
        this.$importEndpoint.click(() => this.#importEndpoint());
        
        this.$importFile = this.$parent.operator('import-file');
        this.$importFile.change((event) => this.#importFile(event));

        this.$showOptions = this.$parent.operator('show-options');
        this.$showOptions.toggle(typeof this.generator === 'undefined');
        this.$showOptions.click(() => this.#showOptions());
        
        this.$showCheats = this.$parent.operator('show-cheats');
        this.$showCheats.toggle(!!cheats);
        this.$showCheats.click(() => this.#showCheats());

        // Integration options
        this.options = new OptionsHandler(
            'integration',
            {
                limit: 0,
                slot: 0,
                ignored_identifiers: [],
                ignored_duration: 0
            }
        )
    }

    #html () {
        return `
            <div class="position-absolute left-8 top-8 z-2" style="width: 18em;">
                <div class="ui fluid basic inverted button" data-op="poll"><i class="sync alternate icon"></i>${intl(`integration.poll.${this.type}`)}</div>
                <div data-op="container" style="display: none;">
                    <div data-op="list"></div>
                    <div class="mt-2 flex">
                        <div class="ui three basic tiny fluid inverted buttons">
                            <div class="ui button" data-op="import-endpoint">${intl('integration.game')}</div>
                            <label class="ui button" for="endpoint-button-upload">${intl('integration.file')}</label>
                            <input type="file" multiple data-op="import-file" accept=".har,.json" class="ui invisible file input" id="endpoint-button-upload">
                            <div class="ui icon button" style="display: none; max-width: 3em;" data-op="show-cheats" data-inverted="" data-position="bottom center" data-tooltip="${intl('integration.tooltip.cheats')}"><i class="ui fire alternate icon"></i></div>
                            <div class="ui icon button" style="display: none; max-width: 3em;" data-op="show-options" data-inverted="" data-position="bottom center" data-tooltip="${intl('integration.tooltip.options')}"><i class="ui cog icon"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    #hideCheats () {
        this.cheats = null;
        this.$showCheats.removeClass('!text-orangered');
    }

    #showCheats () {
        if (this.cheats) {
            StatisticsIntegrationCheatsDialog.openRequested = false
            StatisticsIntegrationCheatsDialog.close();
        } else {
            this.cheats = Object.create(null);
            this.$showCheats.addClass('!text-orangered');
    
            StatisticsIntegrationCheatsDialog.openRequested = true;
            StatisticsIntegrationCheatsDialog.open(this.cheats).then(() => this.#hideCheats());
        }
    }

    #callback (item) {
        if (this.cheats) {
            const copy = new PlayerModel(item.Data);
            this.#applyCheats(copy);

            this.callback(copy);
        } else {
            this.callback(item);
        }
    }

    #applyCheat (player, callback) {
        const models = [player];
        if (player.Companions) {
            models.push(...Object.values(player.Companions));
        }

        models.forEach(callback);
    }

    #applyCheats (player) {
        if (this.cheats.pets) {
            this.#applyCheat(player, (model) => {
                model.Pets = {
                    Water: 40,
                    Light: 40,
                    Earth: 40,
                    Shadow: 40,
                    Fire: 40
                };
            });
        }

        if (this.cheats.enchantments) {
            this.#applyCheat(player, (model) => {
                for (let item of Object.values(model.Items)) {
                    item.HasEnchantment = true;
                };
            });
        }

        // Set potions to player
        const potions = _compact(['strength', 'dexterity', 'intelligence', 'constitution', 'luck', 'life'].map((type, i) => this.cheats[type] ? (i + 1) : null))
        if (potions.length) {
            this.#applyCheat(player, (model) => {
                const potionGroup = potions.slice(0, 3);

                model.Potions = potionGroup.map(type => ({ Type: type, Size: 25 }));
                model.Potions.Life = potionGroup.includes(6) ? 25 : 0;
            });
        }

        if (this.cheats.class) {
            const oldDefinition = CONFIG.fromIndex(player.Class);
            const newDefinition = CONFIG.fromIndex(this.cheats.class);

            const swapAttributes = function (obj) {
                const oldattributes = PlayerModel.ATTRIBUTE_ORDER_BY_ATTRIBUTE[oldDefinition.Attribute].map((kind) => _dig(obj, kind)).map((att) => ({ Base: att.Base, Total: att.Total }));
                const newAttributes = PlayerModel.ATTRIBUTE_ORDER_BY_ATTRIBUTE[newDefinition.Attribute];

                for (let i = 0; i < 3; i++) {
                    for (const type of ['Base', 'Total']) {
                        obj[newAttributes[i]][type] = oldattributes[i][type];
                    }
                }
            }

            // Morph all items to desired class
            for (const [type, item] of Object.entries(player.Items)) {
                player.Items[type] = item.morph(PlayerModel.ATTRIBUTE_TO_TYPE[oldDefinition.Attribute], PlayerModel.ATTRIBUTE_TO_TYPE[newDefinition.Attribute], true);
            }

            // Swap attributes
            swapAttributes(player);

            // Scale damage & armor
            player.Armor = _scale(player.Armor, oldDefinition.MaximumDamageReduction, newDefinition.MaximumDamageReduction);
            player.Items.Wpn1.DamageMin = _scale(player.Items.Wpn1.DamageMin, oldDefinition.WeaponMultiplier, newDefinition.WeaponMultiplier);
            player.Items.Wpn1.DamageMax = _scale(player.Items.Wpn1.DamageMax, oldDefinition.WeaponMultiplier, newDefinition.WeaponMultiplier);

            // Set per-class data
            if (this.cheats.class == WARRIOR) {
                player.Items.Wpn2.DamageMin = newDefinition.SkipChance * 100;
                player.BlockChance = newDefinition.SkipChance * 100;
            } else if (this.cheats.class == ASSASSIN) {
                player.Items.Wpn2 = player.Items.Wpn1;
            }

            player.Class = this.cheats.class;
        }

        if (potions.length > 0 || this.cheats.pets || this.cheats.class) {
            this.#applyCheat(player, (model) => {
                // Remove pre-calculated bonus
                for (let type of PlayerModel.ATTRIBUTES) {
                    model[type].Bonus = undefined;
                }

                // Evaluate commons
                model.evaluateCommon(player);
            });
        }

        if (this.cheats.runes) {
            this.#applyCheat(player, (model) => {
                model.Runes.Health = 15;
                model.Runes.ResistanceFire = 75;
                model.Runes.ResistanceCold = 75;
                model.Runes.ResistanceLightning = 75;
                model.Items.Wpn1.Attributes[2] = 60;

                if (model.Items.Wpn2) {
                    model.Items.Wpn2.Attributes[2] = 60;
                }
            });
        }
    }

    #showOptions () {
        Dialog.open(
            StatisticsIntegrationOptionsDialog,
            this.options,
            (options) => {
                const simpleChange = this.options.slot === options.slot;
                for (const key of this.options.keys()) {
                    if (Array.isArray(this.options[key]) ? (this.options[key].length !== options[key].length || options[key].some((v, i) => v !== this.options[key][i])) : (this.options[key] !== options[key])) {
                        this.options[key] = options[key];
                    }
                }

                if (simpleChange) {
                    this.#generate();
                } else {
                    this.#poll();
                }
            }
        )
    }

    #importEndpoint () {
        Dialog.open(EndpointDialog, true).then((actionSuccess) => {
            if (actionSuccess) {
                this.#poll();
            }
        });
    }

    #importFile (event) {
        Loader.toggle(true, { progress: true });

        const files = Array.from(event.target.files);

        let filesDone = 0;
        let filesCount = files.length;

        let promises = [];

        for (const file of files) {
            const promise = file.text().then(async (content) => {
                await DatabaseManager.import(content, file.lastModified).catch((e) => {
                    Toast.error(intl('database.import_error'), e.message);
                    Logger.error(e, 'Error occured while trying to import a file!');
                });

                Loader.progress(++filesDone / filesCount);
            });

            promises.push(promise);
        }

        Promise.all(promises).then(() => this.#poll());
    }

    #generateItem (item) {
        if (this.type === 'players') {
            return {
                visible: `${item.Name} @ ${item.Prefix}`,
                hidden: `${intl('editor.level')} ${item.Level} ${intl(`general.class${item.Class}`)}`
            };
        } else /* if (this.type === 'guilds') */ {
            return {
                visible: `${item.Name} @ ${item.Prefix}`,
                hidden: _formatDate(item.Timestamp)
            };
        }
    }

    #prepare (scope) {
        _sortDesc(scope, item => item.Timestamp);

        if (this.options.ignored_duration) {
            scope = scope.filter(item => item.Timestamp > (Date.now() - this.options.ignored_duration));
        }

        if (this.options.ignored_identifiers) {
            scope = scope.filter(item => !this.options.ignored_identifiers.includes(item.LinkId));
        }

        if (this.options.limit) {
            scope = scope.slice(0, this.options.limit);
        }

        return scope;
    }

    #generate () {
        this.$list.empty();

        if (typeof this.generator === 'undefined') {
            for (const item of this.#prepare(this.scope(DatabaseManager))) {
                const { visible, hidden } = this.#generateItem(item);

                const $button = $(`
                    <div class="ui small fluid basic vertical animated inverted button !mt-2">
                        <div class="visible content">${visible}</div>
                        <div class="hidden content">
                            <div>
                                <span>${hidden}</span>
                                <div data-op="hide" class="ui basic mini icon inverted button" style="position: absolute; right: 0; top: calc(-1em * 2 / 3);"><i class="ui eye slash icon"></i></div>
                            </div>
                        </div>
                    </div>
                `).click(() => this.#callback(item));

                const $hide = $button.operator('hide');
                $hide.click((event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const index = this.options.ignored_identifiers.indexOf(item.LinkId);
                    if (index === -1) {
                        $button.addClass('opacity-50');
                        $hide.find('i').removeClass('slash');

                        this.options.ignored_identifiers.push(item.LinkId);
                    } else {
                        $button.removeClass('opacity-50');
                        $hide.find('i').addClass('slash');

                        this.options.ignored_identifiers.splice(index, 1);
                    }

                    this.options.ignored_identifiers = this.options.ignored_identifiers;
                })
    
                this.$list.append($button);
            }
        } else {
            this.generator(DatabaseManager, this.$list, this.#callback.bind(this));
        }
    }

    #poll () {
        Loader.toggle(true);
        DatabaseManager.load(Object.assign({ slot: this.options.slot }, this.profile)).then(() => {
            this.#generate();

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
