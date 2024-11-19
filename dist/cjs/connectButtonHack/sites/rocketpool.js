"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['stake.rocketpool.net'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            const walletBtnList = Array.from(document.querySelectorAll(`#headlessui-portal-root [role="dialog"] ul li`));
            for (const walletBtn of walletBtnList) {
                if ((walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.innerText) === findName) {
                    const textNode = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector('div span');
                    if (textNode) {
                        textNode.innerText = text;
                    }
                    const img = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector('img');
                    if (img) {
                        img.src = icon; //keep the original size and style
                    }
                }
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(cross_inpage_provider_types_1.IInjectedProviderNames.ethereum)) {
            replaceFunc({
                findName: 'Metamask',
                icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
                text: consts_1.WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                findName: 'Wallet Connect',
                icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
                text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
