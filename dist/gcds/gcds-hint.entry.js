import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';

const gcdsHintCss = "@layer reset, default;@layer reset{:host{display:block}:host slot{display:initial}}@layer default{:host .gcds-hint,:host gcds-text::part(text){color:inherit}:host .gcds-hint{margin:var(--gcds-hint-margin)}}";

const GcdsHint = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.hintId = undefined;
    }
    render() {
        const { hintId } = this;
        return (h(Host, { id: `hint-${hintId}` }, h("gcds-text", { class: "gcds-hint", "margin-bottom": "0", part: "hint" }, h("slot", null))));
    }
    get el() { return getElement(this); }
};
GcdsHint.style = gcdsHintCss;

export { GcdsHint as gcds_hint };

//# sourceMappingURL=gcds-hint.entry.js.map