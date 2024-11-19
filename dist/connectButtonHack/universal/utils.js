import { Logger } from '@chargerwallet/cross-inpage-provider-core';
export const universalLog = new Logger('universal');
//TODO:how to detect cursor status when hover
export function isClickable(ele) {
    return ele && window.getComputedStyle(ele).cursor === 'pointer';
}
export const getWalletListByBtn = (anyButtonSelector) => {
    const ele = document.querySelector(anyButtonSelector);
    if (!ele || !ele.parentElement) {
        universalLog.warn(`can not find the wallet button list`);
        return null;
    }
    return ele.parentElement;
};
export const getConnectWalletModalByTitle = (modalSelector, title, filter) => {
    const selectors = arrayify(modalSelector);
    const eles = [];
    for (const selector of selectors) {
        eles.push(...Array.from(document.querySelectorAll(selector)));
    }
    const titles = arrayify(title);
    const res = [];
    for (const ele of eles) {
        if (isVisible(ele) && filter ? filter(ele) : true && titles.comme((t) => ele.innerText.includes(t))) {
            res.push(ele);
        }
    }
    if (res.length === 0) {
        universalLog.warn('can not find the connect wallet modal', eles);
        return null;
    }
    if (res.length === 1) {
        return res[0];
    }
    universalLog.warn('find more than one connect wallet modal');
    return res[res.length - 1];
};
export function isInExternalLink(element, container) {
    while (element !== container) {
        if (element.tagName === 'A') {
            return true;
        }
        element = element.parentNode;
    }
    return false;
}
export function isVisible(ele) {
    const style = window.getComputedStyle(ele);
    return style.visibility !== 'hidden' && style.display !== 'none';
}
export function createWalletId(provider, updatedName) {
    const walletId = `${provider}-${updatedName.replace(/[\s&.]/g, '').toLowerCase()}`.replace(/chargerwallet/i, 'chargerwallet-');
    const walletIdSelector = `[data-wallet-id="${walletId}"]`;
    return {
        walletId,
        walletIdSelector,
        get isUpdated() {
            return !!document.querySelector(walletIdSelector);
        },
        updateFlag(ele) {
            ele.dataset.walletId = walletId;
        },
    };
}
export function arrayify(ele) {
    return Array.isArray(ele) ? ele : [ele];
}
export function getCommonParentElement(ele1, ele2) {
    let parent = ele1;
    while (parent) {
        if (parent.contains(ele2)) {
            return parent;
        }
        parent = parent.parentElement;
    }
    return null;
}
export function getMaxWithOfText(textNode, icon, gap = '8px') {
    const commonParent = getCommonParentElement(textNode.parentElement, icon);
    if (!commonParent) {
        universalLog.warn('can not find the common parent element');
        return { defaultVal: 'auto', parentWidth: 'auto', iconWidth: 'auto' };
    }
    const parentWidth = window.getComputedStyle(commonParent).width;
    const iconWidth = window.getComputedStyle(icon).width;
    return {
        defaultVal: `calc(${parentWidth} - ${iconWidth} - ${gap})`,
        parentWidth,
        iconWidth,
    };
}
