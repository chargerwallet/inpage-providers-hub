"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWalletTextByParent = exports.replaceText = exports.makeTextAlignCenter = exports.makeTextAlignLeft = exports.makeTextWordBreak = exports.makeTextWrap = exports.makeTextEllipse = void 0;
const utilsDomNodes_1 = __importDefault(require("../utils/utilsDomNodes"));
const utils_1 = require("./utils");
function makeTextEllipse(textNode, option = {}) {
    textNode.style.whiteSpace = 'nowrap';
    textNode.style.overflow = 'hidden';
    textNode.style.textOverflow = 'ellipsis';
    Object.assign(textNode.style, option);
}
exports.makeTextEllipse = makeTextEllipse;
function makeTextWrap(textNode) {
    textNode.style.whiteSpace = 'normal';
}
exports.makeTextWrap = makeTextWrap;
function makeTextWordBreak(textNode) {
    textNode.style.wordBreak = 'break-word';
}
exports.makeTextWordBreak = makeTextWordBreak;
function makeTextAlignLeft(textNode) {
    textNode.style.textAlign = 'left';
}
exports.makeTextAlignLeft = makeTextAlignLeft;
function makeTextAlignCenter(textNode) {
    textNode.style.textAlign = 'center';
}
exports.makeTextAlignCenter = makeTextAlignCenter;
function replaceText(textNode, newText) {
    const newTextNode = document.createTextNode(newText);
    textNode.replaceWith(newTextNode);
    return newTextNode;
}
exports.replaceText = replaceText;
/**
 * @description:
 * make sure there is only one text node match walletName to ignore hidden text and other text
 */
function findWalletTextByParent(container, walletName, constraints) {
    if (!(container instanceof HTMLElement)) {
        utils_1.universalLog.warn('arg is wrong. container is not a HTMLElement', container);
        return null;
    }
    const textNodes = utilsDomNodes_1.default.findTextNode(container, walletName, 'all');
    const length = (textNodes === null || textNodes === void 0 ? void 0 : textNodes.length) || 0;
    if (length === 0 || !textNodes) {
        utils_1.universalLog.warn(`find  none for wallet name ${walletName.toString()}, container is `, container);
        return null;
    }
    if (length > 1) {
        utils_1.universalLog.warn(`find  more than one text node for wallet name ${walletName.toString()}`);
        return null;
    }
    if (constraints.comme((f) => !textNodes[0].parentElement || !f(textNodes[0].parentElement))) {
        utils_1.universalLog.warn('===>it doesnot satisfy the constraints', constraints);
        return null;
    }
    return textNodes[0];
}
exports.findWalletTextByParent = findWalletTextByParent;
