var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createWalletConnectToButton, detectQrcodeFromSvg, hackConnectButton, } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
export default () => hackConnectButton({
    urls: ['indexcoop.com', 'app.indexcoop.com', 'www.indexcoop.com'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        const getDialogDom = () => document.querySelector('[role=dialog]>[role=document]');
        const replaceFunc = ({ findName, icon, text, }) => {
            var _a, _b, _c, _d;
            const dialog = getDialogDom();
            if (!dialog) {
                return;
            }
            let isDesktop = true;
            let spans = Array.from(
            // desktop app selector
            dialog.querySelectorAll('button > div > div > [role=img] ~ div > div'));
            if (!spans.length) {
                isDesktop = false;
                // mobile app selector
                spans = Array.from(dialog.querySelectorAll('button > div > div > h2 > span'));
            }
            const span = spans.find((item) => item.innerHTML === findName);
            if (span) {
                span.innerHTML = text;
                let imgContainer;
                if (isDesktop) {
                    imgContainer = (_a = span === null || span === void 0 ? void 0 : span.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
                    imgContainer = imgContainer === null || imgContainer === void 0 ? void 0 : imgContainer.querySelector('[role=img]');
                }
                else {
                    imgContainer = (_c = (_b = span === null || span === void 0 ? void 0 : span.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode) === null || _c === void 0 ? void 0 : _c.previousSibling;
                    imgContainer = imgContainer === null || imgContainer === void 0 ? void 0 : imgContainer.querySelector('[role=img]');
                }
                if (imgContainer) {
                    const img = (_d = imgContainer.children) === null || _d === void 0 ? void 0 : _d[0];
                    if (img && img.style.transition) {
                        img.style.backgroundImage = `url(${icon})`;
                        imgContainer.style.backgroundColor = 'transparent';
                    }
                }
            }
        };
        const replaceWalletConnectQrcode = () => __awaiter(this, void 0, void 0, function* () {
            const dialog = getDialogDom();
            if (!dialog) {
                return;
            }
            const qrcodeSvg = dialog.querySelector('div > div ~ svg[style]');
            if (qrcodeSvg) {
                if (qrcodeSvg.classList.contains('isChargerWalletReplaced')) {
                    return;
                }
                // should add white bg color for qrcode scan
                qrcodeSvg.style.backgroundColor = 'white';
                qrcodeSvg.classList.add('isChargerWalletReplaced');
                const uri = yield detectQrcodeFromSvg({ img: qrcodeSvg });
                if (process.env.NODE_ENV !== 'production') {
                    console.log('indexcoop replaceWalletConnectQrcode >>>>', { uri });
                }
                const container = qrcodeSvg.parentElement;
                if (uri && container) {
                    createWalletConnectToButton({
                        container,
                        uri,
                        onCreated(btn) {
                            btn.style.padding = '6px 12px';
                            btn.style.width = '155px';
                            btn.style.display = 'block';
                            btn.style.margin = 'auto';
                        },
                    });
                }
            }
        });
        void replaceFunc({
            findName: 'MetaMask',
            icon: WALLET_CONNECT_INFO.metamask.icon,
            text: WALLET_CONNECT_INFO.metamask.text,
        });
        void replaceFunc({
            findName: 'WalletConnect',
            icon: WALLET_CONNECT_INFO.walletconnect.icon,
            text: WALLET_CONNECT_INFO.walletconnect.text,
        });
        // TODO indexcoop WalletConnect Qrcode is WRONG
        void replaceWalletConnectQrcode();
    },
});
