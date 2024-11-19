"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['magiceden.io', 'www.magiceden.io'],
    providers: [
        cross_inpage_provider_types_1.IInjectedProviderNames.ethereum,
        cross_inpage_provider_types_1.IInjectedProviderNames.comlana,
        cross_inpage_provider_types_1.IInjectedProviderNames.btc,
    ],
    replaceMethod(options) {
        var _a, _b, _c;
        const replaceFunc = ({ findName, findIconText, icon, text, }) => {
            var _a;
            const img = document.querySelector(`#headlessui-portal-root div > button > div > img[alt="${findIconText}"]`);
            if (img && img.src) {
                img.src = icon;
                const span = (_a = img.nextSibling) === null || _a === void 0 ? void 0 : _a.querySelector('span');
                if (span && span.innerText === findName) {
                    span.innerText = text;
                }
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(cross_inpage_provider_types_1.IInjectedProviderNames.ethereum)) {
            replaceFunc({
                findName: 'MetaMask',
                findIconText: 'MetaMask icon',
                icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
                text: consts_1.WALLET_CONNECT_INFO.metamask.text,
            });
            // The magiceden bug will probably be fixed later
            replaceFunc({
                findName: 'MetaMask',
                findIconText: 'MetaMask  icon',
                icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
                text: consts_1.WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                findName: 'WalletConnect',
                findIconText: 'WalletConnect icon',
                icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
                text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
        if ((_b = options === null || options === void 0 ? void 0 : options.providers) === null || _b === void 0 ? void 0 : _b.includes(cross_inpage_provider_types_1.IInjectedProviderNames.comlana)) {
            replaceFunc({
                findName: 'Phantom',
                findIconText: 'Phantom icon',
                icon: consts_1.WALLET_CONNECT_INFO.phantom.icon,
                text: consts_1.WALLET_CONNECT_INFO.phantom.text,
            });
        }
        if ((_c = options === null || options === void 0 ? void 0 : options.providers) === null || _c === void 0 ? void 0 : _c.includes(cross_inpage_provider_types_1.IInjectedProviderNames.btc)) {
            replaceFunc({
                findName: 'Unisat',
                findIconText: 'Unisat icon',
                icon: consts_1.WALLET_CONNECT_INFO.unisat.icon,
                text: consts_1.WALLET_CONNECT_INFO.unisat.text,
            });
        }
    },
});
