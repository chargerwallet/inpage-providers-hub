"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['synthetix.io', 'staking.synthetix.io', 'app.synthetix.io', 'www.synthetix.io'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a;
            const shadowRoot = (_a = document.querySelector('onboard-v2')) === null || _a === void 0 ? void 0 : _a.shadowRoot;
            if (shadowRoot) {
                const buttons = Array.from(shadowRoot.querySelectorAll('.wallets-container button'));
                const btn = buttons.find((item) => item.innerHTML.includes(findName));
                if (btn) {
                    const replaceImg = () => {
                        const imgContainer = btn.querySelector('div.icon');
                        if (imgContainer) {
                            (0, hackConnectButton_1.createNewImageToContainer)({
                                container: imgContainer,
                                icon,
                                removeSvg: true,
                            });
                        }
                    };
                    const span = btn.querySelector('span.name');
                    if (span && span.innerHTML === findName) {
                        span.innerHTML = text;
                        // shadowRoot update image, need some delay to replace image
                        setTimeout(replaceImg, 1000);
                    }
                    replaceImg();
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
