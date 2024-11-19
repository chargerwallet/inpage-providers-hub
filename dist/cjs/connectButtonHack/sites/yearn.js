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
    urls: ['yearn.finance', 'www.yearn.finance', 'app.yearn.finance'],
    providers: [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, findIcon, icon, text, }) => {
            var _a;
            const modalDom = document.querySelector('.yearn--modalLogin');
            if (!modalDom) {
                return;
            }
            const names = Array.from(modalDom.querySelectorAll('.yearn--modalLogin-card>b'));
            const name = names.find((item) => utilsDomNodes_1.default.isInnerContentMatch(item, findName));
            if (name) {
                const svg = (_a = name.previousElementSibling) === null || _a === void 0 ? void 0 : _a.querySelector('svg');
                const svgContainer = svg === null || svg === void 0 ? void 0 : svg.parentElement;
                const span = svgContainer === null || svgContainer === void 0 ? void 0 : svgContainer.nextElementSibling;
                if (utilsDomNodes_1.default.isReplaced(svgContainer)) {
                    return;
                }
                if (svgContainer && span && utilsDomNodes_1.default.isInnerContentMatch(span, findName)) {
                    span.childNodes[0].nodeValue = text;
                    utilsDomNodes_1.default.setIsReplaced(span);
                    // DO NOT remove svg, otherwise cause dapp dom error:
                    //    Uncaught (in promise) Error: Missing or invalid topic field
                    //    Uncaught (in promise) TypeError: Cannot read properties of null (reading 'removeChild')
                    svg.style.display = 'none';
                    svgContainer.append(utilsDomNodes_1.default.createElementFromHTML(`
              <img src="${icon}" srcset="${icon}" alt="ChargerWalletReplaced" class="svelte-1799bj2">
          `));
                    utilsDomNodes_1.default.setIsReplaced(svgContainer);
                }
            }
        };
        replaceFunc({
            findName: 'MetaMask',
            findIcon: 'MetaMask',
            icon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
            text: consts_1.WALLET_CONNECT_INFO.metamask.text,
        });
        replaceFunc({
            findName: 'WalletConnect',
            findIcon: 'WalletConnect',
            icon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
            text: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
        });
    },
});
