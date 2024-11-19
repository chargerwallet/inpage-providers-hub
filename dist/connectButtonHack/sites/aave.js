import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import { last } from 'lodash';
export default () => hackConnectButton({
    urls: ['aave.com', 'app.aave.com', 'www.aave.com'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, findIcon, icon, text, }) => {
            var _a;
            const img = last(Array.from(document.querySelectorAll(`.MuiModal-root button>span>img[src="${findIcon || ''}"]`)));
            if (img && img.src) {
                img.src = icon;
                const span = (_a = img === null || img === void 0 ? void 0 : img.parentNode) === null || _a === void 0 ? void 0 : _a.previousSibling;
                if (span) {
                    span.nodeValue = text;
                }
            }
        };
        replaceFunc({
            findName: 'Browser wallet',
            findIcon: '/icons/wallets/browserWallet.svg',
            icon: WALLET_CONNECT_INFO.metamask.icon,
            text: WALLET_CONNECT_INFO.metamask.text,
        });
        replaceFunc({
            findName: 'WalletConnect',
            findIcon: '/icons/wallets/walletConnect.svg',
            icon: WALLET_CONNECT_INFO.walletconnect.icon,
            text: WALLET_CONNECT_INFO.walletconnect.text,
        });
    },
});
