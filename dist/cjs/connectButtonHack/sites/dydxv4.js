"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['dydx.trade'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttons = Array.from(document.querySelectorAll('div[role="dialog"] div > div > button'));
            const btn = buttons.find((item) => {
                var _a;
                return (_a = item.querySelector('div')) === null || _a === void 0 ? void 0 : _a.innerText.includes(findName);
            });
            const datasetKey = 'chargerwallet_auto_created_icon_img';
            if (btn && !btn.querySelector(`[data-${datasetKey}]`)) {
                (0, hackConnectButton_1.createNewImageToContainer)({
                    container: btn,
                    icon,
                    removeSvg: true,
                    onCreated(img) {
                        img.style.width = '20px';
                        img.style.height = '20px';
                    },
                });
                const textNode = btn.querySelector('div');
                if (textNode) {
                    textNode.innerText = text;
                }
            }
        };
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
    },
});
