import { ConstraintFn, FindResultType, Selector } from './type';
/**
 *
 * @description:
 *   don't document to querySelector because it maybe not work in shadowRoot,
 *   instead of it, use the containerElement
 */
export declare function findIconAndNameByName(containerElement: HTMLElement, walletName: RegExp, icon?: 'auto-search-icon' | ((text: Text) => HTMLElement | null | undefined), constraints?: {
    text: ConstraintFn[];
    icon: ConstraintFn[];
}): FindResultType | null;
export declare function findIconAndNameByIcon(iconSelector: Selector | (() => HTMLElement | null | undefined), textSelector: 'auto-search-text' | ((icon: HTMLElement) => HTMLElement | null | undefined), name: RegExp, container?: HTMLElement | Document, constraints?: {
    text: ConstraintFn[];
    icon: ConstraintFn[];
}, searchLevel?: number): FindResultType | null;
export declare function findTextByImg(img: HTMLElement, walletName: RegExp, containerLimit: HTMLElement, constraints: ConstraintFn[], maxLevel?: number): Text | null;
