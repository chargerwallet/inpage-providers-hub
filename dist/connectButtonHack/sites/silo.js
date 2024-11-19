import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import domUtils from '../utils/utilsDomNodes';
export default () => hackConnectButton({
    urls: ['app.silo.finance'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ selector, updatedIcon, updatedText, walletName, }) => {
            const walletButton = document.querySelector(selector);
            if (!walletButton) {
                return;
            }
            const textNode = domUtils.findTextNode(walletButton, walletName);
            textNode === null || textNode === void 0 ? void 0 : textNode.replaceWith(updatedText);
            const img = walletButton === null || walletButton === void 0 ? void 0 : walletButton.querySelector('img');
            if (img) {
                img.src = updatedIcon;
                img.removeAttribute('srcset');
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(IInjectedProviderNames.ethereum)) {
            replaceFunc({
                selector: 'button[data-cy="select-wallet-MetaMask"]',
                walletName: 'MetaMask',
                updatedIcon: WALLET_CONNECT_INFO.metamask.icon,
                updatedText: WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                selector: 'button[data-cy="select-wallet-WalletConnect"]',
                walletName: 'WalletConnect',
                updatedIcon: WALLET_CONNECT_INFO.walletconnect.icon,
                updatedText: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
