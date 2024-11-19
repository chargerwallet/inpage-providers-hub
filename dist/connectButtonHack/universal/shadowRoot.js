import { findIconAndNameByName } from './findIconAndName';
import { isClickable, universalLog } from './utils';
import { isWalletIconLessEqualThan } from './imgUtils';
export function findIconAndNameInShadowRoot(hostSelector, containerSelector, walletName, constraints = {
    text: [isClickable],
    icon: [isWalletIconLessEqualThan, isClickable],
}) {
    const shadowRoots = Array.from(document.querySelectorAll(hostSelector))
        .filter(Boolean)
        .map((e) => e.shadowRoot);
    if (shadowRoots.length === 0) {
        universalLog.warn('findIconAndNameInShadowRoot,shadowRoots.length=0');
        return null;
    }
    const containerElements = shadowRoots
        .map((e) => Array.from(e.querySelectorAll(containerSelector)))
        .reduce((a, b) => a.concat(b), [])
        .filter(Boolean);
    const length = containerElements.length;
    if (length === 0 || length > 1) {
        universalLog.warn('findIconAndNameInShadowRoot,length=', length);
        return null;
    }
    return findIconAndNameByName(containerElements[0], walletName, 'auto-search-icon', constraints);
}
