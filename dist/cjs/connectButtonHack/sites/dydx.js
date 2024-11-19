"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['dydx.exchange', 'trade.dydx.exchange', 'www.dydx.exchange'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, findIcon, icon, text, }) => {
            const img = document.querySelector(`button img[src="${findIcon || ''}"]`);
            if (img && img.src) {
                img.src = icon;
                const span = img.nextSibling;
                if (span && span.nodeValue === findName) {
                    span.nodeValue = text;
                }
            }
        };
        replaceFunc({
            findName: 'MetaMask',
            findIcon: '/wallets/metamask.svg',
            icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
            text: consts_1.WALLET_CONNECT_INFO.metamask.text,
        });
        replaceFunc({
            findName: 'WalletConnect',
            findIcon: '/wallets/walletconnect.svg',
            icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
            text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
        });
    },
});
