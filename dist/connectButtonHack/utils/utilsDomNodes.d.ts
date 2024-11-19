declare function isReplaced(ele?: HTMLElement | null): boolean;
declare function isNotReplaced(ele?: HTMLElement | null): boolean;
declare function setIsReplaced(ele: HTMLElement | Element): void;
declare function isInnerContentMatch(ele: HTMLElement | Element, text: string, options?: {
    ignoreCase?: boolean;
    findAsHtml?: boolean;
    exactMatch?: boolean;
}): boolean;
declare function createElementFromHTML(htmlString: string): ChildNode | "";
/**
 * @description:
 * only find the first text node match the text
 */
declare function findTextNode(container: string | HTMLElement, text: RegExp | string, type?: 'all' | 'first'): Text | Text[] | undefined | null;
declare const _default: {
    isReplaced: typeof isReplaced;
    isNotReplaced: typeof isNotReplaced;
    setIsReplaced: typeof setIsReplaced;
    isInnerContentMatch: typeof isInnerContentMatch;
    createElementFromHTML: typeof createElementFromHTML;
    findTextNode: typeof findTextNode;
};
export default _default;
