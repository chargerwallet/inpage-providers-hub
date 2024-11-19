import { ConstraintFn } from './type';
export declare function makeTextEllipse(textNode: HTMLElement, option?: Partial<CSSStyleDeclaration>): void;
export declare function makeTextWrap(textNode: HTMLElement): void;
export declare function makeTextWordBreak(textNode: HTMLElement): void;
export declare function makeTextAlignLeft(textNode: HTMLElement): void;
export declare function makeTextAlignCenter(textNode: HTMLElement): void;
export declare function replaceText(textNode: Text, newText: string): Text;
/**
 * @description:
 * make sure there is only one text node match walletName to ignore hidden text and other text
 */
export declare function findWalletTextByParent(container: HTMLElement, walletName: RegExp, constraints: ConstraintFn[]): Text | null;
