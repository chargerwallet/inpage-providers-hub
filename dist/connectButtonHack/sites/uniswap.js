import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['uniswap.org', 'app.uniswap.org', 'www.uniswap.org'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttonList = Array.from(document.querySelectorAll('div[data-testid=wallet-modal] div[data-testid=option-grid] button'));
            const btn = buttonList.find((item) => item.innerHTML.includes(findName));
            const span = btn === null || btn === void 0 ? void 0 : btn.querySelector('div > div');
            const textNode = Array.from((span === null || span === void 0 ? void 0 : span.childNodes) || []).find((item) => {
                var _a;
                return (_a = item === null || item === void 0 ? void 0 : item.nodeValue) === null || _a === void 0 ? void 0 : _a.includes(findName);
            });
            if (textNode) {
                textNode.nodeValue = text;
            }
            const img = btn === null || btn === void 0 ? void 0 : btn.querySelector('img');
            if (img && img.src) {
                img.src = icon;
            }
        };
        replaceFunc({
            findName: 'MetaMask',
            icon: WALLET_CONNECT_INFO.metamask.icon,
            text: WALLET_CONNECT_INFO.metamask.text,
        });
        replaceFunc({
            findName: 'WalletConnect',
            icon: WALLET_CONNECT_INFO.walletconnect.icon,
            text: WALLET_CONNECT_INFO.walletconnect.text,
        });
    },
});