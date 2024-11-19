"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['opensea.io', 'www.opensea.io'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum, cross_inpage_provider_types_1.IInjectedProviderNames.comlana],
    replaceMethod(options) {
        var _a, _b;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a, _b;
            const listDom = (_a = window.document.querySelector('div[data-testid="wallet-modal"] ul')) === null || _a === void 0 ? void 0 : _a.childNodes;
            if (!listDom || !listDom.length) {
                return;
            }
            const li = Array.from(listDom).find((item) => item.innerText.includes(findName));
            if (!li) {
                return;
            }
            const img = (_b = li === null || li === void 0 ? void 0 : li.querySelector) === null || _b === void 0 ? void 0 : _b.call(li, 'button > div > img');
            if (img && img.src) {
                img.src = icon;
            }
            const spans = li.querySelectorAll('button > div > span');
            if (!spans || !spans.length) {
                return;
            }
            const span = Array.from(spans).find((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.innerText) === null || _a === void 0 ? void 0 : _a.includes(findName); });
            if (span) {
                span.innerText = text;
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
