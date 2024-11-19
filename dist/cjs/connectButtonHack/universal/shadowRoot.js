"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIconAndNameInShadowRoot = void 0;
const findIconAndName_1 = require("./findIconAndName");
const utils_1 = require("./utils");
const imgUtils_1 = require("./imgUtils");
function findIconAndNameInShadowRoot(hostSelector, containerSelector, walletName, constraints = {
    text: [utils_1.isClickable],
    icon: [imgUtils_1.isWalletIconLessEqualThan, utils_1.isClickable],
}) {
    const shadowRoots = Array.from(document.querySelectorAll(hostSelector))
        .filter(Boolean)
        .map((e) => e.shadowRoot);
    if (shadowRoots.length === 0) {
        utils_1.universalLog.warn('findIconAndNameInShadowRoot,shadowRoots.length=0');
        return null;
    }
    const containerElements = shadowRoots
        .map((e) => Array.from(e.querySelectorAll(containerSelector)))
        .reduce((a, b) => a.concat(b), [])
        .filter(Boolean);
    const length = containerElements.length;
    if (length === 0 || length > 1) {
        utils_1.universalLog.warn('findIconAndNameInShadowRoot,length=', length);
        return null;
    }
    return (0, findIconAndName_1.findIconAndNameByName)(containerElements[0], walletName, 'auto-search-icon', constraints);
}
exports.findIconAndNameInShadowRoot = findIconAndNameInShadowRoot;
