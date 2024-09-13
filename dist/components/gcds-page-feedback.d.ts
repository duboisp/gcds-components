import type { Components, JSX } from "../types/components";

interface GcdsPageFeedback extends Components.GcdsPageFeedback, HTMLElement {}
export const GcdsPageFeedback: {
    prototype: GcdsPageFeedback;
    new (): GcdsPageFeedback;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
