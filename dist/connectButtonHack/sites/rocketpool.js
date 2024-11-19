import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['stake.rocketpool.net'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            const walletBtnList = Array.from(document.querySelectorAll(`#headlessui-portal-root [role="dialog"] ul li`));
            for (const walletBtn of walletBtnList) {
                if ((walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.innerText) === findName) {
                    const textNode = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector('div span');
                    if (textNode) {
                        textNode.innerText = text;
                    }
                    const img = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector('img');
                    if (img) {
                        img.src = icon; //keep the original size and style
                    }
                }
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(IInjectedProviderNames.ethereum)) {
            replaceFunc({
                findName: 'Metamask',
                icon: WALLET_CONNECT_INFO.metamask.icon,
                text: WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                findName: 'Wallet Connect',
                icon: WALLET_CONNECT_INFO.walletconnect.icon,
                text: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
