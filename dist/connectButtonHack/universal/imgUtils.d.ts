import { ConstraintFn } from './type';
/**
 *  @note: lazy loading image  with  width and height 0
 */
export declare function replaceIcon(originalNode: HTMLElement, newIconSrc: string): HTMLImageElement;
export declare function createImageEle(src: string): HTMLImageElement;
export declare function findIconNodesByParent(parent: HTMLElement): HTMLElement[];
/**
 * @description:
 * make sure that there is only one icon node match walletIcon to ignore hidden icon and other icon
 */
export declare function findWalletIconByParent(parent: HTMLElement, constraints: ConstraintFn[]): HTMLElement | null;
export declare function isWalletIconSizeMatch(walletIcon: HTMLElement, min?: number, max?: number): boolean;
export declare function isWalletIconLessEqualThan(walletIcon: HTMLElement): boolean;
