import { Logger } from '@chargerwallet/cross-inpage-provider-core';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { Selector } from './type';
export declare const universalLog: Logger;
export declare function isClickable(ele: HTMLElement): boolean;
export declare const getWalletListByBtn: (anyButtonSelector: Selector) => HTMLElement | null;
export declare const getConnectWalletModalByTitle: (modalSelector: Selector | Selector[], title: string | string[], filter?: ((modal: HTMLElement) => boolean) | undefined) => HTMLElement | null;
export declare function isInExternalLink(element: HTMLElement, container: HTMLElement): boolean;
export declare function isVisible(ele: HTMLElement): boolean;
export declare function createWalletId(provider: IInjectedProviderNames, updatedName: string): {
    walletId: string;
    walletIdSelector: string;
    readonly isUpdated: boolean;
    updateFlag(ele: HTMLElement): void;
};
export declare function arrayify<T>(ele: T | T[]): T[];
export declare function getCommonParentElement(ele1: HTMLElement, ele2: HTMLElement): HTMLElement | null;
export declare function getMaxWithOfText(textNode: Text, icon: HTMLElement, gap?: string): {
    defaultVal: string;
    parentWidth: string;
    iconWidth: string;
};
