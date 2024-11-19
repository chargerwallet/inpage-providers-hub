"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesConfig = exports.basicWalletInfo = void 0;
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const consts_1 = require("../consts");
const findIconAndName_1 = require("./findIconAndName");
const imgUtils_1 = require("./imgUtils");
const shadowRoot_1 = require("./shadowRoot");
const utils_1 = require("./utils");
const textUtils_1 = require("./textUtils");
const utilsDomNodes_1 = __importDefault(require("../utils/utilsDomNodes"));
exports.basicWalletInfo = {
    [consts_1.WALLET_NAMES.metamask]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.metamask.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.metamask.text,
        name: /^meta\s*mask$/i,
    },
    [consts_1.WALLET_NAMES.walletconnect]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.walletconnect.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.walletconnect.text,
        name: /^wallet\s*connect$/i,
    },
    [consts_1.WALLET_NAMES.suiwallet]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.suiwallet.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.suiwallet.text,
        name: /^(sui|Sui\s?Wallet)$/i,
    },
    [consts_1.WALLET_NAMES.phantom]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.phantom.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.phantom.text,
        name: /^phantom$/i,
    },
    [consts_1.WALLET_NAMES.unisat]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.unisat.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.unisat.text,
        name: /^(unisat|Unisat Wallet)$/i,
    },
    [consts_1.WALLET_NAMES.tronlink]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.tronlink.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.tronlink.text,
        name: /^tronlink$/i,
    },
    [consts_1.WALLET_NAMES.petra]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.petra.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.petra.text,
        name: /^(Petra|Petra Wallet)$/i,
    },
    [consts_1.WALLET_NAMES.keplr]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.keplr.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.keplr.text,
        name: /^(Keplr|Keplr Mobile|Keplr Wallet)$/i,
    },
    [consts_1.WALLET_NAMES.polkadot]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.polkadot.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.polkadot.text,
        name: /^(Polkadot|polkadot\.js)$/i,
    },
    [consts_1.WALLET_NAMES.martian]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.martian.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.martian.text,
        name: /^Martian|Martian Wallet$/i,
    },
    [consts_1.WALLET_NAMES.nami]: {
        updatedIcon: consts_1.WALLET_CONNECT_INFO.nami.icon,
        updatedName: consts_1.WALLET_CONNECT_INFO.nami.text,
        name: /^(Nami Wallet|Nami)$/i,
    },
};
const chargerwalletSelectorInRowbowkit = 'button[data-testid="rk-wallet-option-so.chargerwallet.app.wallet"]';
function hasChargerwalletWallet(ele = document) {
    return !!ele.querySelector(chargerwalletSelectorInRowbowkit);
}
const metamaskForRainbowKit = Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { skip: (page) => __awaiter(void 0, void 0, void 0, function* () { return (yield page.locator(chargerwalletSelectorInRowbowkit).count()) > 0; }), container: () => {
        if (hasChargerwalletWallet()) {
            return null;
        }
        return document.querySelector('button[data-testid="rk-wallet-option-metaMask"]');
    }, afterUpdate(textNode) {
        if (textNode.parentElement) {
            textNode.parentElement.style.whiteSpace = 'normal';
        }
    } });
const walletConnectForRainbowKit = Object.assign(Object.assign({}, exports.basicWalletInfo[consts_1.WALLET_NAMES.walletconnect]), { skip: (page) => __awaiter(void 0, void 0, void 0, function* () { return (yield page.locator(chargerwalletSelectorInRowbowkit).count()) > 0; }), container: () => {
        if (hasChargerwalletWallet()) {
            return null;
        }
        return document.querySelector('button[data-testid="rk-wallet-option-walletConnect"]');
    }, afterUpdate(textNode) {
        if (textNode.parentElement) {
            textNode.parentElement.style.whiteSpace = 'normal';
        }
    } });
exports.sitesConfig = [
    {
        urls: ['app.turbos.finance'],
        testPath: [':text("I accept the")', ':text("Continue")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.sui]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['suiwallet']), { container: "div[role='dialog'] .rc-dialog-body > ul" }),
            ],
        },
    },
    {
        urls: ['app.defisaver.com'],
        testPath: ['button:text("ACCEPT")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('.button-option.MetaMask > svg', 'auto-search-text', name);
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('.button-option.WalletConnect > svg', 'auto-search-text', name);
                    } }),
            ],
        },
    },
    {
        urls: ['haedal.xyz'],
        testPath: [':text("Stake Now")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.sui]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['suiwallet']), { container: "div[role='dialog'] .wkit-select__container" }),
            ],
        },
    },
    {
        urls: ['trade.bluefin.io'],
        testPath: [':text("View your")', ':text("Connect Account")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.sui]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['suiwallet']), { name: /Sui Wallet$/, container: () => {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.connect-wallet', 'Connect Account');
                        const button = modal === null || modal === void 0 ? void 0 : modal.querySelector('[data-testid="connect-wallet"]');
                        return button ? button.parentElement : null;
                    }, afterUpdate: (text, img) => {
                        img.style.marginRight = '12px';
                    } }),
            ],
        },
    },
    {
        urls: ['omnilending.omnibtc.finance'],
        testPath: ['button:text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: "div[role='dialog'] .ant-modal-content .wallets-inner" }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.sui]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['suiwallet']), { container: "div[role='dialog'] [class*='WalletListWrapper']" }),
            ],
        },
    },
    {
        urls: ['app.venus.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.MuiModal-root .venus-modal', 'Connect a wallet') }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.MuiModal-root .venus-modal', 'Connect a wallet') }),
            ],
        },
    },
    {
        urls: ['app.uncx.network'],
        testPath: ['button:has-text("Connect")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getWalletListByBtn)("div[role='dialog'] .v-card .c-list"), skip: { mobile: true } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => (0, utils_1.getWalletListByBtn)("div[role='dialog'] .v-card .c-list"), afterUpdate(textNode, img) {
                        img.style.height = 'auto';
                    } }),
            ],
        },
    },
    {
        urls: ['app.benqi.fi'],
        testPath: ['button:text("Connect Wallet")[class*="ActionButton__Button"]'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#metamask', afterUpdate(textNode, img) {
                        textNode.parentElement && (textNode.parentElement.style.textAlign = 'left');
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: '#wallet-connect', afterUpdate(textNode, img) {
                        textNode.parentElement && (textNode.parentElement.style.textAlign = 'left');
                    } }),
            ],
        },
    },
    {
        urls: ['manta.layerbank.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.MuiModal-root', 'Connect Wallet') }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.MuiModal-root', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['app.orbitlending.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.stakewise.io'],
        testPath: [':text("Connect")'],
        skip: {
            mobile: true, //NOTE:没有入口?
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '[data-testid="metaMask-connector-button"]' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: '[data-testid="walletConnect-connector-button"]' }),
            ],
        },
    },
    {
        urls: ['aerodrome.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('.bg-connect button[type="button"] img[src*="connect-walletConnect.svg"]', 'auto-search-text', name);
                    } }),
            ],
        },
    },
    //shadow root
    {
        urls: ['app.prismafinance.com'],
        skip: {
            mobile: true,
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.modal .outer-container div.wallets-container ', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    }, updateIcon(icon, iconSrc) {
                        const res = (0, imgUtils_1.replaceIcon)(icon, iconSrc);
                        res.style.width = '32px';
                        res.style.height = '32px';
                        res.style.maxWidth = '32px';
                        res.style.maxHeight = '32px';
                        return res;
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: '.modal .outer-container div.wallets-container ', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    }, updateIcon(icon, iconSrc) {
                        const res = (0, imgUtils_1.replaceIcon)(icon, iconSrc);
                        res.style.width = '32px';
                        res.style.height = '32px';
                        res.style.maxWidth = '32px';
                        res.style.maxHeight = '32px';
                        return res;
                    } }),
            ],
        },
    },
    {
        urls: ['vvs.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#wallet-connect-metamask' }),
            ],
        },
    },
    // {
    //   urls: ['raydium.io'],
    //   testPath: [
    //     ':text("Launch App")',
    //     ':text("I have read")',
    //     ':text("Agree and Continue")',
    //     ':text("Connect Wallet")',
    //   ],
    //   walletsForProvider: {
    //     [IInjectedProviderNames.comlana]: [
    //       {
    //         ...basicWalletInfo['phantom'],
    //         container: () =>
    //           getConnectWalletModalByTitle(
    //             ['div.fixed[role="dialog"]', 'div.Drawer.fixed'],
    //             'Connect your wallet to Raydium',
    //           ),
    //       },
    //     ],
    //   },
    // },
    {
        urls: ['01.xyz'],
        testPath: [':text("Connect")', ':text("Continue")'],
        skip: {
            mobile: true,
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.comlana]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['phantom']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.fixed', 'Select Wallet') }),
            ],
        },
    },
    {
        urls: ['francium.io'],
        testPath: {
            desktop: [':text("Launch App")', ':text("Connect Wallet")'],
            mobile: [':text("Launch App")', 'button.wallet-connect'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.comlana]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['phantom']), { container: '.wallet-modal .connect-wallet-list' }),
            ],
        },
    },
    {
        urls: ['crosschain.bifi.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('.MuiPaper-root.MuiPaper-elevation a img[src*="icon-metamask"]', (icon) => { var _a; return (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; }, name);
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('.MuiPaper-root.MuiPaper-elevation a img[src*="icon-walletconnect"]', (icon) => { var _a; return (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; }, name);
                    } }),
            ],
        },
    },
    {
        urls: ['bitstable.finance'],
        testPath: [':text("Launch App")', ':text("Connect Wallet")', ':text("USDT")'],
        skip: true,
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect Wallet') }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('.MuiStack-root button img[alt="Unisat"]', (icon) => { var _a, _b; return (_b = (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement; }, name);
                    } }),
            ],
        },
    },
    {
        urls: ['merlinchain.io'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div.fixed[role="dialog"][id*="radix-"]', 'Connect Wallet', (e) => {
                            return (window.getComputedStyle(e).pointerEvents != 'none' &&
                                e.innerText.includes('BTC wallets'));
                        });
                    }, afterUpdate(textNode, img) {
                        textNode.parentElement && (0, textUtils_1.makeTextEllipse)(textNode.parentElement);
                    } }),
            ],
        },
    },
    {
        urls: ['app.justlend.org'],
        mutationObserverOptions: {
            childList: true,
            subtree: true,
            attributes: true,
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.tron]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['tronlink']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div.connect-modal-v2.entry-modal-v2', 'Connect Wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['sun.io'],
        skip: {
            mobile: true, //WARN: it seems not supported by the site
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.tron]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['tronlink']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div.wallet-modal', 'Connect Wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['www.team.finance'],
        testPath: {
            desktop: [':text("Connect Wallet")'],
            mobile: ['main > nav section.z-10.block', ':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('.fixed[role="dialog"]', 'Select wallet');
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('.fixed[role="dialog"]', 'Select wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['app.thala.fi'],
        testPath: [':text("I agree")', ':text("Connect")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div.chakra-modal__body', 'Welcome to Thala');
                    }, afterUpdate(textNode, img) {
                        textNode.parentElement && (textNode.parentElement.style.textAlign = 'left');
                    } }),
            ],
        },
    },
    {
        urls: ['app.kinza.finance'],
        testPath: {
            desktop: [':text("Connect Wallet")'],
            mobile: ['div.ant-app svg[class*="_menu_icon"]', ':text("Connect Wallet")'],
        },
        skip: {
            mobile: true, //WARN:没有连接钱包弹窗，点击链接钱包后会自动连接默认钱包
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.osmosis.zone'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { name: /^Keplr$/i, container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['app.gearbox.fi'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'button[data-testid="wallet-select-dialog-wallet-metamask"]' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'button[data-testid="wallet-select-dialog-wallet-walletconnect"]' }),
            ],
        },
    },
    {
        urls: ['blur.io'],
        testPath: {
            mobile: [':text("Connect")', ':text("Connect")'],
            desktop: [':text("Connect Wallet")', ':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'button[id="METAMASK"]' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'button[id="WALLETCONNECT"]' }),
            ],
        },
    },
    {
        urls: ['app.stride.zone'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { name: /^(Keplr|Keplr Mobile)$/i, container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Select a wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['app.manta.network'],
        skip: {
            mobile: true, //WARN: mobile is not supported by the site
        },
        constraintMap: { icon: [], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('.relative.rounded-2xl.text-default', 'Connect Wallet') }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.polkadot]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['polkadot']), { findIconAndName: ({ name }) => {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('.relative.rounded-2xl.text-default img[alt="Polkadotjs Logo"]', (icon) => icon.parentElement, name);
                    } }),
            ],
        },
    },
    {
        urls: ['www.metapool.app'],
        testPath: {
            desktop: ['.chakra-modal__body', ':text("Start staking")', ':text("Connect your Wallet")'],
            mobile: [':text("Connect")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.arrakis.fi'],
        testPath: [':text("For Users")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['tectonic.finance'],
        testPath: {
            desktop: [':text("Enter App")', ':text("Connect Wallet")'],
            mobile: [':text("Enter App")', 'nav button > svg', ':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)(['div.fixed[role="dialog"]', '#headlessui-dialog-1'], 'Connect Wallet') }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('#headlessui-dialog-1', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['www.saucerswap.finance'],
        testPath: [
            ':text("Connect Wallet")',
            ':text("read to the end.")',
            'input.PrivateSwitchBase-input',
            'button:has-text("OK")',
        ],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.MuiPaper-root[role="dialog"]', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['fin.kujira.network'],
        testPath: ['.modal__header svg', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { update({ updatedIcon }) {
                        const icon = document.querySelector('div.wallet__connections > div.wrap > button:nth-child(2) svg');
                        return icon ? (0, imgUtils_1.replaceIcon)(icon, updatedIcon) : null;
                    } }),
            ],
        },
    },
    {
        urls: ['stake.amnis.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal[role="dialog"]', 'Welcome to Amnis') }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['martian']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal[role="dialog"]', 'Welcome to Amnis') }),
            ],
        },
    },
    {
        urls: ['app.astroport.fi'],
        testPath: [
            'p:text("I have read and understood")',
            'p:text("I acknowledge")',
            'button:text("Confirm")',
            'button:text("Accept All Cookies")',
            'button:text("No")',
            ':text("Connect Wallet")',
        ],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { name: /^(Keplr|Keplr Mobile)$/, container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"].fixed', 'Select Wallet') }),
            ],
        },
    },
    {
        urls: ['go.liquidloans.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => document.querySelector('div[role="dialog"][aria-labelledby="rk_connect_title"]') }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => document.querySelector('div[role="dialog"][aria-labelledby="rk_connect_title"]') }),
            ],
        },
    },
    {
        urls: ['bifrost.app', 'app.bifrost.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.chakra-modal__content-container', [
                            'Connect Wallet',
                            '链接钱包',
                        ]);
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="MetaMask"]', (icon) => { var _a; return (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; }, name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.chakra-modal__content-container', [
                            'Connect Wallet',
                            '链接钱包',
                        ]);
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="WalletConnect"]', (icon) => { var _a; return (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; }, name, modal));
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.polkadot]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['polkadot']), { name: /^polkadot\.js$/i, container: () => (0, utils_1.getConnectWalletModalByTitle)('div.chakra-modal__content-container', [
                        'Connect Wallet',
                        '链接钱包',
                    ]) }),
            ],
        },
    },
    {
        urls: ['app.kava.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('[data-testid="connectModal"]', 'Connect Your Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('svg[aria-label="metamask-icon"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['www.ankr.com'],
        testUrls: ['www.ankr.com/staking/stake/'],
        testPath: {
            mobile: ['header button.MuiButtonBase-root', ':text("Connect wallet")'],
            desktop: [':text("Connect wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect wallet to continue') }),
            ],
        },
    },
    {
        urls: ['dapp.chainge.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[style*="opacity: 1"]', 'Connect your wallet'), afterUpdate(textNode, img) {
                        textNode.parentElement && (textNode.parentElement.style.textAlign = 'center');
                    } }),
            ],
        },
    },
    {
        urls: ['app.bancor.network'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['app.carbondefi.xyz'],
        testPath: ['button:has-text("Accept All Cookies")', 'header button:has-text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[data-testid="modal-container"]', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="assets/metamask"]', 'auto-search-text', name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[data-testid="modal-container"]', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByName)(modal, name, 'auto-search-icon', {
                                text: [],
                                icon: [imgUtils_1.isWalletIconLessEqualThan],
                            }));
                    } }),
            ],
        },
    },
    {
        urls: ['app.alexlab.co'],
        testPath: [':text("Accept")', '[role="button"]:text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.fixed > .absolute', 'Bitcoin Chain') }),
            ],
        },
    },
    {
        urls: ['www.benddao.xyz'],
        testPath: ['button.sc-bdvvtL.oDzIq'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'button#metamask' }),
            ],
        },
    },
    {
        urls: ['pro.apex.exchange'],
        skip: {
            mobile: true, // not supported by the site
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.x-dialog-view .step-choose-wallet .step-wallets' }),
            ],
        },
    },
    {
        urls: ['app.aevo.xyz'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div#connectWallet', 'Select Your Wallet') }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div#connectWallet', 'Select Your Wallet') }),
            ],
        },
    },
    {
        urls: ['www.stfil.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        var _a, _b, _c;
                        const modal = document.querySelector('div.connectWalletModel');
                        const text = modal && (0, textUtils_1.findWalletTextByParent)(modal, name, []);
                        const icon = (_c = (_b = (_a = text === null || text === void 0 ? void 0 : text.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('img[src*="metamask"]');
                        return (text &&
                            icon && {
                            textNode: text,
                            iconNode: icon,
                        });
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('div.connectWalletModel img[src*="walletconnect"]', (e) => { var _a; return (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; }, name);
                    } }),
            ],
        },
    },
    {
        urls: ['www.stakedao.org'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { update({ updatedIcon }) {
                        var _a, _b;
                        const modal = utilsDomNodes_1.default.findTextNode('div.MuiContainer-root', 'Connect Wallet');
                        const icon = (_b = (_a = modal === null || modal === void 0 ? void 0 : modal.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('img[alt="metamask wallet logo"][src*="metamask.svg"]');
                        return icon ? (0, imgUtils_1.replaceIcon)(icon, updatedIcon) : null;
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { update({ updatedIcon }) {
                        var _a, _b;
                        const modal = utilsDomNodes_1.default.findTextNode('div.MuiContainer-root', 'Connect Wallet');
                        const icon = (_b = (_a = modal === null || modal === void 0 ? void 0 : modal.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('img[alt="walletconnect wallet logo"][src*="walletconnect.svg"]');
                        return icon ? (0, imgUtils_1.replaceIcon)(icon, updatedIcon) : null;
                    } }),
                metamaskForRainbowKit,
                walletConnectForRainbowKit,
            ],
        },
    },
    {
        urls: ['app.commmelier.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('[id*="popover-body"] img[src*="metamask.svg"][alt="wallet logo"]', 'auto-search-text', wallet.name);
                    } }),
            ],
        },
    },
    {
        urls: ['www.tokensets.com'],
        testPath: [':text("Sign in")'],
        skip: {
            mobile: true, 
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.ui.page.modals', 'Sign In') }),
            ],
        },
    },
    {
        urls: ['app.init.capital'],
        testPath: ['button:has-text("Continue")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['www.dx.app'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.redacted.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['www.inverse.finance'],
        testPath: [':text("Enter App")', ':text("Connect")'],
        mutationObserverOptions: {
            childList: true,
            subtree: true,
            attributes: true,
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)(() => {
                            var _a;
                            return (_a = Array.from(document.querySelectorAll('section[id*="popover-content"] img[src*="Metamask.png"]')).filter((e) => (0, utils_1.isVisible)(e))) === null || _a === void 0 ? void 0 : _a[0];
                        }, 'auto-search-text', wallet.name);
                    } }),
            ],
        },
    },
    {
        urls: ['moonwell.fi'],
        testPath: [':text("Launch App")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[id*="headlessui-dialog-panel"]', 'Connect a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"]', 'auto-search-text', wallet.name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[id*="headlessui-dialog-panel"]', 'Connect a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="walletconnect"]', 'auto-search-text', wallet.name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['sovryn.app'],
        testPath: [':text("Get started")', ':text("Browser Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '[data-layout-id="dapp-onboard-metamask"]' }),
            ],
        },
    },
    {
        urls: ['dapp.moneyonchain.com'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#rlogin-connect-modal' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: '#rlogin-connect-modal' }),
            ],
        },
    },
    {
        urls: ['app.extrafi.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.degate.com'],
        testPath: (page) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const frame = page.locator('iframe').contentFrame();
            yield ((_b = (_a = frame === null || frame === void 0 ? void 0 : frame.locator('button:has-text("Connect Wallet")')) === null || _a === void 0 ? void 0 : _a.first()) === null || _b === void 0 ? void 0 : _b.click());
        }),
        testUrls: ['app.degate.com/trade/USDC/ETH'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('section.mantine-Modal-content', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"]', (icon) => { var _a; return (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; }, wallet.name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('section.mantine-Modal-content', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="walletConnect"]', (icon) => { var _a; return (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; }, wallet.name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['tranchess.com'],
        testPath: {
            desktop: [':text("Liquid Staking")', ':text("Ethereum")', ':text("Connect Wallet")'],
            mobile: ['button.header--mobile-menu-toggle', ':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'div.wallet-provider-modal--item.meta-mask' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'div.wallet-provider-modal--item.wallet-connect' }),
            ],
        },
    },
    {
        urls: ['app.alpacafinance.org'],
        testPath: [':text("Connect to Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal-content', 'Select a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"]', 'auto-search-text', wallet.name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal-content', 'Select a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallet-connect.svg"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app-v2.alpacafinance.org'],
        testPath: [':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.chakra-modal__content-container', 'Select a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="MetaMask"]', 'auto-search-text', wallet.name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.chakra-modal__content-container', 'Select a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="WalletConnect"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['exchange.idex.io'],
        testPath: {
            desktop: [':text("Get Started")', ':text("Connect Wallet")'],
            mobile: [':text("Get Started")', ':text("Connect")'],
        },
        mutationObserverOptions: {
            childList: true,
            subtree: true,
            attributes: true,
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'ul[class*="UnlockCore__ListWrap"]' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'ul[class*="UnlockCore__ListWrap"]' }),
            ],
        },
    },
    {
        urls: ['app.aura.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.frax.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['beets.fi'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.gmx.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['link3.to'],
        skip: {
            mobile: true, //WARN: mobile is not supported by the site
        },
        testPath: [':text("Login")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit],
        },
    },
    {
        urls: ['app.mento.org'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['synapseprotocol.com'],
        testPath: {
            mobile: ['button[data-test-id="mobile-navbar-button"]', ':text("Connect Wallet")'],
            desktop: [':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.hydroprotocol.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"][alt="Metamask"]', 'auto-search-text', name);
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="keplr"][alt="Keplr"]', 'auto-search-text', name);
                    } }),
            ],
        },
    },
    {
        urls: ['biswap.org'],
        testPath: ['button.closeModal', ':text("Later")', 'button:text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'button#wallet-connect-metamask', afterUpdate(textNode, updatedName) {
                        textNode.parentElement && (0, textUtils_1.makeTextEllipse)(textNode.parentElement);
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'button#wallet-connect-walletconnect', afterUpdate(textNode, updatedName) {
                        textNode.parentElement && (0, textUtils_1.makeTextEllipse)(textNode.parentElement);
                    } }),
            ],
        },
    },
    {
        urls: ['app.pangolin.exchange'],
        testPath: ['#connect-wallet'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="Metamask Logo"][title="Metamask"]', 'auto-search-text', name);
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="WalletConnect Logo"][title="WalletConnect"]', 'auto-search-text', name);
                    } }),
            ],
        },
    },
    {
        urls: ['lybra.finance'],
        testPath: {
            desktop: [':text("Launch App")', ':text("Connect Wallet")'],
            mobile: [
                '[class*="header_menuIcon"][src*="menu"]',
                ':text("Launch App")',
                ':text("Connect Wallet")',
            ],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.wagmi.com'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#wallet-dropdown-scroll-wrapper' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: '#wallet-dropdown-scroll-wrapper', afterUpdate(textNode, img) {
                        textNode.parentElement && (textNode.parentElement.style.textAlign = 'left');
                    } }),
            ],
        },
    },
    {
        urls: ['app.ease.org'],
        testPath: [':text("NOT NOW")', ':text("CONNECT")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#headlessui-portal-root', 'Connect your Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask.svg"][alt="MetaMask"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['www.theidols.io'],
        skip: {
            mobile: true, //no connect wallet modal
        },
        testUrls: ['www.theidols.io/marketplace'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#WEB3_CONNECT_MODAL_ID .web3modal-modal-container' }),
            ],
        },
    },
    {
        urls: ['netswap.io'],
        skip: {
            mobile: true, 
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#connect-METAMASK' }),
            ],
        },
    },
    {
        urls: ['rosswap.com'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        skip: {
            mobile: true, //no connect wallet modal
        },
        // skip:
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#connect-METAMASK' }),
            ],
        },
    },
    {
        urls: ['maiadao.io'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        skip: {
            mobile: true, //no connect wallet modal
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#connect-METAMASK' }),
            ],
        },
    },
    {
        urls: ['diva.shamirlabs.org'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit],
        },
    },
    {
        urls: ['www.convexfinance.com'],
        skip: true,
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { update({ updatedName, name }) {
                        const modal = document.querySelector('#wallet-info-dropdown ul');
                        const textNode = (0, textUtils_1.findWalletTextByParent)(modal, name, [utils_1.isClickable]);
                        const newTextNode = textNode && (0, textUtils_1.replaceText)(textNode, updatedName);
                        if (!newTextNode) {
                            return null;
                        }
                        newTextNode.parentElement && (0, textUtils_1.makeTextEllipse)(newTextNode.parentElement);
                        return newTextNode.parentElement;
                    } }),
            ],
        },
    },
    {
        urls: ['www.staderlabs.com'],
        testUrls: ['www.staderlabs.com/eth/stake/'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['stake.comlblaze.org'],
        testPath: [':text("Agree")', ':text("Connect Wallet")'],
        testUrls: ['stake.comlblaze.org/app'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.comlana]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['phantom']), { container: '#connect_modal', afterUpdate(text) {
                        var _a;
                        if ((_a = text.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) {
                            text.parentElement.parentElement.style.whiteSpace = 'noWrap';
                            (0, textUtils_1.makeTextEllipse)(text.parentElement, { maxWidth: 'min(18vw,107px)' });
                        }
                    } }),
            ],
        },
    },
    {
        urls: ['buzz.bsquared.network'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('.modalContent', 'Connect Wallet') }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('.modalContent', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="layout/unisat.png"]', 'auto-search-text', name));
                    } }),
            ],
        },
    },
    {
        urls: ['task.bsquared.network'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('.ReactModal__Content', 'Please Connect A Wallet') }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('.ReactModal__Content', 'Please Connect A Wallet') }),
            ],
        },
    },
    {
        urls: ['juststable.tronscan.org'],
        testPath: [':text("Enter")'],
        skip: true,
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.tron]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['tronlink']), { update({ name, updatedName, updatedIcon }) {
                        const button = document.querySelector('button.ant-btn.tronlinkLogin');
                        const text = button && (0, textUtils_1.findWalletTextByParent)(button, name, []);
                        text && (0, textUtils_1.replaceText)(text, updatedName);
                        button && (button.style.backgroundImage = `url(${updatedIcon})`);
                        return button;
                    } }),
            ],
        },
    },
    {
        urls: ['app.cetus.zone'],
        testPath: ['div.radio', 'button:has-text("Continue")', 'button:has-text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['martian']), { container: 'div.ant-modal.wallet-modal' }),
                //petra
                // {
                //   ...basicWalletInfo['petra'],
                //   container: 'div.ant-modal.wallet-modal',
                // },
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.sui]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['suiwallet']), { name: /^Sui Wallet$/i, container: 'div.ant-modal.wallet-modal' }),
            ],
        },
    },
    {
        urls: ['app.radiant.capital'],
        testPath: [':text("Continue")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({ container: '.connect-wallet-modal' }, exports.basicWalletInfo['walletconnect']), { afterUpdate(textNode, img) {
                        img.style.height = '40px';
                        img.style.width = '40px';
                    } }),
            ],
        },
    },
    {
        //mobile version is redirected to app-mobile.ariesmarkets.xyz. check next item
        urls: ['app.ariesmarkets.xyz'],
        testUrls: ['app.ariesmarkets.xyz/lending'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.mantine-Paper-root', 'Select Wallet') }),
            ],
        },
    },
    {
        urls: ['app-mobile.ariesmarkets.xyz'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { findIconAndName({ name }) {
                        var _a, _b, _c, _d, _e, _f;
                        const mobileTitle = utilsDomNodes_1.default.findTextNode('#root', 'Select Wallet', 'first') || null;
                        const modal = ((_c = (_b = (_a = mobileTitle === null || mobileTitle === void 0 ? void 0 : mobileTitle.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) || null;
                        if (!modal) {
                            return null;
                        }
                        //there is multiple wallet icons, so we need to find the correct one manually
                        const text = utilsDomNodes_1.default.findTextNode(modal, name, 'first');
                        const imgs = Array.from(((_f = (_e = (_d = text.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.querySelectorAll('div[style*="background-image"]')) || []);
                        if (imgs.length > 1 || imgs.length === 0) {
                            return null;
                        }
                        const img = imgs[0];
                        if (!text || !img) {
                            return null;
                        }
                        return {
                            iconNode: img,
                            textNode: text,
                        };
                    } }),
            ],
        },
    },
    {
        urls: ['app.indigoprotocol.io'],
        // testPath: [':text("I agree")', ':text("Connect")'],
        constraintMap: { icon: [], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cardano]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['nami']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('#modal-connect-wallet', 'Connect Wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['app.minswap.org'],
        testPath: {
            desktop: [':text("Connect Wallet")'],
            mobile: ['header.flex > button>svg', ':text("Connect Wallet")'],
        },
        skip: true,
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cardano]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['nami']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.dialog-connect-wallet', 'Connect wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="nami.svg"][alt="Nami"]', 'auto-search-text', name, modal, { text: [], icon: [] }, 6));
                    } }),
            ],
        },
    },
    {
        urls: ['pancakeswap.finance', 'www.pancakeswap.finance', 'aptos.pancakeswap.finance'],
        skip: {
            mobile: true, //temp skip for lack walletconnect
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#portal-root', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallets/metamask.png"]', 'auto-search-text', name, modal, { text: [], icon: [] }, 5));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#portal-root', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallets/walletconnect.png"]', 'auto-search-text', name, modal, { text: [], icon: [] }, 5));
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#portal-root', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallets/petra.png"]', 'auto-search-text', name, modal, { text: [], icon: [] }, 5));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['martian']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#portal-root', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallets/martian.png"]', 'auto-search-text', name, modal, { text: [], icon: [] }, 5));
                    } }),
            ],
        },
    },
    {
        urls: ['www.nucleon.space'],
        testUrls: ['www.nucleon.space/#/data/stake'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal-content', 'Select a Wallet'), afterUpdate(textNode, icon) {
                        icon.style.height = '28px';
                        icon.style.width = 'auto';
                    } }),
            ],
        },
    },
    {
        urls: ['agni.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.inside', 'Connect Wallet') ||
                            (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Start by connecting with one');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask.png"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['liquidswap.com'],
        testPath: [
            ':text("I accept the")',
            ':text("Continue")',
            ':text("Connect Wallet")',
            ':text("Other Wallets")',
        ],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.p-dialog', 'Connect a Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="Petra Wallet"]', 'auto-search-text', name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['martian']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.p-dialog', 'Connect a Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="Martian Wallet"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['stbt.matrixdock.com', 'app.matrixdock.com'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.dialog-container', 'Available Wallets');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="icon-metamask"]', 'auto-search-text', name, modal));
                    },
                    afterUpdate(textNode) {
                        textNode.parentElement && (0, textUtils_1.makeTextWordBreak)(textNode.parentElement);
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.dialog-container', 'Available Wallets');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="icon-wallet-connect"]', 'auto-search-text', name, modal));
                    },
                    afterUpdate(textNode) {
                        textNode.parentElement && (0, textUtils_1.makeTextWordBreak)(textNode.parentElement);
                    } }),
            ],
        },
    },
    {
        urls: ['spooky.fi'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'div[data-testid="wallet-modal"]' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'div[data-testid="wallet-modal"]', skip: { mobile: true } }),
            ],
        },
    },
    {
        urls: ['usyc.hashnote.com'],
        testPath: [':text("Connect your wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        var _a;
                        const shadowRoot = (_a = document.querySelector('div[data-testid="dynamic-modal-shadow"]')) === null || _a === void 0 ? void 0 : _a.shadowRoot;
                        if (!shadowRoot) {
                            return null;
                        }
                        const parent = shadowRoot.querySelector('div.wallet-list__container');
                        return (parent &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[data-testid="wallet-icon-metamask"]', 'auto-search-text', name, parent));
                    } }),
            ],
        },
    },
    {
        urls: ['polygon.tangible.store'],
        testPath: {
            mobile: ['header button img'],
            desktop: [':text("Connect")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask.svg"][alt="MetaMask icon"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['apps.acala.network'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.polkadot]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['polkadot']), { findIconAndName() {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="Polkadotjs Logo"]', 'auto-search-text', /^Polkadot/, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.rhino.fi'],
        testPath: [':text("Allow All")', ':text("connect wallet")'],
        constraintMap: { icon: [], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#metamask' }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: '#walletConnect' }),
            ],
        },
    },
    {
        urls: ['app.zero.button.finance'],
        testPath: { mobile: ['header button svg', ':text("Connect")'], desktop: [':text("Connect")'] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'ul.bn-onboard-modal-select-wallets' }),
            ],
        },
    },
    {
        urls: ['blast.io'],
        testUrls: ['blast.io/zh-CN/bridge'],
        testPath: (page) => __awaiter(void 0, void 0, void 0, function* () {
            yield page.locator(':text("Check your")').click();
            yield page.evaluate(function () {
                var _a;
                (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.click();
            });
            yield page.locator(":text('连接钱包')").click();
        }),
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'div[aria-label="选择要连接的钱包"]' }),
            ],
        },
    },
    {
        urls: ['app.ichi.org'],
        testPath: ['button:text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['klayswap.com'],
        testPath: ['button:text("Confirm")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'div.SelectWalletModal', afterUpdate(textNode, icon) {
                        if (textNode.parentElement) {
                            (0, textUtils_1.makeTextEllipse)(textNode.parentElement, { width: '100%' });
                            textNode.parentElement.style.flexShrink = '0';
                            // textNode.parentElement.style.width = '100%';
                        }
                        icon.style.height = 'auto';
                    } }),
            ],
        },
    },
    {
        urls: ['dojo.trading'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', [
                            'Connect Wallet',
                            '连接钱包',
                        ]);
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask.svg"][alt="Metamask"]', 'auto-search-text', name, modal));
                    },
                    afterUpdate(textNode, icon) {
                        icon.style.marginRight = '12px';
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', [
                            'Connect Wallet',
                            '连接钱包',
                        ]);
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="keplr.svg"][alt="Keplr"]', 'auto-search-text', name, modal));
                    },
                    afterUpdate(textNode, icon) {
                        icon.style.marginRight = '12px';
                    } }),
            ],
        },
    },
    {
        urls: ['gains.trade'],
        testUrls: ['gains.trade/trading#BTC-USD'],
        testPath: ['button:has-text("Agree")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit],
        },
    },
    {
        urls: ['dhedge.org'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#headlessui-portal-root div[role="dialog"]', 'Choose Network');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"][alt="MetaMask logo"]', 'auto-search-text', wallet.name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#headlessui-portal-root div[role="dialog"]', 'Choose Network');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallet_connect"][alt="WalletConnect logo"]', 'auto-search-text', wallet.name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.milkyway.zone'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { name: /^(Keplr|Keplr Mobile)$/i, container: 'div[aria-label="wallet list"][role="list"]' }),
            ],
        },
    },
    {
        urls: ['neopin.io'],
        // skip: {
        // mobile: true, //WARN: mobile is not supported by the site
        // },
        skip: true,
        // testPath: ['#__next :text("Accept All")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('#modal-root', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['orby.network'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('.chakra-portal div.chakra-modal__content-container', 'Please select your wallet:');
                        return (modal && (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="MetaMask"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['tokenlon.im'],
        testUrls: ['tokenlon.im/instant'],
        testPath: [':text("Try it now")', ':text("Connect Wallet")'],
        skip: {
            mobile: true, //WARN: metamask is not supported by the mobile site
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.connect-options', [
                            'Select Wallet',
                            '选择钱包',
                        ]);
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img.logo[alt="MetaMask"]', 'auto-search-text', name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.connect-options', [
                            'Select Wallet',
                            '选择钱包',
                        ]);
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img.logo[alt="WalletConnect"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.unitus.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modals = utilsDomNodes_1.default.findTextNode('#root', 'Connect Wallet', 'all')
                            .map((e) => { var _a; return (_a = e === null || e === void 0 ? void 0 : e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; })
                            .filter(Boolean);
                        const modal = modals === null || modals === void 0 ? void 0 : modals[modals.length - 1];
                        return modal
                            ? (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallet-MetaMask"]', 'auto-search-text', name, modal)
                            : null;
                    } }),
            ],
        },
    },
    {
        urls: ['app.shadeprotocol.io'],
        testPath: {
            mobile: [
                '.main-nav-mobile .hamburger',
                '.proceed-cta-checkbox input',
                'button:text("Proceed")',
                ':text("Connect Wallet")',
            ],
            desktop: ['.proceed-cta-checkbox input', 'button:text("Proceed")', ':text("Connect Wallet")'],
        },
        skip: { mobile: true },
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.modal-connect-wallet', 'Connect Wallet') }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.modal-connect-wallet', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['app.mai.finance'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'button#connect-METAMASK' }),
            ],
        },
    },
    {
        urls: ['smardex.io'],
        testUrls: ['smardex.io/swap'],
        testPath: {
            mobile: ['nav button.btn-outline'],
            desktop: [':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['stake.link'],
        testUrls: ['stake.link/ethereum'],
        testPath: {
            mobile: ['button[data-testid="rk-connect-button"]'],
            desktop: [':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['jpegd.io'],
        testUrls: ['jpegd.io/vaults'],
        testPath: {
            desktop: ['button:has-text("I agree")', ':text("Connect Wallet")'],
            mobile: [
                'button:has-text("I agree")',
                'div.ei7w3c12.MuiBox-root svg',
                ':text("Connect Wallet")',
            ],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { name: / Metamask$/, 
                    // container: 'div[role="presentation"].MuiModal-root',
                    findIconAndName({ name }) {
                        const modal = document.querySelector('div[role="presentation"].MuiModal-root');
                        return modal
                            ? (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="static/media/1.eb7cbbcbf"]', 'auto-search-text', name, modal)
                            : null;
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = document.querySelector('div[role="presentation"].MuiModal-root');
                        return modal
                            ? (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="static/media/2.cb9826961cbcd25676"]', 'auto-search-text', name, modal)
                            : null;
                    } }),
            ],
        },
    },
    {
        urls: ['fi.woo.org'],
        testUrls: ['fi.woo.org/swap'],
        mutationObserverOptions: {
            childList: true,
            subtree: true,
            attributes: true,
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.modal .outer-container div.wallets-container ', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    }, afterUpdate(textNode, img) {
                        img.style.width = '32px';
                        img.style.height = '32px';
                        img.style.maxWidth = '32px';
                        img.style.maxHeight = '32px';
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: '.modal .outer-container div.wallets-container ', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    }, afterUpdate(textNode, img) {
                        img.style.width = '32px';
                        img.style.height = '32px';
                        img.style.maxWidth = '32px';
                        img.style.maxHeight = '32px';
                    } }),
            ],
        },
    },
    {
        urls: ['notional.finance'],
        testUrls: ['notional.finance/portfolio/mainnet/overview'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        var _a, _b;
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.MuiDrawer-paper.MuiDrawer-paperAnchorRight', ['CONNECT A WALLET', '连接钱包', 'ウォレットを接続']);
                        if (!modal) {
                            return null;
                        }
                        const text = (0, textUtils_1.findWalletTextByParent)(modal, name, []);
                        const img = (_b = (_a = text === null || text === void 0 ? void 0 : text.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('img');
                        return img && text
                            ? {
                                textNode: text,
                                iconNode: img,
                            }
                            : null;
                    },
                    afterUpdate(textNode, img) {
                        if (textNode.parentElement) {
                            textNode.parentElement.style.overflow = 'visible';
                        }
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        var _a, _b;
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.MuiDrawer-paper.MuiDrawer-paperAnchorRight', ['CONNECT A WALLET', '连接钱包', 'ウォレットを接続']);
                        if (!modal) {
                            return null;
                        }
                        const text = (0, textUtils_1.findWalletTextByParent)(modal, name, []);
                        const img = (_b = (_a = text === null || text === void 0 ? void 0 : text.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('img');
                        return img && text
                            ? {
                                textNode: text,
                                iconNode: img,
                            }
                            : null;
                    },
                    afterUpdate(textNode, img) {
                        if (textNode.parentElement) {
                            textNode.parentElement.style.overflow = 'visible';
                        }
                    } }),
            ],
        },
    },
    {
        urls: ['shibaswap.com'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'button#connect-0', skip: { mobile: true } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'button#connect-1' }),
            ],
        },
    },
    {
        urls: ['app.kuma.bond'],
        testPath: [
            ':text("connect")',
            ':text("Disclaimer")',
            'button[id*="headlessui-switch"]',
            'button:text("Next")',
        ],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['par.mimo.capital'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('section.chakra-modal__content[role="dialog"]', 'Connect to a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask-icon"][alt="Icon"]', 'auto-search-text', name, modal));
                    },
                    afterUpdate(textNode, iconNode) {
                        iconNode.style.aspectRatio = '1';
                        iconNode.style.minWidth = '32px';
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('section.chakra-modal__content[role="dialog"]', 'Connect to a wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallet-connect-icon"][alt="Icon"]', 'auto-search-text', name, modal));
                    },
                    afterUpdate(textNode, iconNode) {
                        iconNode.style.aspectRatio = '1';
                        iconNode.style.minWidth = '32px';
                        const { defaultVal } = (0, utils_1.getMaxWithOfText)(textNode, iconNode);
                        textNode.parentElement &&
                            (0, textUtils_1.makeTextEllipse)(textNode.parentElement, {
                                maxWidth: defaultVal,
                            });
                    } }),
            ],
        },
    },
    {
        urls: ['www.mev.io'],
        testUrls: ['www.mev.io/stake'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['dapp.rifonchain.com'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#rlogin-connect-modal' }),
            ],
        },
    },
    {
        urls: ['v2.sturdy.finance'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect a wallet') }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect a wallet') }),
            ],
        },
    },
    {
        urls: ['blast.wasabi.xyz'],
        testPath: [':text("STAKE NOW")', ':text("CONNECT WALLET")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.cellana.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { name: /^Petra Wallet$/, container: () => (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal[role="dialog"]', 'Connect a wallet') }),
            ],
        },
    },
    {
        urls: ['www.vaultka.com'],
        testPath: {
            mobile: [':text("Connect")'],
            desktop: [':text("Coming Soon")', ':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['hmx.org'],
        testUrls: ['hmx.org/blast/trade/eth-usd'],
        testPath: {
            desktop: ['button:has-text("Accept & Continue")', ':text("Connect Wallet")'],
            mobile: ['button:has-text("Accept & Continue")', ':text("Connect Wallet")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"][alt="MetaMask"]', 'auto-search-text', wallet.name, modal));
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="wallet-connect"][alt="Wallet Connect"]', 'auto-search-text', wallet.name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.mav.xyz'],
        testUrls: ['app.mav.xyz'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'section.fixed', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    } }),
                Object.assign(Object.assign({}, exports.basicWalletInfo['walletconnect']), { container: 'section.fixed', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    } }),
            ],
        },
    },
    {
        urls: ['app.vesper.finance'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.fixed div.rounded-lg', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['ferroprotocol.com'],
        testPath: {
            mobile: ['header [data-testid="settingsMenuBtn"]', ':text("Connect")'],
            desktop: [':text("Connect")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName(wallet) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"][alt="MetaMask"]', 'auto-search-text', wallet.name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['oraidex.io'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect to OraiDEX') }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect to OraiDEX') }),
            ],
        },
    },
    {
        urls: ['sft.network'],
        testUrls: ['sft.network/#/stake'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect wallet to continue'), afterUpdate(textNode) {
                        textNode.parentElement && (0, textUtils_1.makeTextAlignCenter)(textNode.parentElement);
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.comlana]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['phantom']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Connect wallet to continue'), afterUpdate(textNode) {
                        textNode.parentElement && (0, textUtils_1.makeTextAlignCenter)(textNode.parentElement);
                    } }),
            ],
        },
    },
    {
        urls: ['stake.anvm.io'],
        skip: { mobile: true },
        testPath: {
            desktop: [':text("Connect Wallet")', ':nth-match(button.rounded-full:text("Connect"),2)'],
            'mobile': [
                'header.g-container > button',
                ':text("Connect Wallet")',
                ':nth-match(button.rounded-full:text("Connect"),2)',
            ],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"][id*="headlessui"]', 'Choose Wallet') }),
            ],
        },
    },
    {
        urls: ['meson.fi'],
        testPath: {
            desktop: [':text("AGREE AND CONTINUE")', ':text("CONNECT WALLET")'],
            mobile: [":text('Connect your wallet')"],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.fixed', 'CONNECT WALLET') }),
            ],
        },
    },
    {
        urls: ['bsquared.boolbridge.com'],
        testPath: ['.homepage button:has-text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"]', 'Bitcoin Wallets') }),
            ],
        },
    },
    {
        urls: ['app.gyro.finance'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit, walletConnectForRainbowKit],
        },
    },
    {
        urls: ['app.reflexer.finance'],
        skip: { mobile: true },
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#connect-METAMASK' }),
            ],
        },
    },
    {
        urls: ['stusdt.io'],
        testPath: {
            desktop: [':text("Connect Wallet")'],
            mobile: [
                'div.positive-btn:text("Accept")',
                '.mobile-header .mobile-category-outer',
                ':text("Connect Wallet")',
            ],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal-content', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="static/media/metamask"]', 'auto-search-text', name, modal));
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.tron]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['tronlink']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.ant-modal-content', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="static/media/tronlink"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.hydration.net'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"][data-state="open"]', 'Connect wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="assets/MetaMask"][alt="MetaMask Logo"]', 'auto-search-text', name, modal));
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.polkadot]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['polkadot']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"][data-state="open"]', 'Connect wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="Polkadotjs Logo"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.slingshot.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#portal-root>div', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByName)(modal, name, (text) => {
                                var _a, _b, _c;
                                return (_c = (_b = (_a = text === null || text === void 0 ? void 0 : text.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('div svg[height="38"]');
                            }));
                    },
                    afterUpdate(textNode) {
                        textNode.parentElement && (0, textUtils_1.makeTextAlignLeft)(textNode.parentElement);
                    } }),
            ],
        },
    },
    {
        urls: ['phux.io'],
        testPath: ['button:text("Accept")', ':text("Connect Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.bal-modal', 'Connect to a wallet') }),
            ],
        },
    },
    {
        urls: ['app.metronome.io'],
        testPath: ['button:text("Switch to")', ':text("Connect Wallet")'],
        constraintMap: { text: [], 'icon': [imgUtils_1.isWalletIconLessEqualThan] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.fixed', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['nftx.io', 'v3.nftx.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit],
        },
    },
    {
        urls: ['app.marsprotocol.io'],
        testPath: [':text("Connect Wallet")', 'button:has-text("Agree")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { name: /^Keplr Wallet$/, findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('main > div.relative', 'Connect your wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="keplr"][alt="Keplr Wallet"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['farm.acala.network'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('#headlessui-portal-root div.relative[id*="headlessui-dialog"]', 'Connect your wallet'), afterUpdate(textNode) {
                        textNode.parentElement && (0, textUtils_1.makeTextWrap)(textNode.parentElement);
                    } }),
            ],
        },
    },
    {
        urls: ['baklava.space'],
        testUrls: ['baklava.space/vaults/'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: 'div[role="dialog"][data-reach-dialog-content]' }),
            ],
        },
    },
    {
        urls: ['app.lenfi.io'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cardano]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['nami']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('.ReactModalPortal [role="dialog"]', 'Connect wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['oyster.synfutures.com'],
        testPath: {
            desktop: ['button:text("I Agree")', ':text("Connect Wallet")'],
            mobile: ['button:text("I Agree")', 'button.wallet-connect-btn-mobile'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)(':is(div[role="dialog"].user-wallet-modal,div.ant-drawer.user-wallet-drawer)', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['app.liqee.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        return (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="media/wallet-MetaMask"]', 'auto-search-text', name, document.body, { 'icon': [imgUtils_1.isWalletIconLessEqualThan, utils_1.isClickable], 'text': [utils_1.isClickable] }, 2);
                    } }),
            ],
        },
    },
    {
        urls: ['app.strike.org'],
        testPath: {
            desktop: [':text("Connect")', 'div.button:has-text("Continue")'],
            mobile: ['div.sc-ecaExY', ':text("Connect")', 'div.button:has-text("Continue")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const metamaskBtn = document.querySelector('div.ant-modal.connect-modal .metamask-connect-btn');
                        return (metamaskBtn &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="metamask"]', 'auto-search-text', name, metamaskBtn));
                    } }),
            ],
        },
    },
    // {
    //   urls: ['muesliswap.com'],
    //   constraintMap: { icon: [isWalletIconLessEqualThan], text: [] },
    //   walletsForProvider: {
    //     [IInjectedProviderNames.cardano]: [
    //       {
    //         ...basicWalletInfo['nami'],
    //         container: () => {
    //           return getConnectWalletModalByTitle(
    //             '.ReactModalPortal [role="dialog"]',
    //             'Connect wallet',
    //           );
    //         },
    //       },
    //     ],
    //   },
    // }
    {
        urls: ['dapp.cian.app'],
        testPath: [':text("Cancel")', ':text("Connect")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"].ant-modal', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="static/media/metamask"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.ib.xyz'],
        testPath: [':text("Cancel")', ':text("Connect")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.modal .outer-container div.wallets-container ', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    } }),
            ],
        },
    },
    {
        urls: ['app.aptin.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.aptos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['petra']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.MuiPaper-root.aptin-dialog', 'Connect a wallet') }),
            ],
        },
    },
    {
        urls: ['juicebox.money'],
        testPath: {
            desktop: [':text("Connect")', 'button:has-text("I Agree")'],
            mobile: ['nav [role="button"]', ':text("Connect")', 'button:has-text("I Agree")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.modal .outer-container div.wallets-container ', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    } }),
            ],
        },
    },
    {
        urls: ['merlinswap.org'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName({ name }) {
                        var _a, _b;
                        const textNodes = utilsDomNodes_1.default.findTextNode('#root', /^Connect Wallet$/, 'all');
                        const text = textNodes === null || textNodes === void 0 ? void 0 : textNodes.find((e) => { var _a, _b; return !!((_b = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('img[src*="lightCloseButton.svg"]')); });
                        const modal = (_b = (_a = text === null || text === void 0 ? void 0 : text.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                        console.log('==>text', text, '==>modal', modal, 'textNodes', textNodes);
                        return ((modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img.chakra-image[src*="wallet/metamask.png"]', 'auto-search-text', name, modal)) ||
                            null);
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { findIconAndName({ name }) {
                        var _a, _b;
                        const textNodes = utilsDomNodes_1.default.findTextNode('#root', /^Connect Wallet$/, 'all');
                        const text = textNodes === null || textNodes === void 0 ? void 0 : textNodes.find((e) => { var _a, _b; return !!((_b = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('img[src*="lightCloseButton.svg"]')); });
                        const modal = (_b = (_a = text === null || text === void 0 ? void 0 : text.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                        return ((modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img.chakra-image[src*="wallet/unisat.png"]', 'auto-search-text', name, modal)) ||
                            null);
                    } }),
            ],
        },
    },
    {
        urls: ['testnet.zkbase.app'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.btc]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['unisat']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('div.modal-panel.w-full', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['veno.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { findIconAndName: ({ container, name }) => {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('section[role="dialog"].chakra-modal__content', 'Connect wallet');
                        return (modal && (0, findIconAndName_1.findIconAndNameByIcon)('img[alt="MetaMask"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['www.tarot.to'],
        testPath: {
            'desktop': ['button:has-text("Accept")', ':text("Connect Wallet")'],
            mobile: ['button:has-text("Accept")', 'nav button.inline-flex', ':text("Connect")'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"].fixed.z-tarotModal', 'Connect Wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['myfil.pages.dev'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"].ant-modal-wrap', 'Connect Wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['app.term.finance'],
        skip: true,
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('section[role="dialog"].chakra-modal__content', 'Connect Wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['app.ribbon.finance'],
        // testPath: { desktop: [":text('Connect Wallet')", ':text(Ethereum)'] },
        skip: true,
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"].modal', 'CONNECT WALLET');
                    } }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.comlana]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['phantom']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('div[role="dialog"].modal', 'CONNECT WALLET');
                    } }),
            ],
        },
    },
    {
        urls: ['app.pstake.finance'],
        skip: true,
        testUrls: ['app.pstake.finance/cosmos'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { container: () => {
                        return (0, utils_1.getConnectWalletModalByTitle)('.modal.wallets-modal', 'Connect wallet');
                    } }),
            ],
        },
    },
    {
        urls: ['solo.top'],
        skip: { mobile: true },
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#connect-METAMASK' }),
            ],
        },
    },
    {
        urls: ['keep3r.network'],
        testPath: {
            desktop: [':text("Connect wallet")'],
            mobile: ['button.fixed.flex'],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.yearn--modal' }),
            ],
        },
    },
    {
        urls: ['ape.bond'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#wallet-connect-metamask' }),
            ],
        },
    },
    {
        urls: ['deri.io'],
        testUrls: ['deri.io/#/lite/trade/futures/BTCUSD'],
        constraintMap: { icon: [imgUtils_1.isWalletIconLessEqualThan], text: [] },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.dialog.wallet-modal' }),
            ],
        },
    },
    {
        urls: ['bridge.wing.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.bridge-list__content .wallet_type' }),
            ],
        },
    },
    {
        urls: ['helixapp.com'],
        testPath: [':text("Connect Wallet")', ':text("Confirm")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('.fixed.backdrop-filter .modal-container', 'Popular') }),
            ],
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('.fixed.backdrop-filter .modal-container', 'Popular') }),
            ],
            // [IInjectedProviderNames.comlana]: [
            //   {
            //     ...basicWalletInfo['phantom'],
            //     container: () =>
            //       getConnectWalletModalByTitle(
            //         '.fixed.backdrop-filter .modal-container',
            //         'Other Wallets',
            //       ),
            //   },
            // ],
        },
    },
    {
        urls: ['app.ux.xyz'],
        testPath: ['button:has-text("Yes")', ':text("Connect")'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { name: /^Keplr Wallet$/, container: () => (0, utils_1.getConnectWalletModalByTitle)('div.modal-layer', 'Connect Wallet') }),
            ],
        },
    },
    {
        urls: ['app-v2.acryptos.com'],
        skip: { mobile: true },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '#WEB3_CONNECT_MODAL_ID' }),
            ],
        },
    },
    {
        urls: ['fusionx.finance'],
        testUrls: ['fusionx.finance/swap'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { name: /^Metamask$/, findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('#portal-root div[role="dialog"]', 'Connect Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="metamask"]', 'auto-search-text', name, modal, {
                                'icon': [imgUtils_1.isWalletIconLessEqualThan],
                                'text': [],
                            }, 5));
                    } }),
            ],
        },
    },
    {
        urls: ['app.optim.finance'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cardano]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['nami']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.backdrop-blur[class*="Modal"]', 'Select Wallet');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="nami"][alt="Nami"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['autofarm.network'],
        testPath: [':text("Wallet")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.modal .outer-container div.wallets-container ', findIconAndName: ({ container, name }) => {
                        return (0, shadowRoot_1.findIconAndNameInShadowRoot)('onboard-v2', container, name);
                    }, afterUpdate(textNode) {
                        textNode.parentElement && (0, textUtils_1.makeTextAlignLeft)(textNode.parentElement);
                    } }),
            ],
        },
    },
    {
        urls: ['app.wingriders.com'],
        testPath: {
            desktop: [
                'button:has-text("Got it")',
                'button:has-text("I Agree")',
                ':text("Connect Wallet")',
            ],
            mobile: [
                'button:has-text("Got it")',
                'button:has-text("I Agree")',
                'header button svg',
                ':text("Connect Wallet")',
            ],
        },
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cardano]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['nami']), { findIconAndName({ name }) {
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('div.MuiDialog-container', 'Connect to WingRiders');
                        return (modal &&
                            (0, findIconAndName_1.findIconAndNameByIcon)('img[src*="nami"][alt="Nami wallet"]', 'auto-search-text', name, modal));
                    } }),
            ],
        },
    },
    {
        urls: ['app.vyfi.io'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cardano]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['nami']), { container: '#wallet-connect-nami' }),
            ],
        },
    },
    {
        urls: ['wemixonkroma.xyz'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['metamask']), { container: '.wallet-modal-connect-button' }),
            ],
        },
    },
    {
        urls: ['app.arcade.xyz'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.ethereum]: [metamaskForRainbowKit],
        },
    },
    {
        urls: ['app.quarry.com'],
        testPath: [':text("Connect Wallet")', ':text("Continue")'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.comlana]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['phantom']), { container: () => (0, utils_1.getConnectWalletModalByTitle)('.goki-walletkit-modal-wrapper', 'Select your wallet') }),
            ],
        },
    },
    {
        urls: ['www.erisprotocol.com'],
        testUrls: ['www.erisprotocol.com/terra/amp-compounder'],
        walletsForProvider: {
            [cross_inpage_provider_types_1.IInjectedProviderNames.cosmos]: [
                Object.assign(Object.assign({}, exports.basicWalletInfo['keplr']), { name: /^Keplr$/, update({ name, updatedName }) {
                        var _a;
                        const modal = (0, utils_1.getConnectWalletModalByTitle)('tui-dialog', 'Connected Wallets');
                        if (!modal) {
                            return null;
                        }
                        const text = (0, textUtils_1.findWalletTextByParent)(modal, name, []);
                        if (!text) {
                            return null;
                        }
                        return (_a = (0, textUtils_1.replaceText)(text, updatedName)) === null || _a === void 0 ? void 0 : _a.parentElement;
                    } }),
            ],
        },
    },
];
