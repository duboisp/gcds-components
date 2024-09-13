import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage } from './utils-6349c5d1.js';

const I18N = {
  en: {
    abbreviation: 'fr',
    heading: 'Language selection',
    language: 'Français',
  },
  fr: {
    abbreviation: 'en',
    heading: 'Sélection de la langue',
    language: 'English',
  },
};

const gcdsLangToggleCss = "@layer reset, default, desktop;@layer reset{:host{display:block}:host .gcds-lang-toggle h2{margin:0;overflow:hidden;position:absolute;width:0}}@layer default{:host .gcds-lang-toggle gcds-link::part(link){padding:var(--gcds-lang-toggle-padding)}:host .gcds-lang-toggle span{display:none}:host .gcds-lang-toggle abbr{text-decoration:none;text-transform:uppercase}}@layer desktop{@media screen and (width >= 64em){:host .gcds-lang-toggle gcds-link::part(link){padding:0}:host .gcds-lang-toggle span{display:initial}:host .gcds-lang-toggle abbr{display:none}}}";

const GcdsLangToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.href = undefined;
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
        const { lang, href } = this;
        return (h(Host, null, h("div", { class: "gcds-lang-toggle" }, h("gcds-sr-only", { id: "lang-toggle__heading", tag: "h2" }, I18N[lang].heading), h("gcds-link", { size: "regular", href: href, lang: I18N[lang].abbreviation }, h("span", null, I18N[lang].language), h("abbr", { title: I18N[lang].language }, I18N[lang].abbreviation)))));
    }
    get el() { return getElement(this); }
};
GcdsLangToggle.style = gcdsLangToggleCss;

export { GcdsLangToggle as gcds_lang_toggle };

//# sourceMappingURL=gcds-lang-toggle.entry.js.map