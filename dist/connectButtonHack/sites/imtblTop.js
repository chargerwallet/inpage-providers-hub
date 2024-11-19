import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import domUtils from '../utils/utilsDomNodes';
export default () => hackConnectButton({
    urls: ['imtbl.top'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a;
            const walletBtnList = Array.from(document.querySelectorAll('body [role="dialog"] button'));
            for (const walletBtn of walletBtnList) {
                if ((walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.innerText) === findName) {
                    const textNode = domUtils.findTextNode(walletBtn, findName);
                    textNode === null || textNode === void 0 ? void 0 : textNode.replaceWith(text);
                    const imgContainer = (_a = walletBtn === null || walletBtn === void 0 ? void 0 : walletBtn.querySelector('svg')) === null || _a === void 0 ? void 0 : _a.parentNode;
                    if (imgContainer) {
                        createNewImageToContainer({
                            container: imgContainer,
                            icon,
                            removeSvg: true,
                            onCreated(img) {
                                img.width = 35;
                                img.height = 35;
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
        }
    },
});
