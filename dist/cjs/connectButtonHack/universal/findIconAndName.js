"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTextByImg = exports.findIconAndNameByIcon = exports.findIconAndNameByName = void 0;
const consts_1 = require("./consts");
const imgUtils_1 = require("./imgUtils");
const textUtils_1 = require("./textUtils");
const utils_1 = require("./utils");
/**
 *
 * @description:
 *   don't document to querySelector because it maybe not work in shadowRoot,
 *   instead of it, use the containerElement
 */
function findIconAndNameByName(containerElement, walletName, icon = 'auto-search-icon', constraints = {
    text: [utils_1.isClickable],
    icon: [imgUtils_1.isWalletIconLessEqualThan, utils_1.isClickable],
}) {
    const textNode = (0, textUtils_1.findWalletTextByParent)(containerElement, walletName, constraints.text);
    if (!textNode || !textNode.parentElement) {
        utils_1.universalLog.log(`no wallet name ${walletName.toString()} text node found`);
        return null;
    }
    if ((0, utils_1.isInExternalLink)(textNode.parentElement, containerElement)) {
        utils_1.universalLog.log(`${walletName.toString()} is in external link`);
        return null;
    }
    let iconNode = undefined;
    if (typeof icon === 'function') {
        iconNode = icon(textNode);
    }
    else if (icon === 'auto-search-icon') {
        let parent = textNode.parentElement;
        let level = 0;
        while (parent && parent !== (containerElement === null || containerElement === void 0 ? void 0 : containerElement.parentElement) && level++ < consts_1.MAX_LEVELS) {
            const walletIcon = (0, imgUtils_1.findWalletIconByParent)(parent, constraints.icon);
            if (!walletIcon) {
                parent = parent.parentElement;
                continue;
            }
            iconNode = walletIcon;
            break;
        }
    }
    else {
        utils_1.universalLog.warn('icon paramter should be a function or auto-search-icon');
        return null;
    }
    if (!iconNode) {
        utils_1.universalLog.log(`no wallet ${walletName.toString()} icon node found`);
        return null;
    }
    // make sure the icon and text are both existed
    return { iconNode, textNode };
}
exports.findIconAndNameByName = findIconAndNameByName;
function findIconAndNameByIcon(iconSelector, textSelector, name, container = document, constraints = { text: [], icon: [] }, searchLevel = consts_1.MAX_SEARCH_LEVELS_By_IMG) {
    const iconElements = typeof iconSelector === 'string'
        ? container.querySelectorAll(iconSelector)
        : (0, utils_1.arrayify)(iconSelector());
    if (iconElements.length > 1) {
        utils_1.universalLog.warn('more one wallet icon found ,please check the selector');
        return null;
    }
    const iconElement = Array.from(iconElements)[0];
    //find the text node by img
    let textNode = null;
    if (textSelector === 'auto-search-text') {
        const containerEle = container instanceof HTMLElement ? container : document.body;
        textNode = iconElement
            ? findTextByImg(iconElement, name, containerEle, constraints.text, searchLevel)
            : null;
    }
    else if (typeof textSelector === 'function') {
        const containerEle = iconElement && textSelector(iconElement);
        textNode =
            iconElement && containerEle
                ? (0, textUtils_1.findWalletTextByParent)(containerEle, name, constraints.text)
                : null;
    }
    else {
        utils_1.universalLog.warn('textSelector is wrong');
        return null;
    }
    if (!iconElement || !textNode) {
        utils_1.universalLog.warn('one is missing', 'icon=', iconElement, 'text=', textNode);
        return null;
    }
    return {
        iconNode: iconElement,
        textNode,
    };
}
exports.findIconAndNameByIcon = findIconAndNameByIcon;
function findTextByImg(img, walletName, containerLimit, constraints, maxLevel = consts_1.MAX_SEARCH_LEVELS_By_IMG) {
    let text = null;
    let parent = img;
    let level = 0;
    while (parent && parent != containerLimit.parentElement && level++ < maxLevel) {
        text = (0, textUtils_1.findWalletTextByParent)(parent, walletName, constraints);
        if (text) {
            return text;
        }
        parent = parent.parentElement;
    }
    utils_1.universalLog.warn('can not find the text node by img ', level);
    return null;
}
exports.findTextByImg = findTextByImg;
