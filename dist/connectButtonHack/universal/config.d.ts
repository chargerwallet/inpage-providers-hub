import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ConstraintFn, FindResultType, Selector } from './type';
type FrameLocator = {
    locator: (selector: string) => Locator;
};
type Locator = {
    count: () => Promise<number>;
    contentFrame: () => FrameLocator;
    first: () => Locator;
    click: () => Promise<void>;
};
type Page = {
    locator: (selector: string) => Locator;
    evaluate: (fn: (...args: any[]) => any) => Promise<any>;
};
export declare const basicWalletInfo: {
    readonly metamask: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly walletconnect: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly suiwallet: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly phantom: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly unisat: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly tronlink: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly petra: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly keplr: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly polkadot: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly martian: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
    readonly nami: {
        readonly updatedIcon: string;
        readonly updatedName: string;
        readonly name: RegExp;
    };
};
/**
 *  used to the following conditions:
 *    - wallet icon and name both exists
 *    - only one icon and only one name element
 *
 * wallet icon and name locate strategy:
 *  step1: if icon and name elements have uniq and stable class name ,
 *     - then use function `findIconAndName()` to return them directly
 *  step2: else use `container` to locate the name and icon automatically
 */
export type WalletInfo = {
    updatedIcon: string;
    updatedName: string;
    /**
     * it's better to  match the start and the end character at the same time
     */
    name: RegExp;
    /**
     * 1. the common ancestor selector of wallet icon and name element
     * 2. get the container element by document.querySelector(not document.querySelectorAll)
     * 3. tradeoff
     *    3.1. if the selector is ID selector(or any unique and stable selector,like '.connect-wallet-modal')
     *      - The closer the selector is to the wallet button, the more likely to get element.
     *          - because only one element will be choosen
     *      - but the closer the selector is to the wallet button, the more difficult to maintain .
     *      - there is no difference between the accuracy that mean it will not choose the wrong element.
     *          - because only one element will be choosen
     *    3.2. if the selector is not a unique or stable selector, like '.modal'
     *      - The farther away from the wallet button, the more likely to get the wrong element.
     *          - beacuase '.modal' will choose other modal elements which are not connect wallet modal
     * 4. choose strategy :
     *    step1. choose the wallet button by unique and stable selector(id selector,uniq class etc) if possible
     *    step2. choose the wallet button list container by unique and stable selector(id selector,uniq class etc) if possible
     *    step3. choose the connect wallet modal by title [getConnectWalletModalByTitle()]
     * 5. the container must be a selector or a function for it should be called when mutation happens
     */
    container?: Selector | (() => HTMLElement | null);
    /**
     *  custom method used when
     *  1. icon and name have a uniq selector(id selector,uniq class etc)
     *  2. other special cases,like shadowRoot
     * **/
    findIconAndName?: (this: null, wallet: WalletInfo) => FindResultType | null;
    updateIcon?: (this: void, img: HTMLElement, iconStr: string) => HTMLImageElement;
    updateName?: (this: void, textNode: Text, text: string) => Text;
    afterUpdate?: (this: void, textNode: Text, img: HTMLImageElement) => void;
    /**
     * used when there is only one icon or name element(not both) and other special cases
     */
    update?: (this: void, wallet: WalletInfo) => HTMLElement | null;
    /**
     * skip testing
     */
    skip?: boolean | ((page: Page) => Promise<boolean>) | {
        mobile?: boolean;
        desktop?: boolean;
    };
};
export type SitesInfo = {
    urls: string[];
    walletsForProvider: {
        [k in IInjectedProviderNames]?: WalletInfo[];
    };
    mutationObserverOptions?: MutationObserverInit;
    constraintMap?: {
        text: ConstraintFn[];
        icon: ConstraintFn[];
    };
    /**
     * path for connect wallet modal used for testing
     */
    testPath?: string[] | {
        mobile?: string[];
        desktop?: string[];
    } | ((page: Page) => Promise<void>);
    testUrls?: string[];
    only?: boolean;
    skip?: boolean | {
        mobile?: boolean;
        desktop?: boolean;
    };
};
export declare const sitesConfig: SitesInfo[];
export {};
