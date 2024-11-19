var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createNewImageToContainer, createWalletConnectToButton, detectQrcodeFromSvg, hackConnectButton, } from '../hackConnectButton';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { WALLET_CONNECT_INFO } from '../consts';
import { commonLogger } from '@chargerwallet/cross-inpage-provider-core';
const chargerwalletBtnBg = 'rgb(0, 184, 18)';
function setOnClickToConnectWallet({ element, uri }) {
    element.onclick = (e) => {
        var _a, _b;
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        void ((_b = (_a = window.$chargerwallet) === null || _a === void 0 ? void 0 : _a.$private) === null || _b === void 0 ? void 0 : _b.request({
            method: 'wallet_connectToWalletConnect',
            params: { uri },
        }));
        return false;
    };
}
export default () => hackConnectButton({
    urls: ['*'],
    providers: [IInjectedProviderNames.ethereum],
    replaceMethod() {
        // $chargerwallet.$walletInfo.platformEnv.isExtension
        const chargerwalletHub = window.$chargerwallet;
        if (!chargerwalletHub || !chargerwalletHub.$walletInfo || !chargerwalletHub.$private) {
            return;
        }
        const { isExtension, isDesktop, isNative } = chargerwalletHub.$walletInfo.platformEnv;
        const replaceFunc = ({ findName, icon, text, }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            const headerText = document.getElementById('walletconnect-qrcode-text');
            if (!headerText) {
                return;
            }
            const headerNextSibling = headerText === null || headerText === void 0 ? void 0 : headerText.nextSibling;
            if (!headerNextSibling) {
                return;
            }
            // **** android single connect button replacement
            const isAndroidSingleConnectButton = (_b = (_a = headerNextSibling === null || headerNextSibling === void 0 ? void 0 : headerNextSibling.classList) === null || _a === void 0 ? void 0 : _a.contains) === null || _b === void 0 ? void 0 : _b.call(_a, 'walletconnect-connect__buttons__wrapper__android');
            if (isAndroidSingleConnectButton) {
                const btn = headerNextSibling.querySelector('.walletconnect-connect__button');
                if (!btn) {
                    return;
                }
                if (btn.dataset['isChargerWalletReplaced']) {
                    return;
                }
                btn.dataset['isChargerWalletReplaced'] = 'true';
                btn.innerText = `${btn.innerText} ${text}`;
                btn.style.backgroundColor = chargerwalletBtnBg;
                setOnClickToConnectWallet({
                    element: btn,
                    uri: btn.href,
                });
            }
            // **** deeplink buttons replacement
            const isSearchInput = (_d = (_c = headerNextSibling === null || headerNextSibling === void 0 ? void 0 : headerNextSibling.classList) === null || _c === void 0 ? void 0 : _c.contains) === null || _d === void 0 ? void 0 : _d.call(_c, 'walletconnect-search__input');
            const isConnectButtonsContainer = (_f = (_e = headerNextSibling === null || headerNextSibling === void 0 ? void 0 : headerNextSibling.classList) === null || _e === void 0 ? void 0 : _e.contains) === null || _f === void 0 ? void 0 : _f.call(_e, 'walletconnect-connect__buttons__wrapper__wrap');
            if (isSearchInput || isConnectButtonsContainer) {
                const shouldHideOtherWallets = isDesktop || isNative;
                const inputEle = isSearchInput ? headerNextSibling : undefined;
                const parent = headerText.parentNode;
                if (!parent) {
                    return;
                }
                const iconsContainer = parent.querySelector('.walletconnect-connect__buttons__wrapper__wrap');
                let firstItem = iconsContainer === null || iconsContainer === void 0 ? void 0 : iconsContainer.querySelector('.walletconnect-connect__button__icon_anchor');
                if (!(firstItem === null || firstItem === void 0 ? void 0 : firstItem.getAttribute('href'))) {
                    try {
                        firstItem = iconsContainer === null || iconsContainer === void 0 ? void 0 : iconsContainer.querySelector('.walletconnect-connect__button__icon_anchor[href]:not([href=""])');
                    }
                    catch (error) {
                        // noop
                        commonLogger.error(error);
                    }
                }
                if (!firstItem || !iconsContainer) {
                    return;
                }
                const newItemAdded = parent.querySelector('.isChargerWalletReplaced.walletconnect-connect__button__icon_anchor');
                if (newItemAdded) {
                    return;
                }
                const img = firstItem.querySelector('.walletconnect-connect__button__icon');
                if (!img) {
                    return;
                }
                const span = firstItem.querySelector('.walletconnect-connect__button__text');
                if (!span) {
                    return;
                }
                if (!(firstItem === null || firstItem === void 0 ? void 0 : firstItem.getAttribute('href'))) {
                    return;
                }
                const uri = new URL(firstItem === null || firstItem === void 0 ? void 0 : firstItem.href).searchParams.get('uri');
                if (uri && uri.startsWith('wc:')) {
                    const newItem = firstItem.cloneNode(true);
                    const newItemImg = newItem.querySelector('.walletconnect-connect__button__icon');
                    const newItemSpan = newItem.querySelector('.walletconnect-connect__button__text');
                    if (newItemSpan) {
                        newItemSpan.innerText = text;
                    }
                    if (newItemImg) {
                        newItemImg.style.backgroundImage = `url(${icon || ''})`;
                        newItemImg.style.backgroundColor = chargerwalletBtnBg;
                    }
                    newItem.classList.add('isChargerWalletReplaced');
                    // TODO use universal link
                    newItem.href = `chargerwallet-wallet:///wc?uri=${encodeURIComponent(uri)}`;
                    if (shouldHideOtherWallets) {
                        setOnClickToConnectWallet({
                            element: newItem,
                            uri,
                        });
                    }
                    // hide all other wallets
                    if (shouldHideOtherWallets) {
                        for (const item of Array.from((iconsContainer === null || iconsContainer === void 0 ? void 0 : iconsContainer.children) || [])) {
                            const itemEl = item;
                            if (itemEl && itemEl.style) {
                                itemEl.style.display = 'none';
                            }
                        }
                        iconsContainer.style.display = 'flex';
                        iconsContainer.style.justifyContent = 'center';
                        iconsContainer.style.alignItems = 'center';
                    }
                    iconsContainer.style.minHeight = '150px';
                    iconsContainer.style.minWidth = isNative ? '0px' : '310px';
                    iconsContainer.prepend(newItem);
                    // remove input and footer pagination
                    if (shouldHideOtherWallets) {
                        inputEle === null || inputEle === void 0 ? void 0 : inputEle.remove();
                        const footerContainer = (_g = iconsContainer === null || iconsContainer === void 0 ? void 0 : iconsContainer.parentNode) === null || _g === void 0 ? void 0 : _g.querySelector('.walletconnect-modal__footer');
                        footerContainer === null || footerContainer === void 0 ? void 0 : footerContainer.remove();
                    }
                }
            }
            // **** qrcode replacement
            const svgQrcode = headerNextSibling === null || headerNextSibling === void 0 ? void 0 : headerNextSibling.querySelector('svg.walletconnect-qrcode__image');
            if (svgQrcode) {
                const qrcodeContainer = headerNextSibling;
                if (qrcodeContainer.dataset['isChargerWalletReplaced']) {
                    return;
                }
                // starting hack
                qrcodeContainer.dataset['isChargerWalletReplaced'] = 'true';
                qrcodeContainer.style.position = 'relative';
                qrcodeContainer.style.display = 'flex';
                qrcodeContainer.style.flexDirection = 'column';
                qrcodeContainer.style.alignItems = 'center';
                qrcodeContainer.style.justifyContent = 'center';
                createNewImageToContainer({
                    container: qrcodeContainer,
                    icon,
                    removeSvg: false,
                    onCreated(img) {
                        img.style.maxWidth = '10%';
                        img.style.borderRadius = '35%';
                        img.style.position = 'absolute';
                        img.style.border = '2px solid white';
                        img.style.backgroundColor = 'white';
                        img.style.outline = 'none';
                        // img.style.left = '50%';
                        // img.style.top = '50%';
                        // img.style.transform = 'translate(-50%, -50%)';
                    },
                });
                const footerContainer = headerNextSibling.nextElementSibling;
                if (!footerContainer) {
                    return;
                }
                footerContainer.style.flexDirection = 'column';
                // @ts-ignore
                const uri = yield detectQrcodeFromSvg({ img: svgQrcode });
                if (!uri || !uri.startsWith('wc:')) {
                    return;
                }
                createWalletConnectToButton({
                    container: footerContainer,
                    uri,
                    onCreated(btn) {
                        btn.style.marginTop = '16px';
                        btn.style.alignSelf = 'center';
                    },
                });
            }
        });
        void replaceFunc({
            findName: 'WalletConnect',
            icon: WALLET_CONNECT_INFO.chargerwallet.icon,
            text: WALLET_CONNECT_INFO.chargerwallet.text,
        });
    },
});
