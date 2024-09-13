import { r as registerInstance, e as createEvent, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { b as emitEvent } from './utils-6349c5d1.js';

const gcdsDetailsCss = "@layer reset, default, hover, focus;@layer reset{:host{display:block}:host .details__summary{background-color:transparent;border-color:transparent;cursor:pointer;display:block}:host .details__panel slot{display:initial}:host .details__panel ::slotted(:first-child){margin-block-start:0}:host .details__panel ::slotted(:last-child){margin-block-end:0}:host .details__panel ::slotted(ol),:host .details__panel ::slotted(ul){padding:0}}@layer default{:host .gcds-details .details__summary{color:var(--gcds-details-default-text);font:var(--gcds-details-font);padding:var(--gcds-details-summary-padding);position:relative;text-align:left;text-decoration-color:currentColor;text-decoration-line:underline;text-decoration-style:solid;text-decoration-thickness:var(\n        --gcds-details-default-decoration-thickness\n      );text-underline-offset:.2em;transition:background-color .15s ease-in-out,color .15s ease-in-out}:host .gcds-details .details__summary:before{border-block-end:var(--gcds-details-summary-arrow-border-top-bottom) solid transparent;border-block-start:var(--gcds-details-summary-arrow-border-top-bottom) solid transparent;border-inline-start:var(--gcds-details-summary-arrow-border-left) solid currentColor;content:\"\";height:0;left:var(--gcds-details-summary-arrow-left);position:absolute;top:var(--gcds-details-summary-arrow-top);transition:transform .15s ease-in-out;width:0}:host .gcds-details .details__summary[aria-expanded=false]+.details__panel{display:none}:host .gcds-details .details__summary[aria-expanded=true]:before{transform:rotate(90deg)}:host .gcds-details .details__panel{border-inline-start:var(--gcds-details-panel-border-width) solid var(--gcds-details-panel-border-color);margin:var(--gcds-details-panel-margin);padding:var(--gcds-details-panel-padding)}:host .gcds-details .details__panel ::slotted(*){font:var(--gcds-details-font)}:host .gcds-details .details__panel ::slotted(:not(:last-child)){margin:0 0 var(--gcds-details-panel-slotted-margin)!important}:host .gcds-details .details__panel ::slotted(ol),:host .gcds-details .details__panel ::slotted(ul){margin-inline-start:var(\n          --gcds-details-panel-slotted-margin\n        )!important}:host .gcds-details .details__panel ::slotted(small){font:var(--gcds-details-font-small)}}@layer hover{@media (hover:hover){:host .gcds-details .details__summary:hover:not(:focus){color:var(--gcds-details-hover-text);text-decoration-thickness:var(--gcds-details-hover-decoration-thickness);text-underline-offset:.2em}:host .gcds-details .details__summary:hover:not(:focus):before{color:var(--gcds-details-hover-text)}}}@layer focus{:host .gcds-details .details__summary:focus{background-color:var(--gcds-details-focus-background);border-radius:var(--gcds-details-focus-border-radius);box-shadow:var(--gcds-details-focus-box-shadow);color:var(--gcds-details-focus-text);outline:var(--gcds-details-focus-outline);outline-offset:var(--gcds-details-focus-outline-offset);text-decoration:none}}";

const GcdsDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gcdsFocus = createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = createEvent(this, "gcdsBlur", 7);
        this.gcdsClick = createEvent(this, "gcdsClick", 7);
        this.detailsTitle = undefined;
        this.open = false;
    }
    /**
     * Methods
     */
    /*
     * Toggle details open or closed
     */
    async toggle() {
        this.open = !this.open;
    }
    render() {
        const { detailsTitle, open } = this;
        return (h(Host, null, h("div", { class: "gcds-details" }, h("button", { "aria-expanded": open.toString(), "aria-controls": "details__panel", onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => {
                const event = emitEvent(e, this.gcdsClick);
                if (event) {
                    this.toggle();
                }
            }, class: "details__summary", id: "details__summary" }, detailsTitle), h("div", { id: "details__panel", class: "details__panel", "aria-labelledby": "details__summary" }, h("slot", null)))));
    }
    get el() { return getElement(this); }
};
GcdsDetails.style = gcdsDetailsCss;

export { GcdsDetails as gcds_details };

//# sourceMappingURL=gcds-details.entry.js.map