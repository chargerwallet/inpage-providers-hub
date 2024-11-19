"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hackConnectButton_1 = require("../hackConnectButton");
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
const utilsDomNodes_1 = __importDefault(require("../utils/utilsDomNodes"));
exports.default = () => (0, hackConnectButton_1.hackConnectButton)({
    urls: ['lite.instadapp.io'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a;
            const walletBtnList = Array.from(document.querySelectorAll('.modal-content-wrapper ul li'));
            for (const walletBtn of walletBtnList) {
                if ((walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.innerText) === findName) {
                    const textNode = utilsDomNodes_1.default.findTextNode(walletBtn, findName);
                    textNode === null || textNode === void 0 ? void 0 : textNode.replaceWith(text);
                    const imgContainer = (_a = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector('button div svg')) === null || _a === void 0 ? void 0 : _a.parentNode;
                    if (imgContainer) {
                        (0, hackConnectButton_1.createNewImageToContainer)({
                            container: imgContainer,
                            icon,
                            removeSvg: true,
                            onCreated(img) {
                                img.width = 30;
                                img.height = 30;
                            },
                        });
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
                findName: 'WalletConnect',
                icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
                text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
