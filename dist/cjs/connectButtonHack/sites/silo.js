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
    urls: ['app.silo.finance'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ selector, updatedIcon, updatedText, walletName, }) => {
            const walletButton = document.querySelector(selector);
            if (!walletButton) {
                return;
            }
            const textNode = utilsDomNodes_1.default.findTextNode(walletButton, walletName);
            textNode === null || textNode === void 0 ? void 0 : textNode.replaceWith(updatedText);
            const img = walletButton === null || walletButton === void 0 ? void 0 : walletButton.querySelector('img');
            if (img) {
                img.src = updatedIcon;
                img.removeAttribute('srcset');
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(cross_inpage_provider_types_1.IInjectedProviderNames.ethereum)) {
            replaceFunc({
                selector: 'button[data-cy="select-wallet-MetaMask"]',
                walletName: 'MetaMask',
                updatedIcon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
                updatedText: consts_1.WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                selector: 'button[data-cy="select-wallet-WalletConnect"]',
                walletName: 'WalletConnect',
                updatedIcon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
                updatedText: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
