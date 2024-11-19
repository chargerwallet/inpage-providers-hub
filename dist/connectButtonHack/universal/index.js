import { hackConnectButton } from '../hackConnectButton';
import { sitesConfig } from './config';
import { findIconAndNameByName as defaultFindIconAndName } from './findIconAndName';
import { replaceIcon as defaultReplaceIcon } from './imgUtils';
import { replaceText as defaultReplaceText } from './textUtils';
import { createWalletId, universalLog } from './utils';
function hackWalletConnectButton(sites) {
    for (const site of sites) {
        const { urls, walletsForProvider, mutationObserverOptions, constraintMap } = site;
        const providers = Object.keys(walletsForProvider);
        if (!urls.includes(window.location.hostname)) {
            continue;
        }
        hackConnectButton({
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
                            const { updatedIcon, updatedName, name, findIconAndName, container, updateIcon = defaultReplaceIcon, updateName = defaultReplaceText, update, afterUpdate, } = wallet;
                            try {
                                const walletId = createWalletId(provider, updatedName);
                                if (walletId.isUpdated) {
                                    continue;
                                }
                                universalLog.log(`[replaceMethod] ${urls[0]} begin to run for ${walletId.walletId}`);
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
                                        universalLog.warn('containerElement is null, container=', container);
                                        continue;
                                    }
                                    result = defaultFindIconAndName(containerElement, name, 'auto-search-icon', constraintMap);
                                }
                                if (!result) {
                                    universalLog.warn('no result found');
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
                                universalLog.warn(e);
                            }
                        }
                    }
                }
            },
        });
    }
}
export default () => {
    try {
        hackWalletConnectButton(sitesConfig);
    }
    catch (e) {
        universalLog.warn(e);
    }
};
