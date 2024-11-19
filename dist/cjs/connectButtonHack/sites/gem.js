"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['gem.xyz', 'www.gem.xyz', 'pro.opensea.io'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a, _b, _c, _d;
            const header = document.querySelector('#rk_connect_title');
            if (!header) {
                return;
            }
            const containers = Array.from((_d = (_c = (_b = (_a = header === null || header === void 0 ? void 0 : header.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.nextSibling) === null || _c === void 0 ? void 0 : _c.querySelectorAll('div > button > div > div > div + div')) !== null && _d !== void 0 ? _d : []);
            const span = containers.find((item) => item.innerHTML.includes(findName));
            if (span) {
                span.innerHTML = text;
                const prevImg = span.previousSibling;
                // maybe <img />
                if (prevImg && prevImg.src) {
                    prevImg.src = icon;
                }
                else {
                    // maybe <svg />
                    prevImg === null || prevImg === void 0 ? void 0 : prevImg.remove();
                    const imgContainer = span.parentNode;
                    if (imgContainer) {
                        (0, hackConnectButton_1.createNewImageToContainer)({
                            container: imgContainer,
                            icon,
                            removeSvg: true,
                            onCreated(img) {
                                img.className = 'h-8 w-8 mr-4';
                            },
                        });
                    }
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
