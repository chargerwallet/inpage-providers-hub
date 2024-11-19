"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const config_1 = require("./config");
const findIconAndName_1 = require("./findIconAndName");
const imgUtils_1 = require("./imgUtils");
const textUtils_1 = require("./textUtils");
const utils_1 = require("./utils");
function hackWalletConnectButton(sites) {
    for (const site of sites) {
        const { urls, walletsForProvider, mutationObserverOptions, constraintMap } = site;
        const providers = Object.keys(walletsForProvider);
        if (!urls.includes(window.location.hostname)) {
            continue;
        }
        (0, hackConnectButton_1.hackConnectButton)({
            urls,
            providers,
            mutationObserverOptions,
            replaceMethod({ providers: enabledProviders } = {
                providers: [],
            }) {
                for (const provider of providers) {
                    if (enabledProviders.includes(provider)) {
                        const wallets = walletsForProvider[provider] || [];
                        for (const wallet of wallets) {
                            const { updatedIcon, updatedName, name, findIconAndName, container, updateIcon = imgUtils_1.replaceIcon, updateName = textUtils_1.replaceText, update, afterUpdate, } = wallet;
                            try {
                                const walletId = (0, utils_1.createWalletId)(provider, updatedName);
                                if (walletId.isUpdated) {
                                    continue;
                                }
                                utils_1.universalLog.log(`[replaceMethod] ${urls[0]} begin to run for ${walletId.walletId}`);
                                let result = null;
                                if (update) {
                                    const ele = update(wallet);
                                    ele && walletId.updateFlag(ele);
                                    continue;
                                }
                                else if (findIconAndName) {
                                    result = findIconAndName.call(null, wallet);
                                }
                                else if (container) {
                                    const isSelector = typeof container === 'string';
                                    const containerElement = isSelector
                                        ? document.querySelector(container)
                                        : container();
                                    if (!containerElement) {
                                        utils_1.universalLog.warn('containerElement is null, container=', container);
                                        continue;
                                    }
                                    result = (0, findIconAndName_1.findIconAndNameByName)(containerElement, name, 'auto-search-icon', constraintMap);
                                }
                                if (!result) {
                                    utils_1.universalLog.warn('no result found');
                                    continue;
                                }
                                const { textNode, iconNode } = result;
                                if (textNode && iconNode) {
                                    const newText = updateName(textNode, updatedName);
                                    const newIconElement = updateIcon(iconNode, updatedIcon);
                                    walletId.updateFlag(newIconElement);
                                    afterUpdate === null || afterUpdate === void 0 ? void 0 : afterUpdate(newText, newIconElement);
                                }
                            }
                            catch (e) {
                                utils_1.universalLog.warn(e);
                            }
                        }
                    }
                }
            },
        });
    }
}
exports.default = () => {
    try {
        hackWalletConnectButton(config_1.sitesConfig);
    }
    catch (e) {
        utils_1.universalLog.warn(e);
    }
};
