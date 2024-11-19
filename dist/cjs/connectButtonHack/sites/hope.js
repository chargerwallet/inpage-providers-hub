"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
const hackConnectButton_1 = require("../hackConnectButton");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['app.hope.money'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ id, icon, text }) => {
            const walletButton = document.getElementById(id);
            const textNode = walletButton === null || walletButton === void 0 ? void 0 : walletButton.querySelector(':scope > div:nth-child(2) > div');
            if (textNode) {
                textNode.innerText = text;
            }
            const imageNode = walletButton === null || walletButton === void 0 ? void 0 : walletButton.querySelector('img');
            if (imageNode) {
                imageNode.src = icon;
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(cross_inpage_provider_types_1.IInjectedProviderNames.ethereum)) {
            replaceFunc({
                id: 'connect-METAMASK',
                icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
                text: consts_1.WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                id: 'connect-WALLET_CONNECT_V2',
                icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
                text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
