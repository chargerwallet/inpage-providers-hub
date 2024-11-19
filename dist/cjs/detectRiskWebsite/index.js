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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenPageFocus = exports.detectWebsiteRiskLevel = void 0;
const style_1 = require("./style");
var EHostSecurityLevel;
(function (EHostSecurityLevel) {
    EHostSecurityLevel["High"] = "high";
    EHostSecurityLevel["Medium"] = "medium";
    EHostSecurityLevel["Security"] = "security";
    EHostSecurityLevel["Unknown"] = "unknown";
})(EHostSecurityLevel || (EHostSecurityLevel = {}));
const wait = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});
class ShadowModal {
    constructor(hostElementId, riskInfo) {
        this.hostElement = document.getElementById(hostElementId);
        if (!this.hostElement) {
            console.error(`Element with ID '${hostElementId}' not found.`);
            return;
        }
        this.shadowRoot = this.hostElement.attachShadow({ mode: "open" });
        this.riskInfo = riskInfo;
        this.render();
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        const { title = "Malicious Dapp", description = "The current website may be malicious. Continue visiting could result in loss of assets.", continueMessage = "If you understand the risks and want to proceed, you can", continueLink = "dismiss", addToWhiteListLink = "add to whitelist", sourceMessage = "Powered by", } = (_b = (_a = this.riskInfo) === null || _a === void 0 ? void 0 : _a.i18n) !== null && _b !== void 0 ? _b : {};
        // 
        const style = document.createElement("style");
        style.textContent = style_1.styleContent;
        //  div
        const overlay = document.createElement("div");
        overlay.className = "chargerwallet-inject-overlay";
        //  Modal div
        const modalContainer = document.createElement("div");
        modalContainer.className = "chargerwallet-inject-modal-container";
        const modal = document.createElement("div");
        modal.className = "chargerwallet-inject-modal";
        // 
        const riskWarning = document.createElement("div");
        riskWarning.className = "chargerwallet-inject-risk-warning";
        riskWarning.innerHTML = `<div class="chargerwallet-inject-title chargerwallet-inject-font  chargerwallet-inject-headingXl">
			<div class="chargerwallet-inject-error-icon">
			</div>
		${title}
		</div>
		<p class="chargerwallet-inject-text-wrap chargerwallet-inject-font chargerwallet-inject-bodyLg">${description}</p>
		<p class="chargerwallet-inject-font chargerwallet-inject-bodyLg chargerwallet-inject-text-subdued">${continueMessage}${" "}<span id="chargerwallet-inject-continue" class="chargerwallet-inject-continue-link">${continueLink}</span>${" or "}<span id="chargerwallet-inject-addToWhiteList" class="chargerwallet-inject-continue-link">${addToWhiteListLink}</span>.</p>
		`;
        const footer = document.createElement("div");
        footer.className =
            "chargerwallet-inject-footer chargerwallet-inject-font chargerwallet-inject-bodyLg";
        footer.innerHTML = `<span>${sourceMessage}</span>
		<div class="chargerwallet-inject-logo">
      <div class="chargerwallet-inject-logo-content"></div>
			<span>ChargerWallet</span>
		</div>`;
        // 组装
        modal.appendChild(riskWarning);
        modalContainer.appendChild(modal);
        modalContainer.appendChild(footer);
        overlay.appendChild(modalContainer);
        (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.appendChild(style);
        (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.appendChild(overlay);
        const continueButton = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.getElementById("chargerwallet-inject-continue");
        const addToWhiteListButton = (_f = this.shadowRoot) === null || _f === void 0 ? void 0 : _f.getElementById("chargerwallet-inject-addToWhiteList");
        if (continueButton) {
            console.log("continueButton --> onclick", continueButton);
            continueButton.addEventListener("click", () => this.closeOverlay());
        }
        if (addToWhiteListButton) {
            console.log("addToWhiteListButton --> onclick", addToWhiteListButton);
            addToWhiteListButton.addEventListener("click", () => void this.addToWhiteList());
        }
    }
    closeOverlay() {
        var _a;
        (_a = this.hostElement) === null || _a === void 0 ? void 0 : _a.remove();
    }
    addToWhiteList() {
        return __awaiter(this, void 0, void 0, function* () {
            yield window.$chargerwallet.$private.request({
                method: "wallet_addBrowserUrlToRiskWhiteList",
            });
            this.closeOverlay();
        });
    }
    closeTab() {
        void window.$chargerwallet.$private.request({
            method: "wallet_closeCurrentBrowserTab",
        });
    }
}
function injectRiskErrorScreen(riskInfo) {
    const injectDiv = document.createElement("div");
    injectDiv.id = "chargerwallet-inject";
    document.body.appendChild(injectDiv);
    new ShadowModal("chargerwallet-inject", riskInfo);
}
function ensureInjectRiskErrorScreen(riskInfo) {
    console.log("=====>>>>:  Detect Risk website version 6");
    const interval = setInterval(() => {
        if (document.body && document.getElementById("chargerwallet-inject")) {
            clearInterval(interval);
        }
        else {
            injectRiskErrorScreen(riskInfo);
        }
    }, 500);
    injectRiskErrorScreen(riskInfo);
}
function detectWebsiteRiskLevel() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=====>>>>:  Detect Risk website detectWebsiteRiskLevel");
        // wait nexttick
        yield wait(1000);
        try {
            const riskResult = (yield window.$chargerwallet.$private.request({
                method: "wallet_detectRiskLevel",
            }));
            if (riskResult.securityInfo.level === "high") {
                ensureInjectRiskErrorScreen(riskResult);
            }
        }
        catch (e) {
            console.error("Detect Risk website error: ", e);
        }
    });
}
exports.detectWebsiteRiskLevel = detectWebsiteRiskLevel;
function listenPageFocus() {
    // Notify the frontend of the last focused URL when the function is called
    const notifyToBackground = () => {
        if (window.top !== window.self) {
            return;
        }
        void window.$chargerwallet.$private.request({
            method: "wallet_lastFocusUrl",
        });
    };
    try {
        notifyToBackground();
    }
    catch (_a) {
        // ignore
    }
    // Add a focus event listener to the window
    window.addEventListener('focus', () => {
        try {
            notifyToBackground();
        }
        catch (error) {
            console.error('Error notifying frontend of page focus:', error);
        }
    });
}
exports.listenPageFocus = listenPageFocus;
