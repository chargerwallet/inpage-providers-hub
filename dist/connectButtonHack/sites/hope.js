import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import { hackConnectButton } from '../hackConnectButton';
export default () => hackConnectButton({
    urls: ['app.hope.money'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ id, icon, text }) => {
            const walletButton = document.getElementById(id);
            const textNode = walletButton === null || walletButton === void 0 ? void 0 : walletButton.querySelector(':scope > div:nth-child(2) > div');
            if (textNode) {
                textNode.innerText = text;
            }
            const imageNode = walletButton === null || walletButton === void 0 ? void 0 : walletButton.querySelector('img');
            if (imageNode) {
                imageNode.src = icon;
            }
        };
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(IInjectedProviderNames.ethereum)) {
            replaceFunc({
                id: 'connect-METAMASK',
                icon: WALLET_CONNECT_INFO.metamask.icon,
                text: WALLET_CONNECT_INFO.metamask.text,
            });
            replaceFunc({
                id: 'connect-WALLET_CONNECT_V2',
                icon: WALLET_CONNECT_INFO.walletconnect.icon,
                text: WALLET_CONNECT_INFO.walletconnect.text,
            });
        }
    },
});
