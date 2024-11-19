import { MAX_LEVELS, MAX_SEARCH_LEVELS_By_IMG } from './consts';
import { findWalletIconByParent, isWalletIconLessEqualThan } from './imgUtils';
import { findWalletTextByParent } from './textUtils';
import { arrayify, isClickable, isInExternalLink, universalLog } from './utils';
/**
 *
 * @description:
 *   don't document to querySelector because it maybe not work in shadowRoot,
 *   instead of it, use the containerElement
 */
export function findIconAndNameByName(containerElement, walletName, icon = 'auto-search-icon', constraints = {
    text: [isClickable],
    icon: [isWalletIconLessEqualThan, isClickable],
}) {
    const textNode = findWalletTextByParent(containerElement, walletName, constraints.text);
    if (!textNode || !textNode.parentElement) {
        universalLog.log(`no wallet name ${walletName.toString()} text node found`);
        return null;
    }
    if (isInExternalLink(textNode.parentElement, containerElement)) {
        universalLog.log(`${walletName.toString()} is in external link`);
        return null;
    }
    let iconNode = undefined;
    if (typeof icon === 'function') {
        iconNode = icon(textNode);
    }
    else if (icon === 'auto-search-icon') {
        let parent = textNode.parentElement;
        let level = 0;
        while (parent && parent !== (containerElement === null || containerElement === void 0 ? void 0 : containerElement.parentElement) && level++ < MAX_LEVELS) {
            const walletIcon = findWalletIconByParent(parent, constraints.icon);
            if (!walletIcon) {
                parent = parent.parentElement;
                continue;
            }
            iconNode = walletIcon;
            break;
        }
    }
    else {
        universalLog.warn('icon paramter should be a function or auto-search-icon');
        return null;
    }
    if (!iconNode) {
        universalLog.log(`no wallet ${walletName.toString()} icon node found`);
        return null;
    }
    // make sure the icon and text are both existed
    return { iconNode, textNode };
}
export function findIconAndNameByIcon(iconSelector, textSelector, name, container = document, constraints = { text: [], icon: [] }, searchLevel = MAX_SEARCH_LEVELS_By_IMG) {
    const iconElements = typeof iconSelector === 'string'
        ? container.querySelectorAll(iconSelector)
        : arrayify(iconSelector());
    if (iconElements.length > 1) {
        universalLog.warn('more one wallet icon found ,please check the selector');
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
                ? findWalletTextByParent(containerEle, name, constraints.text)
                : null;
    }
    else {
        universalLog.warn('textSelector is wrong');
        return null;
    }
    if (!iconElement || !textNode) {
        universalLog.warn('one is missing', 'icon=', iconElement, 'text=', textNode);
        return null;
    }
    return {
        iconNode: iconElement,
        textNode,
    };
}
export function findTextByImg(img, walletName, containerLimit, constraints, maxLevel = MAX_SEARCH_LEVELS_By_IMG) {
    let text = null;
    let parent = img;
    let level = 0;
    while (parent && parent != containerLimit.parentElement && level++ < maxLevel) {
        text = findWalletTextByParent(parent, walletName, constraints);
        if (text) {
            return text;
        }
        parent = parent.parentElement;
    }
    universalLog.warn('can not find the text node by img ', level);
    return null;
}
