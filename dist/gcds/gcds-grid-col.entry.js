import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';

const gcdsGridColCss = "@layer reset, default, tablet, desktop;@layer reset{:host{display:block}:host .gcds-grid-col{box-sizing:border-box;display:block;margin:0;padding:0}}@layer default{:host{grid-column:span var(--gcds-grid-columns-default-base) /span var(--gcds-grid-columns-default-base)}:host .gcds-grid-col{height:100%;width:100%}}@layer tablet{@media screen and (width >= 48em){:host{grid-column:span var(--gcds-grid-col-tablet,var(--gcds-grid-columns-default-tablet)) /span var(---gcds-grid-col-tablet,var(--gcds-grid-columns-default-tablet))}}}@layer desktop{@media screen and (width >= 64em){:host{grid-column:span var(--gcds-grid-col-desktop,var(--gcds-grid-columns-default-desktop)) /span var(--gcds-grid-col-desktop,var(--gcds-grid-columns-default-desktop))}}}";

const GcdsGridCol = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tag = 'div';
        this.tablet = 6;
        this.desktop = undefined;
    }
    validateTablet(newValue) {
        const values = [1, 2, 3, 4, 5, 6];
        if (!values.includes(newValue)) {
            this.tablet = 6;
        }
    }
    validateDesktop(newValue) {
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        if (this.desktop && !values.includes(newValue)) {
            this.desktop = 12;
        }
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateTablet(this.tablet);
        this.validateDesktop(this.desktop);
    }
    render() {
        const { desktop, tablet, tag } = this;
        const Tag = tag;
        function handleColSize() {
            const colSize = {};
            if (tablet) {
                colSize['--gcds-grid-col-tablet'] = tablet;
            }
            if (desktop) {
                colSize['--gcds-grid-col-desktop'] = desktop;
            }
            else if (tablet) {
                colSize['--gcds-grid-col-desktop'] = tablet * 2;
            }
            return colSize;
        }
        return (h(Host, { style: handleColSize() }, h(Tag, { class: "gcds-grid-col" }, h("slot", null))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "tablet": ["validateTablet"],
        "desktop": ["validateDesktop"]
    }; }
};
GcdsGridCol.style = gcdsGridColCss;

export { GcdsGridCol as gcds_grid_col };

//# sourceMappingURL=gcds-grid-col.entry.js.map