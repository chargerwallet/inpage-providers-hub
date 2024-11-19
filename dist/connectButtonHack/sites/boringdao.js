import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import { hackConnectButton } from '../hackConnectButton';
import domUtils from '../utils/utilsDomNodes';
export default () => hackConnectButton({
    urls: ['app.boringdao.com'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            const walletBtnList = Array.from(document.querySelectorAll(`.MuiModal-root .MuiDialog-container .MuiPaper-root > div:nth-child(2) > div`));
            for (const walletBtn of walletBtnList) {
                if ((walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.innerText.trim()) === findName) {
                    const textNode = domUtils.findTextNode(walletBtn, findName);
                    textNode === null || textNode === void 0 ? void 0 : textNode.replaceWith(text);
                    const img = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector(`img[alt="${findName}"][width="40"]`);
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
                findName: 'WalletConnect',
                icon: WALLET_CONNECT_INFO.walletconnect.icon,
                text: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
