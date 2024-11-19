"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWalletIconLessEqualThan = exports.isWalletIconSizeMatch = exports.findWalletIconByParent = exports.findIconNodesByParent = exports.createImageEle = exports.replaceIcon = void 0;
const consts_1 = require("./consts");
const utils_1 = require("./utils");
/**
 *  @note: lazy loading image  with  width and height 0
 */
function replaceIcon(originalNode, newIconSrc) {
    const computedstyle = window.getComputedStyle(originalNode);
    utils_1.universalLog.log('ok: replace icon', originalNode);
    const width = parseFloat(computedstyle.width) ? computedstyle.width : 'auto';
    const height = parseFloat(computedstyle.height) ? computedstyle.height : 'auto';
    if (originalNode instanceof HTMLImageElement) {
        originalNode.src = newIconSrc;
        originalNode.removeAttribute('srcset');
        return originalNode;
    }
    else {
        const imgNode = createImageEle(newIconSrc);
        imgNode.style.width = width;
        imgNode.style.height = height;
        imgNode.classList.add(...Array.from(originalNode.classList));
        originalNode.replaceWith(imgNode);
        return imgNode;
    }
}
exports.replaceIcon = replaceIcon;
function createImageEle(src) {
    const img = new Image();
    img.src = src;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    return img;
}
exports.createImageEle = createImageEle;
function findIconNodesByParent(parent) {
    const walker = document.createTreeWalker(parent, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
            const hasBgImg = window.getComputedStyle(node).backgroundImage !== 'none';
            return node.nodeName === 'IMG' || hasBgImg || node.nodeName === 'svg'
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP;
        },
    });
    const matchingNodes = [];
    while (walker.nextNode()) {
        matchingNodes.push(walker.currentNode);
    }
    return matchingNodes;
}
exports.findIconNodesByParent = findIconNodesByParent;
/**
 * @description:
 * make sure that there is only one icon node match walletIcon to ignore hidden icon and other icon
 */
function findWalletIconByParent(parent, constraints) {
    const iconNodes = findIconNodesByParent(parent);
    if (iconNodes.length === 0) {
        utils_1.universalLog.warn(`no icon node found for parent`, parent);
        return null;
    }
    if (iconNodes.length > 1) {
        utils_1.universalLog.warn(`more than one icon node found`, iconNodes.length, iconNodes);
        throw new Error('more than one icon node found');
    }
    const icon = iconNodes[0];
    if (constraints.comme((f) => !f(icon))) {
        throw new Error('it doesnt satisfy the constraints');
    }
    return icon;
}
exports.findWalletIconByParent = findWalletIconByParent;
//NOTE:  use function isWalletIconLessEqualThan with lazy loading image
function isWalletIconSizeMatch(walletIcon, min = consts_1.ICON_MIN_SIZE, max = consts_1.ICON_MAX_SIZE) {
    const { width, height } = walletIcon.getBoundingClientRect();
    const isMatch = width <= max && width >= min && height <= max && height >= min;
    !isMatch && utils_1.universalLog.log('wallet icon size doesnot match: ', width, height);
    return isMatch;
}
exports.isWalletIconSizeMatch = isWalletIconSizeMatch;
function isWalletIconLessEqualThan(walletIcon) {
    return isWalletIconSizeMatch(walletIcon, 0, consts_1.ICON_MAX_SIZE);
}
exports.isWalletIconLessEqualThan = isWalletIconLessEqualThan;
