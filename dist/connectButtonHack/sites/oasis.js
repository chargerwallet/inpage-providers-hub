import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['oasis.app', 'www.oasis.app'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a, _b, _c, _d, _e;
            const spans = Array.from((_d = (_c = (_b = (_a = window.document) === null || _a === void 0 ? void 0 : _a.querySelector('onboard-v2')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelectorAll('.wallets-container .wallet-button-container .name')) !== null && _d !== void 0 ? _d : []);
            const span = spans.find((item) => item.innerHTML === findName);
            if (span) {
                span.innerHTML = text;
                const imgContainer = (_e = span.previousElementSibling) === null || _e === void 0 ? void 0 : _e.querySelector('div');
                if (imgContainer) {
                    createNewImageToContainer({
                        container: imgContainer,
                        icon: icon,
                        removeSvg: true,
                        onCreated(img) {
                            img.style.maxWidth = '22px';
                            img.style.maxHeight = '22px';
                        },
                    });
                }
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
