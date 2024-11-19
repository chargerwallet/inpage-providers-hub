"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['zapper.xyz', 'zapper.fi', 'www.zapper.xyz'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    mutationObserverOptions: {
        attributes: true,
        characterData: false,
        childList: true,
        subtree: true,
    },
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttons = Array.from(document.querySelectorAll('.ReactModal__Content--after-open div > button > div:first-child'));
            const btnContent = buttons.reverse().find((item) => item.innerText.includes(findName));
            if (btnContent) {
                while (btnContent.firstChild) {
                    btnContent.removeChild(btnContent.firstChild);
                }
                const image = document.createElement('img');
                image.src = icon;
                image.style.width = '32px';
                image.style.height = '32px';
                btnContent.appendChild(image);
                const newText = document.createTextNode(text);
                btnContent.appendChild(newText);
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
