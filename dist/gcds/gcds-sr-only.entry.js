import { r as registerInstance, h, a as Host } from './index-e6d17e19.js';

const gcdsSrOnlyCss = "@layer reset, default;@layer reset{:host slot{display:initial}}@layer default{:host{height:1px;left:-10000px;overflow:hidden;position:absolute;top:auto;width:1px}}";

const GcdsSrOnly = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tag = 'p';
    }
    validateTag(newValue) {
        const values = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];
        if (!values.includes(newValue)) {
            this.tag = 'p';
        }
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateTag(this.tag);
    }
    render() {
        const Tag = this.tag;
        return (h(Host, null, h(Tag, null, h("slot", null))));
    }
    static get watchers() { return {
        "tag": ["validateTag"]
    }; }
};
GcdsSrOnly.style = gcdsSrOnlyCss;

export { GcdsSrOnly as gcds_sr_only };

//# sourceMappingURL=gcds-sr-only.entry.js.map