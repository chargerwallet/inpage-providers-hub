"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['sushi.com', 'www.sushi.com'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttonList = Array.from(document.querySelectorAll('body header button'));
            const btn = buttonList.find((item) => item.innerHTML.includes(findName));
            if (btn) {
                const childNodes = Array.from(btn.childNodes);
                const span = childNodes.find((item) => item.nodeValue === findName);
                if (span) {
                    span.nodeValue = text;
                }
                const imgContainer = btn.querySelector('div');
                if (imgContainer) {
                    (0, hackConnectButton_1.createNewImageToContainer)({
                        container: imgContainer,
                        icon,
                        removeSvg: true,
                        onCreated(img) {
                            img.style.maxWidth = '16px';
                            img.style.maxHeight = '16px';
                        },
                    });
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
