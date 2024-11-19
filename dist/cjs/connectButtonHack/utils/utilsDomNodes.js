"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isReplaced(ele) {
    return Boolean(ele === null || ele === void 0 ? void 0 : ele.dataset['isChargerWalletReplaced']);
}
function isNotReplaced(ele) {
    return !isReplaced(ele);
}
function setIsReplaced(ele) {
    const htmlEle = ele;
    if (htmlEle && htmlEle.dataset) {
        htmlEle.dataset['isChargerWalletReplaced'] = 'true';
    }
}
function isInnerContentMatch(ele, text, options = {}) {
    const { ignoreCase = true, findAsHtml = false, exactMatch = false } = options;
    let source = ele.innerText || '';
    if (findAsHtml) {
        source = ele.innerHTML || '';
    }
    let target = text || '';
    if (ignoreCase) {
        source = source.toLowerCase();
        target = target.toLowerCase();
    }
    if (!source || !target) {
        return false;
    }
    if (exactMatch) {
        return source === target;
    }
    return source.includes(target);
}
function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild || '';
}
/**
 * @description:
 * only find the first text node match the text
 */
function findTextNode(container, text, type = 'first') {
    const selectAll = type === 'all';
    const containerEles = typeof container === 'string' ? Array.from(document.querySelectorAll(container)) : [container];
    if (containerEles.length === 0) {
        return null;
    }
    const result = [];
    for (const containerEle of containerEles) {
        const walker = document.createTreeWalker(containerEle, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue || node.parentElement instanceof SVGElement) {
                    return NodeFilter.FILTER_SKIP;
                }
                return (typeof text === 'string'
                    ? node.nodeValue.trim() === text.trim()
                    : text.test(node.nodeValue.trim()))
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
            },
        });
        if (selectAll) {
            while (walker.nextNode()) {
                result.push(walker.currentNode);
            }
        }
        else {
            return walker.nextNode();
        }
    }
    return result.filter(Boolean);
}
exports.default = {
    isReplaced,
    isNotReplaced,
    setIsReplaced,
    isInnerContentMatch,
    createElementFromHTML,
    findTextNode,
};
