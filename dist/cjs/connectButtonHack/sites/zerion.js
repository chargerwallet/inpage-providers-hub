"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['zerion.io', 'app.zerion.io', 'www.zerion.io'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttons = Array.from(document.querySelectorAll('[class^="ConnectWallet__Content"] button'));
            const btn = buttons.find((item) => { var _a; return (_a = item.querySelector('div>div[kind]')) === null || _a === void 0 ? void 0 : _a.innerHTML.includes(findName); });
            if (btn) {
                const span = btn.querySelector('div>div[kind]');
                if (span) {
                    span.innerHTML = text;
                }
                const img = btn.querySelector('img');
                if (img && img.src) {
                    img.src = icon;
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
