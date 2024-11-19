"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['rarible.com', 'www.rarible.com'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum, cross_inpage_provider_types_1.IInjectedProviderNames.comlana],
    callbackDelay: 0,
    replaceMethod(options) {
        var _a, _b;
        const replaceFunc = ({ findName, icon, text, }) => {
            const spans = Array.from(document.querySelectorAll('.ScrollbarsCustom ~ div > div > button > span > span > span > span'));
            const span = spans.find((item) => item.innerHTML === findName);
            if (span) {
                span.innerHTML = text;
                const img = span.previousSibling;
                if (img && img.src) {
                    img.src = icon;
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
        if ((_b = options === null || options === void 0 ? void 0 : options.providers) === null || _b === void 0 ? void 0 : _b.includes(cross_inpage_provider_types_1.IInjectedProviderNames.comlana)) {
            replaceFunc({
                findName: 'Phantom',
                icon: consts_1.WALLET_CONNECT_INFO.phantom.icon,
                text: consts_1.WALLET_CONNECT_INFO.phantom.text,
            });
        }
    },
});
