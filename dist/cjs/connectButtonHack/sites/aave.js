"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
const lodash_1 = require("lodash");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['aave.com', 'app.aave.com', 'www.aave.com'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, findIcon, icon, text, }) => {
            var _a;
            const img = (0, lodash_1.last)(Array.from(document.querySelectorAll(`.MuiModal-root button>span>img[src="${findIcon || ''}"]`)));
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
            icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
            text: consts_1.WALLET_CONNECT_INFO.metamask.text,
        });
        replaceFunc({
            findName: 'WalletConnect',
            findIcon: '/icons/wallets/walletConnect.svg',
            icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
            text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
        });
    },
});
