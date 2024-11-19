import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['opensea.io', 'www.opensea.io'],
    providers: [IInjectedProviderNames.ethereum, IInjectedProviderNames.comlana],
    replaceMethod(options) {
        var _a, _b;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a, _b;
            const listDom = (_a = window.document.querySelector('div[data-testid="wallet-modal"] ul')) === null || _a === void 0 ? void 0 : _a.childNodes;
            if (!listDom || !listDom.length) {
                return;
            }
            const li = Array.from(listDom).find((item) => item.innerText.includes(findName));
            if (!li) {
                return;
            }
            const img = (_b = li === null || li === void 0 ? void 0 : li.querySelector) === null || _b === void 0 ? void 0 : _b.call(li, 'button > div > img');
            if (img && img.src) {
                img.src = icon;
            }
            const spans = li.querySelectorAll('button > div > span');
            if (!spans || !spans.length) {
                return;
            }
            const span = Array.from(spans).find((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.innerText) === null || _a === void 0 ? void 0 : _a.includes(findName); });
            if (span) {
                span.innerText = text;
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(IInjectedProviderNames.ethereum)) {
            replaceFunc({
                findName: 'MetaMask',
                icon: WALLET_CONNECT_INFO.metamask.icon,
                text: WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                findName: 'WalletConnect',
                icon: WALLET_CONNECT_INFO.walletconnect.icon,
                text: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
        if ((_b = options === null || options === void 0 ? void 0 : options.providers) === null || _b === void 0 ? void 0 : _b.includes(IInjectedProviderNames.comlana)) {
            replaceFunc({
                findName: 'Phantom',
                icon: WALLET_CONNECT_INFO.phantom.icon,
                text: WALLET_CONNECT_INFO.phantom.text,
            });
        }
    },
});
