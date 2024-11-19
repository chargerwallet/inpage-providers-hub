/* eslint-disable @typescript-eslint/no-unused-vars */
import { hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['stake.lido.fi'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod(options) {
        var _a;
        const replaceFunc = ({ findName, icon, text, }) => {
            // find connect wallet button
            document.querySelector('div');
            document.querySelectorAll('div');
            // change button text
            // #1 nodeValue
            // element.nodeValue = text;
            // # 2 innerHTML
            // element.innerHTML = text;
            // change icon
            // #1 img element
            // element.src = icon;
            // #2 svg element
            // create new image
            //   const imgContainer = findButton.querySelector('container') as HTMLElement | undefined;
            //   if (imgContainer) {
            //     createNewImageToContainer({
            //       container: imgContainer,
            //       icon: icon,
            //       removeSvg: true,
            //       onCreated(img) {
            //         img.style.maxWidth = '48px';
            //         img.style.maxHeight = '48px';
            //       },
            //     });
            //   }
        };
        // Check whether the provider is enabled in the app.
        if ((_a = options === null || options === void 0 ? void 0 : options.providers) === null || _a === void 0 ? void 0 : _a.includes(IInjectedProviderNames.ethereum)) {
            // Replace the button text and icon.
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
