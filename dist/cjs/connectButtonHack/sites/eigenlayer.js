"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['app.eigenlayer.xyz'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a;
            //replace text
            const connectWalletDialog = 'div[role="dialog"]';
            const nameButton = document.querySelector(`${connectWalletDialog} button[aria-label="${findName}"]`);
            if (nameButton) {
                //replace textNode(idx===0) only,keep other nodes
                (_a = nameButton.childNodes[0]) === null || _a === void 0 ? void 0 : _a.replaceWith(text);
            }
            //replace image
            const img = document.querySelector(`${connectWalletDialog} img[alt="${findName} logo"]`);
            if (img) {
                img.src = icon; //img with 32x32 size already exists
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
