"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectWeb3Provider = void 0;
const chargerwallet_eth_provider_1 = require("@chargerwallet/chargerwallet-eth-provider");
const chargerwallet_private_provider_1 = require("@chargerwallet/chargerwallet-private-provider");
const chargerwallet_solana_provider_1 = require("@chargerwallet/chargerwallet-solana-provider");
// import { ProviderStarcoin } from '@chargerwallet/chargerwallet-starcoin-provider';
const chargerwallet_aptos_provider_1 = require("@chargerwallet/chargerwallet-aptos-provider");
const chargerwallet_conflux_provider_1 = require("@chargerwallet/chargerwallet-conflux-provider");
const chargerwallet_alph_provider_1 = require("@chargerwallet/chargerwallet-alph-provider");
const chargerwallet_tron_provider_1 = require("@chargerwallet/chargerwallet-tron-provider");
const chargerwallet_cardano_provider_1 = require("@chargerwallet/chargerwallet-cardano-provider");
// import { ProviderPrivateExternalAccount } from '@chargerwallet/chargerwallet-private-external-account-provider';
const chargerwallet_cosmos_provider_1 = require("@chargerwallet/chargerwallet-cosmos-provider");
const chargerwallet_polkadot_provider_1 = require("@chargerwallet/chargerwallet-polkadot-provider");
const cross_inpage_provider_core_1 = require("@chargerwallet/cross-inpage-provider-core");
const chargerwallet_sui_provider_1 = require("@chargerwallet/chargerwallet-sui-provider");
const chargerwallet_webln_provider_1 = require("@chargerwallet/chargerwallet-webln-provider");
const chargerwallet_scdo_provider_1 = require("@chargerwallet/chargerwallet-scdo-provider");
const chargerwallet_ton_provider_1 = require("@chargerwallet/chargerwallet-ton-provider");
const chargerwallet_nostr_provider_1 = require("@chargerwallet/chargerwallet-nostr-provider");
const chargerwallet_btc_provider_1 = require("@chargerwallet/chargerwallet-btc-provider");
const chargerwallet_algo_provider_1 = require("@chargerwallet/chargerwallet-algo-provider");
const connectButtonHack_1 = require("./connectButtonHack");
const detectRiskWebsite_1 = require("./detectRiskWebsite");
const consts_1 = require("./connectButtonHack/consts");
function injectWeb3Provider() {
    var _a, _b;
    if (!((_a = window === null || window === void 0 ? void 0 : window.$chargerwallet) === null || _a === void 0 ? void 0 : _a.jsBridge)) {
        throw new Error('ChargerWallet jsBridge not found.');
    }
    const bridge = (_b = window === null || window === void 0 ? void 0 : window.$chargerwallet) === null || _b === void 0 ? void 0 : _b.jsBridge;
    const ethereum = new chargerwallet_eth_provider_1.ProviderEthereum({
        bridge,
    });
    const $private = new chargerwallet_private_provider_1.ProviderPrivate({
        bridge,
    });
    const solana = new chargerwallet_solana_provider_1.ProviderSolana({
        bridge,
    });
    // const starcoin = new ProviderStarcoin({
    //   bridge,
    // });
    const martian = new chargerwallet_aptos_provider_1.ProviderAptosMartian({
        bridge,
    });
    const conflux = new chargerwallet_conflux_provider_1.ProviderConflux({
        bridge,
    });
    const tron = new chargerwallet_tron_provider_1.ProviderTron({
        bridge,
    });
    const sui = new chargerwallet_sui_provider_1.ProviderSui({
        bridge,
    });
    const cardano = new chargerwallet_cardano_provider_1.ProviderCardano({
        bridge,
    });
    const alephium = new chargerwallet_alph_provider_1.ProviderAlph({
        bridge,
    });
    const tonconnect = new chargerwallet_ton_provider_1.ProviderTon({
        bridge,
    });
    const cosmos = new chargerwallet_cosmos_provider_1.ProviderCosmos({
        bridge,
    });
    const polkadot = new chargerwallet_polkadot_provider_1.ProviderPolkadot({
        bridge,
    });
    const webln = new chargerwallet_webln_provider_1.ProviderWebln({
        bridge,
    });
    const nostr = new chargerwallet_nostr_provider_1.ProviderNostr({
        bridge,
    });
    const btc = new chargerwallet_btc_provider_1.ProviderBtc({ bridge });
    const btcWallet = new chargerwallet_btc_provider_1.ProviderBtcWallet({ bridge });
    const algorand = new chargerwallet_algo_provider_1.ProviderAlgo({ bridge });
    const scdo = new chargerwallet_scdo_provider_1.ProviderScdo({ bridge });
    // const $privateExternalAccount = new ProviderPrivateExternalAccount({ bridge });
    // providerHub
    const $chargerwallet = Object.assign(Object.assign({}, window.$chargerwallet), { jsBridge: bridge, $private,
        // $privateExternalAccount,
        ethereum,
        solana, 
        // starcoin,
        aptos: martian, conflux,
        tron, sollet: null, sui,
        tonconnect,
        cardano,
        alephium,
        cosmos,
        scdo,
        webln,
        nostr,
        btc, btcwallet: btcWallet, algorand });
    (0, cross_inpage_provider_core_1.defineWindowProperty)('$chargerwallet', $chargerwallet, { enumerable: true, alwaysInject: true });
    const martianProxy = new Proxy(martian, {
        get: (target, property, ...args) => {
            if (property === 'aptosProviderType') {
                return 'martian';
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return Reflect.get(target, property, ...args);
        },
    });
    (0, cross_inpage_provider_core_1.defineWindowProperty)('ethereum', ethereum);
    (0, chargerwallet_eth_provider_1.registerEIP6963Provider)({
        image: consts_1.WALLET_CONNECT_INFO.chargerwallet.icon,
        provider: ethereum,
    });
    if ((0, cross_inpage_provider_core_1.checkWalletSwitchEnable)()) {
        (0, chargerwallet_eth_provider_1.registerEIP6963Provider)({
            uuid: '7677b54f-3486-46e2-4e37-bf8747814f',
            name: 'MetaMask',
            rdns: 'io.metamask',
            image: consts_1.WALLET_CONNECT_INFO.metamask.icon,
            provider: ethereum,
        });
    }
    (0, cross_inpage_provider_core_1.defineWindowProperty)('solana', solana);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('phantom', { solana });
    // defineWindowProperty('starcoin', starcoin);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('aptos', martian);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('petra', martian, { enumerable: true });
    (0, cross_inpage_provider_core_1.defineWindowProperty)('martian', martianProxy, { enumerable: true });
    (0, cross_inpage_provider_core_1.defineWindowProperty)('conflux', conflux);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('alephium', alephium);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('alephiumProviders', {
        alephium,
    });
    (0, cross_inpage_provider_core_1.defineWindowProperty)('tronLink', tron);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('suiWallet', sui);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('chargerwalletTonWallet', {
        tonconnect,
    });
    (0, cross_inpage_provider_core_1.defineWindowProperty)('openmask', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        tonconnect: (0, chargerwallet_ton_provider_1.createTonProviderOpenMask)(tonconnect),
    });
    (0, cross_inpage_provider_core_1.defineWindowProperty)('unisat', btc);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('scdo', scdo);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('algorand', algorand);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('exodus', {
        algorand,
    });
    // Cardano chain provider injection is handled independently.
    if ((0, cross_inpage_provider_core_1.checkWalletSwitchEnable)()) {
        (0, chargerwallet_cardano_provider_1.defineWindowCardanoProperty)('cardano', cardano);
    }
    // cosmos keplr
    (0, cross_inpage_provider_core_1.defineWindowProperty)('keplr', cosmos);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('getOfflineSigner', cosmos.getOfflineSigner.bind(cosmos));
    (0, cross_inpage_provider_core_1.defineWindowProperty)('getOfflineSignerOnlyAmino', cosmos.getOfflineSignerOnlyAmino.bind(cosmos));
    (0, cross_inpage_provider_core_1.defineWindowProperty)('getOfflineSignerAuto', cosmos.getOfflineSignerAuto.bind(cosmos));
    // Lightning Network
    (0, cross_inpage_provider_core_1.defineWindowProperty)('webln', webln);
    (0, cross_inpage_provider_core_1.defineWindowProperty)('nostr', nostr);
    // ** shim or inject real web3
    //
    // if (!window.web3) {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument
    //   window.web3 = new Web3(ethereum as any);
    // }
    (0, chargerwallet_eth_provider_1.shimWeb3)(ethereum);
    // TODO use initializeInpageProvider.ts
    window.dispatchEvent(new Event('ethereum#initialized'));
    // Solana Standard Wallet
    if ((0, cross_inpage_provider_core_1.checkWalletSwitchEnable)()) {
        (0, chargerwallet_solana_provider_1.registerSolanaWallet)(solana, {
            icon: consts_1.WALLET_CONNECT_INFO.chargerwallet.icon,
        });
    }
    // Sui Standard Wallet
    if ((0, cross_inpage_provider_core_1.checkWalletSwitchEnable)()) {
        (0, chargerwallet_sui_provider_1.registerSuiWallet)(sui, {
            logo: consts_1.WALLET_CONNECT_INFO.chargerwallet.icon,
        });
    }
    // Override the SuiWallet Standard Wallet
    if ((0, cross_inpage_provider_core_1.checkWalletSwitchEnable)()) {
        (0, chargerwallet_sui_provider_1.registerSuiWallet)(sui, {
            name: 'Sui Wallet',
            logo: consts_1.WALLET_CONNECT_INFO.chargerwallet.icon,
        });
    }
    if ((0, cross_inpage_provider_core_1.checkWalletSwitchEnable)()) {
        (0, chargerwallet_polkadot_provider_1.registerPolkadot)(polkadot);
    }
    if ((0, cross_inpage_provider_core_1.checkWalletSwitchEnable)()) {
        (0, chargerwallet_polkadot_provider_1.registerPolkadot)(polkadot, 'polkadot-js', '0.44.1');
    }
    setTimeout(() => {
        void (0, detectRiskWebsite_1.detectWebsiteRiskLevel)();
        void (0, connectButtonHack_1.hackAllConnectButtons)();
        void (0, detectRiskWebsite_1.listenPageFocus)();
    }, 1000);
    return $chargerwallet;
}
exports.injectWeb3Provider = injectWeb3Provider;
