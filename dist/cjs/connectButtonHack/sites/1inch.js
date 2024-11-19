"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
/*
- small screen with ext or desktop, dapp walletconnect switch to `desktop` error
 */
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['1inch.io', 'app.1inch.io', 'www.1inch.io'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const btn = document.querySelector(`app-wallet-item button.wallet-connect-item[data-id=${findName}]`);
            if (btn) {
                const img = btn.querySelector('img.wallet-connect-img');
                if (img && img.src) {
                    img.src = icon;
                    img.style.borderRadius = '0';
                }
                const span = btn.querySelector('.wallet-connect-item-down > p');
                if (span) {
                    span.innerHTML = text;
                }
            }
        };
        replaceFunc({
            findName: 'Metamask',
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
