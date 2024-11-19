import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['app.eigenlayer.xyz'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a;
            //replace text
            const connectWalletDialog = 'div[role="dialog"]';
            const nameButton = document.querySelector(`${connectWalletDialog} button[aria-label="${findName}"]`);
            if (nameButton) {
                //replace textNode(idx===0) only,keep other nodes
                (_a = nameButton.childNodes[0]) === null || _a === void 0 ? void 0 : _a.replaceWith(text);
            }
            //replace image
            const img = document.querySelector(`${connectWalletDialog} img[alt="${findName} logo"]`);
            if (img) {
                img.src = icon; //img with 32x32 size already exists
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
