import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['gamma.io', 'www.gamma.io'],
    providers: [IInjectedProviderNames.btc],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttonList = Array.from(document.querySelectorAll('#headlessui-portal-root button'));
            const btn = buttonList.find((item) => item.innerHTML.includes(findName));
            const span = btn === null || btn === void 0 ? void 0 : btn.querySelector('div > div > div');
            const textNode = Array.from((span === null || span === void 0 ? void 0 : span.childNodes) || []).find((item) => {
                var _a;
                return (_a = item === null || item === void 0 ? void 0 : item.nodeValue) === null || _a === void 0 ? void 0 : _a.includes(findName);
            });
            if (textNode) {
                textNode.nodeValue = text;
            }
            const imgContainer = btn === null || btn === void 0 ? void 0 : btn.querySelector('div');
            if (imgContainer) {
                createNewImageToContainer({
                    container: imgContainer,
                    icon: icon,
                    removeSvg: true,
                    onCreated(img) {
                        img.style.maxWidth = '32px';
                        img.style.maxHeight = '32px';
                    },
                });
            }
        };
        replaceFunc({
            findName: 'Unisat wallet',
            icon: WALLET_CONNECT_INFO.unisat.icon,
            text: WALLET_CONNECT_INFO.unisat.text,
        });
    },
});
