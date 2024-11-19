"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['stake.lido.fi'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
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
                    (0, hackConnectButton_1.createNewImageToContainer)({
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
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(cross_inpage_provider_types_1.IInjectedProviderNames.ethereum)) {
            replaceFunc({
                findName: 'MetaMask',
                icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
                text: consts_1.WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                findName: 'WalletConnect',
                icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
                text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
