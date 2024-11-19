import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['rarible.com', 'www.rarible.com'],
    providers: [IInjectedProviderNames.ethereum, IInjectedProviderNames.comlana],
    callbackDelay: 0,
    replaceMethod(options) {
        var _a, _b;
        const replaceFunc = ({ findName, icon, text, }) => {
            const spans = Array.from(document.querySelectorAll('.ScrollbarsCustom ~ div > div > button > span > span > span > span'));
            const span = spans.find((item) => item.innerHTML === findName);
            if (span) {
                span.innerHTML = text;
                const img = span.previousSibling;
                if (img && img.src) {
                    img.src = icon;
                }
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
