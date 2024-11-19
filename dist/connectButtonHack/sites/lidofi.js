import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['stake.lido.fi'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a, _b;
            const buttons = Array.from((_b = (_a = document.querySelector('div.idjqeC')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('button')) !== null && _b !== void 0 ? _b : []);
            const findButton = buttons.find((button) => {
                const span = button.querySelector('span > span > div');
                if (span && span.innerText === findName) {
                    return button;
                }
                return undefined;
            });
            if (findButton) {
                // change button text
                const span = findButton.querySelector('div');
                if (span) {
                    span.innerText = text;
                }
                // change icon
                const imgContainer = findButton.querySelector('span > span >span');
                if (imgContainer) {
                    createNewImageToContainer({
                        container: imgContainer,
                        icon: icon,
                        removeSvg: true,
                        onCreated(img) {
                            img.style.maxWidth = '48px';
                            img.style.maxHeight = '48px';
                        },
                    });
                }
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(IInjectedProviderNames.ethereum)) {
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
        }
    },
});
