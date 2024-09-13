import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage } from './utils-6349c5d1.js';

const I18N = {
  en: {
    date: 'Date modified:',
    version: 'Version ',
  },
  fr: {
    date: 'Date de modification :',
    version: 'Version ',
  },
};

const gcdsDateModifiedCss = "@layer reset, default;@layer reset{:host{display:block}:host dl{margin:0}:host slot{display:initial}}@layer default{:host .gcds-date-modified{margin:var(--gcds-date-modified-margin)}:host .gcds-date-modified :is(dt,gcds-text,dd){display:inline}:host .gcds-date-modified dd{margin:var(--gcds-date-modified-description-margin)}}";

const GcdsDateModified = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.type = 'date';
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { lang, type } = this;
        return (h(Host, null, h("dl", { class: "gcds-date-modified" }, h("dt", null, h("gcds-text", { display: "inline", "margin-bottom": "0" }, type === 'version' ? I18N[lang].version : I18N[lang].date)), h("dd", null, h("gcds-text", { display: "inline", "margin-bottom": "0" }, type === 'version' ? (h("slot", null)) : (h("time", null, h("slot", null))))))));
    }
    get el() { return getElement(this); }
};
GcdsDateModified.style = gcdsDateModifiedCss;

export { GcdsDateModified as gcds_date_modified };

//# sourceMappingURL=gcds-date-modified.entry.js.map