import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['dydx.trade'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            const buttons = Array.from(document.querySelectorAll('div[role="dialog"] div > div > button'));
            const btn = buttons.find((item) => {
                var _a;
                return (_a = item.querySelector('div')) === null || _a === void 0 ? void 0 : _a.innerText.includes(findName);
            });
            const datasetKey = 'chargerwallet_auto_created_icon_img';
            if (btn && !btn.querySelector(`[data-${datasetKey}]`)) {
                createNewImageToContainer({
                    container: btn,
                    icon,
                    removeSvg: true,
                    onCreated(img) {
                        img.style.width = '20px';
                        img.style.height = '20px';
                    },
                });
                const textNode = btn.querySelector('div');
                if (textNode) {
                    textNode.innerText = text;
                }
            }
        };
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
    },
});
