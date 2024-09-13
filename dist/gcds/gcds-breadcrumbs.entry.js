import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage } from './utils-6349c5d1.js';

const I18N = {
  en: {
    label: 'Breadcrumb',
    link: 'https://www.canada.ca/en.html',
  },
  fr: {
    label: 'Chemin de navigation',
    link: 'https://www.canada.ca/fr.html',
  },
};

const gcdsBreadcrumbsCss = "@layer reset, default;@layer reset{:host{display:block}:host .gcds-breadcrumbs ol{list-style:none;overflow-x:hidden}}@layer default{:host .gcds-breadcrumbs ol{margin:var(--gcds-breadcrumbs-margin);padding:var(--gcds-breadcrumbs-padding)}:host .gcds-breadcrumbs ol.has-canada-link gcds-breadcrumbs-item:first-child,:host .gcds-breadcrumbs ol:not(.has-canada-link) ::slotted(:first-child){margin:var(--gcds-breadcrumbs-item-first-child-margin)!important}:host .gcds-breadcrumbs ol.has-canada-link gcds-breadcrumbs-item:first-child:before{display:none}}";

const GcdsBreadcrumbs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.hideCanadaLink = false;
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
        const { hideCanadaLink, lang } = this;
        return (h(Host, null, h("nav", { "aria-label": I18N[lang].label, class: "gcds-breadcrumbs" }, h("ol", { class: hideCanadaLink ? '' : 'has-canada-link' }, !hideCanadaLink ? (h("gcds-breadcrumbs-item", { href: I18N[lang].link }, "Canada.ca")) : null, h("slot", null)))));
    }
    get el() { return getElement(this); }
};
GcdsBreadcrumbs.style = gcdsBreadcrumbsCss;

export { GcdsBreadcrumbs as gcds_breadcrumbs };

//# sourceMappingURL=gcds-breadcrumbs.entry.js.map