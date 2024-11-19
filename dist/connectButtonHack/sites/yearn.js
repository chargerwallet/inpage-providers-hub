import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import utilsDomNodes from '../utils/utilsDomNodes';
export default () => hackConnectButton({
    urls: ['yearn.finance', 'www.yearn.finance', 'app.yearn.finance'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, findIcon, icon, text, }) => {
            var _a;
            const modalDom = document.querySelector('.yearn--modalLogin');
            if (!modalDom) {
                return;
            }
            const names = Array.from(modalDom.querySelectorAll('.yearn--modalLogin-card>b'));
            const name = names.find((item) => utilsDomNodes.isInnerContentMatch(item, findName));
            if (name) {
                const svg = (_a = name.previousElementSibling) === null || _a === void 0 ? void 0 : _a.querySelector('svg');
                const svgContainer = svg === null || svg === void 0 ? void 0 : svg.parentElement;
                const span = svgContainer === null || svgContainer === void 0 ? void 0 : svgContainer.nextElementSibling;
                if (utilsDomNodes.isReplaced(svgContainer)) {
                    return;
                }
                if (svgContainer && span && utilsDomNodes.isInnerContentMatch(span, findName)) {
                    span.childNodes[0].nodeValue = text;
                    utilsDomNodes.setIsReplaced(span);
                    // DO NOT remove svg, otherwise cause dapp dom error:
                    //    Uncaught (in promise) Error: Missing or invalid topic field
                    //    Uncaught (in promise) TypeError: Cannot read properties of null (reading 'removeChild')
                    svg.style.display = 'none';
                    svgContainer.append(utilsDomNodes.createElementFromHTML(`
              <img src="${icon}" srcset="${icon}" alt="ChargerWalletReplaced" class="svelte-1799bj2">
          `));
                    utilsDomNodes.setIsReplaced(svgContainer);
                }
            }
        };
        replaceFunc({
            findName: 'MetaMask',
            findIcon: 'MetaMask',
            icon: WALLET_CONNECT_INFO.metamask.icon,
            text: WALLET_CONNECT_INFO.metamask.text,
        });
        replaceFunc({
            findName: 'WalletConnect',
            findIcon: 'WalletConnect',
            icon: WALLET_CONNECT_INFO.walletconnect.icon,
            text: WALLET_CONNECT_INFO.walletconnect.text,
        });
    },
});
