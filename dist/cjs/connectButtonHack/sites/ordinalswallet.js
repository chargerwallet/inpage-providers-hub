"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['ordinalswallet.com', 'www.ordinalswallet.com'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.btc],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttonList = Array.from(document.querySelectorAll('.ConnectWalletModal_actions__66fc2 .ConnectWalletModal_action__y9st_'));
            const btn = buttonList.find((item) => item.innerHTML.includes(findName));
            const textNode = Array.from((btn === null || btn === void 0 ? void 0 : btn.childNodes) || []).find((item) => {
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
            findName: 'Unisat',
            icon: consts_1.WALLET_CONNECT_INFO.unisat.icon,
            text: consts_1.WALLET_CONNECT_INFO.unisat.text,
        });
    },
});
