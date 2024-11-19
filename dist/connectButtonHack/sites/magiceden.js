import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['magiceden.io', 'www.magiceden.io'],
    providers: [
        IInjectedProviderNames.ethereum,
        IInjectedProviderNames.comlana,
        IInjectedProviderNames.btc,
    ],
    replaceMethod(options) {
        var _a, _b, _c;
        const replaceFunc = ({ findName, findIconText, icon, text, }) => {
            var _a;
            const img = document.querySelector(`#headlessui-portal-root div > button > div > img[alt="${findIconText}"]`);
            if (img && img.src) {
                img.src = icon;
                const span = (_a = img.nextSibling) === null || _a === void 0 ? void 0 : _a.querySelector('span');
                if (span && span.innerText === findName) {
                    span.innerText = text;
                }
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(IInjectedProviderNames.ethereum)) {
            replaceFunc({
                findName: 'MetaMask',
                findIconText: 'MetaMask icon',
                icon: WALLET_CONNECT_INFO.metamask.icon,
                text: WALLET_CONNECT_INFO.metamask.text,
            });
            // The magiceden bug will probably be fixed later
            replaceFunc({
                findName: 'MetaMask',
                findIconText: 'MetaMask  icon',
                icon: WALLET_CONNECT_INFO.metamask.icon,
                text: WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                findName: 'WalletConnect',
                findIconText: 'WalletConnect icon',
                icon: WALLET_CONNECT_INFO.walletconnect.icon,
                text: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
        if ((_b = options === null || options === void 0 ? void 0 : options.providers) === null || _b === void 0 ? void 0 : _b.includes(IInjectedProviderNames.comlana)) {
            replaceFunc({
                findName: 'Phantom',
                findIconText: 'Phantom icon',
                icon: WALLET_CONNECT_INFO.phantom.icon,
                text: WALLET_CONNECT_INFO.phantom.text,
            });
        }
        if ((_c = options === null || options === void 0 ? void 0 : options.providers) === null || _c === void 0 ? void 0 : _c.includes(IInjectedProviderNames.btc)) {
            replaceFunc({
                findName: 'Unisat',
                findIconText: 'Unisat icon',
                icon: WALLET_CONNECT_INFO.unisat.icon,
                text: WALLET_CONNECT_INFO.unisat.text,
            });
        }
    },
});
