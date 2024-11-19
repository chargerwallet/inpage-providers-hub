import { createNewImageToContainer, hackConnectButton } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: [
        'compound.finance',
        'app.compound.finance',
        'www.compound.finance',
        'v2-app.compound.finance',
    ],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const replaceFunc = ({ findName, findIcon, icon, text, }) => {
            var _a, _b;
            if (window.location.hostname === 'v2-app.compound.finance') {
                const img = document.querySelector(`.connect-choices .connect-item ${findIcon || ''}`);
                if (img) {
                    img.style.backgroundImage = `url(${icon})`;
                    const span = img.nextSibling;
                    if (span && span.innerText === findName) {
                        span.innerText = text;
                    }
                }
            }
            else {
                const walletList = Array.from(document.querySelectorAll('.connect-wallet-items .connect-wallet-item__info > .heading'));
                const span = walletList.find((item) => item.innerHTML.includes(findName));
                if (span) {
                    span.innerHTML = text;
                    const prevImg = (_a = span.parentNode) === null || _a === void 0 ? void 0 : _a.previousSibling;
                    if (prevImg && prevImg.src) {
                        prevImg.src = icon;
                    }
                    else {
                        prevImg === null || prevImg === void 0 ? void 0 : prevImg.remove();
                        const imgContainer = (_b = span.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
                        if (imgContainer) {
                            createNewImageToContainer({
                                container: imgContainer,
                                icon,
                                removeSvg: true,
                                onCreated(img) {
                                    img.className = 'h-8 w-8 mr-4';
                                },
                            });
                        }
                    }
                }
            }
        };
        replaceFunc({
            findName: 'Metamask',
            findIcon: '.connect-wallet-icon--metamask',
            icon: WALLET_CONNECT_INFO.metamask.icon,
            text: WALLET_CONNECT_INFO.metamask.text,
        });
        replaceFunc({
            findName: 'Wallet Connect',
            findIcon: '.connect-wallet-icon--wallet-connect',
            icon: WALLET_CONNECT_INFO.walletconnect.icon,
            text: WALLET_CONNECT_INFO.walletconnect.text,
        });
    },
});
