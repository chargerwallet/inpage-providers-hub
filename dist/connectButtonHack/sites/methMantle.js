import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import domUtils from '../utils/utilsDomNodes';
export default () => hackConnectButton({
    urls: ['meth.mantle.xyz'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a;
            const walletBtnList = Array.from(document.querySelectorAll(`body > .w-full button `));
            for (const walletBtn of walletBtnList) {
                if ((walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.innerText) === findName) {
                    // replace text
                    const textNode = domUtils.findTextNode(walletBtn, findName);
                    const newTextNode = document.createTextNode(text);
                    textNode === null || textNode === void 0 ? void 0 : textNode.replaceWith(newTextNode);
                    (newTextNode === null || newTextNode === void 0 ? void 0 : newTextNode.parentElement) && (newTextNode.parentElement.style.whiteSpace = 'normal');
                    //image
                    const imgContainer = (_a = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector('svg')) === null || _a === void 0 ? void 0 : _a.parentNode;
                    if (imgContainer) {
                        createNewImageToContainer({
                            container: imgContainer,
                            icon,
                            removeSvg: true,
                            onCreated(img) {
                                img.width = 36;
                                img.height = 36;
                            },
                        });
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
                findName: 'WalletConnect',
                icon: WALLET_CONNECT_INFO.walletconnect.icon,
                text: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
