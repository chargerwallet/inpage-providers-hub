import { ThrottleSettings } from 'lodash';
import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
export declare function detectQrcodeFromSvg({ img, }: {
    img: HTMLImageElement | Element;
}): Promise<string>;
export declare function createWalletConnectToButton({ container, onCreated, uri, }: {
    container: HTMLElement;
    onCreated?: (btn: HTMLElement) => void;
    uri: string;
}): void;
export declare function createNewImageToContainer({ container, icon, removeSvg, onCreated, width, height, }: {
    container: HTMLElement;
    icon: string;
    removeSvg: boolean;
    onCreated?: (img: HTMLImageElement) => void;
    width?: string;
    height?: string;
}): void;
declare function hackConnectButton({ urls, replaceMethod, providers, mutationObserverOptions, throttleDelay, throttleSettings, callbackDelay, }: {
    urls: string[];
    replaceMethod: (options?: {
        providers: IInjectedProviderNames[];
    }) => void;
    providers: IInjectedProviderNames[];
    mutationObserverOptions?: MutationObserverInit;
    throttleDelay?: number;
    throttleSettings?: ThrottleSettings;
    callbackDelay?: number;
}): void;
export { hackConnectButton };
