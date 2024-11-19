import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['synthetix.io', 'staking.synthetix.io', 'app.synthetix.io', 'www.synthetix.io'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a;
            const shadowRoot = (_a = document.querySelector('onboard-v2')) === null || _a === void 0 ? void 0 : _a.shadowRoot;
            if (shadowRoot) {
                const buttons = Array.from(shadowRoot.querySelectorAll('.wallets-container button'));
                const btn = buttons.find((item) => item.innerHTML.includes(findName));
                if (btn) {
                    const replaceImg = () => {
                        const imgContainer = btn.querySelector('div.icon');
                        if (imgContainer) {
                            createNewImageToContainer({
                                container: imgContainer,
                                icon,
                                removeSvg: true,
                            });
                        }
                    };
                    const span = btn.querySelector('span.name');
                    if (span && span.innerHTML === findName) {
                        span.innerHTML = text;
                        // shadowRoot update image, need some delay to replace image
                        setTimeout(replaceImg, 1000);
                    }
                    replaceImg();
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
