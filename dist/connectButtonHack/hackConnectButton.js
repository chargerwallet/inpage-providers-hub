var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ISpecialPropertyProviderNamesReflection, Logger, checkWalletSwitchEnable, } from '@chargerwallet/cross-inpage-provider-core';
import { throttle } from 'lodash';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
const hackButtonLogger = new Logger('hackButton');
function checkIfInjectedProviderConnected({ providerName, }) {
    var _a;
    const hub = window.$chargerwallet;
    if (providerName === IInjectedProviderNames.ethereum) {
        // dapp disconnect won't remove accounts in wallet, so this check won't working
        // @ts-ignore
        // return Boolean(hub?.ethereum?._state?.accounts?.length);
        return false;
    }
    if (providerName === IInjectedProviderNames.comlana) {
        return Boolean((_a = hub === null || hub === void 0 ? void 0 : hub.comlana) === null || _a === void 0 ? void 0 : _a.publicKey);
    }
    return false;
}
/**
 * Checks if the given key is a valid key of the `ISpecialPropertyProviderNamesReflection` enum.
 * This function acts as a type guard, verifying if a string is one of the keys in the `ISpecialPropertyProviderNamesReflection` enum.
 *
 * @param key - The key to be checked against the `ISpecialPropertyProviderNamesReflection` enum.
 * @returns Returns `true` if the key is a valid enum key, otherwise returns `false`.
 */
function isKeyOfISpecialPropertyProviderNamesReflection(key) {
    return key in ISpecialPropertyProviderNamesReflection;
}
/**
 * Checks if the provided blockchain provider is enabled.
 * This function determines the status of a blockchain provider by mapping its name to a special property name (if applicable) and then checking if the wallet switch for that property is enabled.
 *
 * @param param - An object containing the name of the blockchain provider.
 * @param providerName - The name of the provider to check. This should be a member of the `IInjectedProviderNames` enum.
 * @returns Returns `true` if the provider is enabled, otherwise returns `false`.
 */
function checkIfInjectedProviderEnable({ providerName }) {
    let property;
    if (isKeyOfISpecialPropertyProviderNamesReflection(providerName)) {
        property = ISpecialPropertyProviderNamesReflection[providerName];
    }
    else {
        property = providerName;
    }
    const result = checkWalletSwitchEnable();
    hackButtonLogger.log('checkIfInjectedProviderEnable', property, result);
    return result;
}
/**
 * Retrieves an array of enabled provider names.
 *
 * @param providers - An array of provider names to check.
 * @returns Returns an array containing the names of all enabled providers.
 */
function getEnabledProviders({ providers, }) {
    return providers.filter((providerName) => {
        return checkIfInjectedProviderEnable({ providerName });
    });
}
export function detectQrcodeFromSvg({ img, }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // https://unpkg.com/qr-scanner@1.4.1/qr-scanner.umd.min.js
        // Firefox does not support drawing SVG images to canvas
        // Unless the svg file has width/height attributes on the root <svg> element
        try {
            img.setAttribute('width', img.clientWidth.toString());
            img.setAttribute('height', img.clientHeight.toString());
        }
        catch (_c) {
            //pass
        }
        const serialized = new XMLSerializer().serializeToString(img);
        const encodedData = window.btoa(serialized);
        const base64 = `data:image/svg+xml;base64,${encodedData}`;
        const res = (yield ((_b = (_a = window.$chargerwallet) === null || _a === void 0 ? void 0 : _a.$private) === null || _b === void 0 ? void 0 : _b.request({
            method: 'wallet_scanQrcode',
            params: [{ base64 }],
        })));
        const result = (res === null || res === void 0 ? void 0 : res.result) || '';
        if (result) {
            return result;
        }
        // @ts-ignore
        if (typeof window.BarcodeDetector !== 'undefined') {
            return new Promise((resolve, reject) => {
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
                const imgTemp = document.createElement('img');
                imgTemp.src = base64;
                imgTemp.style.width = '100px';
                imgTemp.style.height = '100px';
                imgTemp.onload = () => {
                    barcodeDetector
                        .detect(imgTemp)
                        .then((result) => {
                        var _a;
                        resolve(((_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a.rawValue) || '');
                    })
                        .catch(() => resolve(''))
                        .finally(() => {
                        imgTemp.remove();
                    });
                };
                document.body.appendChild(imgTemp);
            });
        }
        return '';
    });
}
let isAddedRotateAnimation = false;
function addRotateAnimationToCss() {
    if (isAddedRotateAnimation) {
        return;
    }
    isAddedRotateAnimation = true;
    const css = window.document.styleSheets[0];
    css.insertRule(`
@keyframes chargerwalletSpinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`, css.cssRules.length);
}
export function createWalletConnectToButton({ container, onCreated, uri, }) {
    if (!uri || !uri.startsWith('wc:')) {
        return;
    }
    const chargerwalletHub = window.$chargerwallet;
    const datasetKey = 'chargerwallet_auto_created_wallet_connect_btn'; // can not include `-`
    if (!container.querySelector(`[data-${datasetKey}]`)) {
        const btn = document.createElement('div');
        btn.dataset[datasetKey] = 'true';
        btn.style.cssText = `
border-radius: 12px;
padding-top: 8px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
background-color: #00B812;
color: white;
font-size: 14px;
line-height: 20px;
font-weight: 500;
cursor: pointer;
text-align: center;
    `;
        // i18n key:
        //    action__connect_chargerwallet_extension
        //    action__connect_chargerwallet
        btn.innerHTML = `
    <span>Connect ChargerWallet</span>
    <span class='chargerwallet-spinner-element' style='
    display: none;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    border: 2px solid white;
    border-bottom-color: transparent;
    border-radius: 50%;'></span>
    `;
        btn.onclick = () => {
            var _a;
            if (btn.dataset['isClicked']) {
                return;
            }
            btn.dataset['isClicked'] = 'true';
            btn.style.backgroundColor = '#bbb';
            btn.style.cursor = 'not-allowed';
            void ((_a = chargerwalletHub === null || chargerwalletHub === void 0 ? void 0 : chargerwalletHub.$private) === null || _a === void 0 ? void 0 : _a.request({
                method: 'wallet_connectToWalletConnect',
                params: { uri },
            }));
            const spinner = btn.querySelector('.chargerwallet-spinner-element');
            if (spinner) {
                spinner.style.animation = 'chargerwalletSpinner 1s linear infinite';
                spinner.style.display = 'inline-block';
                addRotateAnimationToCss();
            }
        };
        onCreated === null || onCreated === void 0 ? void 0 : onCreated(btn);
        container.append(btn);
    }
}
export function createNewImageToContainer({ container, icon, removeSvg = true, onCreated, width, height, }) {
    if (removeSvg) {
        const svg = container.querySelector('svg');
        if (svg) {
            svg.remove();
        }
    }
    const datasetKey = 'chargerwallet_auto_created_icon_img'; // can not include `-`
    if (!container.querySelector(`[data-${datasetKey}]`)) {
        const newImg = document.createElement('img');
        newImg.src = icon;
        newImg.dataset[datasetKey] = 'true';
        newImg.style.maxHeight = '100%';
        newImg.style.maxWidth = '100%';
        if (width) {
            newImg.style.width = width;
        }
        if (height) {
            newImg.style.height = height;
        }
        onCreated === null || onCreated === void 0 ? void 0 : onCreated(newImg);
        container.prepend(newImg);
    }
}
function hackConnectButton({ urls, replaceMethod, providers, mutationObserverOptions = {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: true,
}, throttleDelay = 600, throttleSettings = {
    leading: true,
    trailing: true,
}, callbackDelay = 10, }) {
    const isUrlMatched = () => Boolean(urls.includes(window.location.hostname) || urls.includes('*'));
    const getEnabledInjectedProviders = () => {
        if (!isUrlMatched()) {
            return;
        }
        if (providers.find((providerName) => checkIfInjectedProviderConnected({ providerName }))) {
            return;
        }
        const enabledProviders = getEnabledProviders({ providers });
        if (!enabledProviders || enabledProviders.length === 0) {
            hackButtonLogger.debug('inject Provider disabled, skip hackConnectButton (DEV only log)');
            return;
        }
        // hackButtonLogger.debug('mutation triggered: hackConnectButton (DEV only log)');
        return enabledProviders;
    };
    const run = () => {
        // ignore web site run in iframe
        if (window.top !== window) {
            return;
        }
        if (!isUrlMatched()) {
            return;
        }
        // Select the node that will be observed for mutations
        const targetNode = document.body;
        // Options for the observer (which mutations to observe)
        const config = mutationObserverOptions;
        // Callback function to execute when mutations are observed
        const callback = throttle((mutationList, observer) => {
            setTimeout(() => {
                var _a, _b;
                try {
                    const enabledProviders = getEnabledInjectedProviders();
                    (_a = observer === null || observer === void 0 ? void 0 : observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                    if (!enabledProviders) {
                        return;
                    }
                    replaceMethod === null || replaceMethod === void 0 ? void 0 : replaceMethod({ providers: enabledProviders });
                }
                catch (error) {
                    hackButtonLogger.debug('hackConnectButton mutation ERROR (DEV only log):  ', error);
                }
                finally {
                    (_b = observer === null || observer === void 0 ? void 0 : observer.observe) === null || _b === void 0 ? void 0 : _b.call(observer, targetNode, config);
                }
            }, callbackDelay);
        }, throttleDelay, throttleSettings);
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    };
    let isRun = false;
    const runOnce = () => {
        if (isRun) {
            return;
        }
        isRun = true;
        setTimeout(() => {
            run();
        }, 1000);
    };
    if (document.readyState === 'complete' ||
        // @ts-ignore
        document.readyState === 'loaded' ||
        document.readyState === 'interactive') {
        runOnce();
    }
    else {
        window.addEventListener('DOMContentLoaded', function () {
            runOnce();
        }, false);
    }
    setTimeout(() => {
        try {
            const enabledProviders = getEnabledInjectedProviders();
            if (!enabledProviders) {
                return;
            }
            replaceMethod === null || replaceMethod === void 0 ? void 0 : replaceMethod({ providers: enabledProviders });
        }
        catch (error) {
            // noop
        }
        finally {
            // noop
        }
    }, 3000);
}
export { hackConnectButton };
