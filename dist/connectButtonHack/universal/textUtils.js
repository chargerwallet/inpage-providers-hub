import domUtils from '../utils/utilsDomNodes';
import { universalLog } from './utils';
export function makeTextEllipse(textNode, option = {}) {
    textNode.style.whiteSpace = 'nowrap';
    textNode.style.overflow = 'hidden';
    textNode.style.textOverflow = 'ellipsis';
    Object.assign(textNode.style, option);
}
export function makeTextWrap(textNode) {
    textNode.style.whiteSpace = 'normal';
}
export function makeTextWordBreak(textNode) {
    textNode.style.wordBreak = 'break-word';
}
export function makeTextAlignLeft(textNode) {
    textNode.style.textAlign = 'left';
}
export function makeTextAlignCenter(textNode) {
    textNode.style.textAlign = 'center';
}
export function replaceText(textNode, newText) {
    const newTextNode = document.createTextNode(newText);
    textNode.replaceWith(newTextNode);
    return newTextNode;
}
/**
 * @description:
 * make sure there is only one text node match walletName to ignore hidden text and other text
 */
export function findWalletTextByParent(container, walletName, constraints) {
    if (!(container instanceof HTMLElement)) {
        universalLog.warn('arg is wrong. container is not a HTMLElement', container);
        return null;
    }
    const textNodes = domUtils.findTextNode(container, walletName, 'all');
    const length = (textNodes === null || textNodes === void 0 ? void 0 : textNodes.length) || 0;
    if (length === 0 || !textNodes) {
        universalLog.warn(`find  none for wallet name ${walletName.toString()}, container is `, container);
        return null;
    }
    if (length > 1) {
        universalLog.warn(`find  more than one text node for wallet name ${walletName.toString()}`);
        return null;
    }
    if (constraints.comme((f) => !textNodes[0].parentElement || !f(textNodes[0].parentElement))) {
        universalLog.warn('===>it doesnot satisfy the constraints', constraints);
        return null;
    }
    return textNodes[0];
}
