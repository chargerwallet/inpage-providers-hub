import { ConstraintFn, FindResultType, Selector } from './type';
export declare function findIconAndNameInShadowRoot(hostSelector: Selector, containerSelector: Selector, walletName: RegExp, constraints?: {
    text: ConstraintFn[];
    icon: ConstraintFn[];
}): FindResultType | null;
