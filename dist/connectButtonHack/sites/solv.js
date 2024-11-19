import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import domUtils from '../utils/utilsDomNodes';
export default () => hackConnectButton({
    urls: ['app.comlv.finance'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            const walletBtnList = Array.from(document.querySelectorAll('[role="dialog"] > div:nth-child(2).overflow-y-overlay > div > div:nth-child(2) >div'));
            for (const walletBtn of walletBtnList) {
                if ((walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.innerText) === findName) {
                    const textNode = domUtils.findTextNode(walletBtn, findName);
                    textNode === null || textNode === void 0 ? void 0 : textNode.replaceWith(text);
                    const img = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector(':scope > div:nth-child(1) > span> img');
                    if (img) {
                        img.src = icon;
                        img.style.width = '32px';
                        img.style.height = '32px';
                        img.style.minWidth = 'auto';
                        img.style.minHeight = 'auto';
                    }
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
                findName: 'Wallet Connect',
                icon: WALLET_CONNECT_INFO.walletconnect.icon,
                text: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
