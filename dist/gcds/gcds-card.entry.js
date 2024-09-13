import { r as registerInstance, e as createEvent, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage, l as logError } from './utils-6349c5d1.js';

const I18N = {
  en: {
    tagged: 'Tagged:',
    badgeError: 'gcds-card: The badge attribute has a character limit of 20 characters.',
  },
  fr: {
    tagged: 'Baliser :',
    badgeError: 'gcds-card: L\'attribut badge a une limite de caractères de 20 caractères.',
  },
};

const gcdsCardCss = "@layer reset, default, link, hover, focus;@layer reset{:host{display:block}:host *{box-sizing:border-box;margin:0;padding:0}:host slot{display:initial}}@layer default{:host .gcds-card{background-color:var(--gcds-card-background-color);box-shadow:var(--gcds-card-box-shadow);color:var(--gcds-card-color);display:block;height:100%;max-width:var(--gcds-card-max-width);overflow:hidden;padding:var(--gcds-card-padding);position:relative}:host .gcds-card .gcds-badge{background-color:var(--gcds-card-badge-background-color);left:0;padding:var(--gcds-card-badge-padding);position:absolute;top:0;text-wrap:nowrap}:host .gcds-card .gcds-card__image{margin:var(--gcds-card-image-margin);width:100%}:host .gcds-card .gcds-card__title{font:var(--gcds-card-title-font-desktop);width:fit-content}@media only screen and (width < 48em){:host .gcds-card .gcds-card__title{font:var(--gcds-card-title-font-mobile)}}:host .gcds-card .gcds-card__title:has(+.gcds-card__description){margin:var(--gcds-card-title-margin)}:host .gcds-card .gcds-card__description{--gcds-text-size-body-desktop:var(--gcds-card-description-font-desktop)}@media only screen and (width < 48em){:host .gcds-card .gcds-card__description{font:var(--gcds-card-description-font-mobile)}}}@layer link{:host .gcds-card gcds-link::part(link):after{bottom:0;content:\"\";left:0;pointer-events:auto;position:absolute;right:0;top:0;z-index:1}}@layer hover{@media (hover:hover){:host .gcds-card:hover{background-color:var(--gcds-card-hover-background-color);box-shadow:var(--gcds-card-hover-box-shadow);cursor:pointer}}}@layer focus{:host .gcds-card:has(:focus-within){box-shadow:var(--gcds-card-focus-box-shadow);outline:var(--gcds-card-focus-outline);outline-offset:var(--gcds-card-focus-outline-offset)}:host gcds-link::part(link):focus{background-color:var(--gcds-card-focus-link-background-color);border:var(--gcds-card-focus-link-border);box-shadow:var(--gcds-card-focus-link-box-shadow);color:var(--gcds-card-focus-link-color);outline:var(--gcds-card-focus-link-outline);text-decoration:underline currentColor var(--gcds-card-focus-link-text-decoration-thickness)}}";

const GcdsCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gcdsFocus = createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = createEvent(this, "gcdsBlur", 7);
        this.gcdsClick = createEvent(this, "gcdsClick", 7);
        this.cardTitle = undefined;
        this.href = undefined;
        this.cardTitleTag = 'a';
        this.description = undefined;
        this.badge = undefined;
        this.imgSrc = undefined;
        this.imgAlt = undefined;
        this.lang = undefined;
        this.errors = [];
    }
    validateCardTitle() {
        if (!this.cardTitle || this.cardTitle.trim() == '') {
            this.errors.push('cardTitle');
        }
        else if (this.errors.includes('cardTitle')) {
            this.errors.splice(this.errors.indexOf('cardTitle'), 1);
        }
    }
    validateHref() {
        if (!this.href || this.href.trim() == '') {
            this.errors.push('href');
        }
        else if (this.errors.includes('href')) {
            this.errors.splice(this.errors.indexOf('href'), 1);
        }
    }
    validateBadge() {
        if (this.badge && this.badge.length > 20) {
            console.error(`${I18N['en'].badgeError} | ${I18N['fr'].badgeError}`);
            this.errors.push('badge');
        }
        else if (this.errors.includes('badge')) {
            this.errors.splice(this.errors.indexOf('badge'), 1);
        }
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
    /*
     * Validate required properties
     */
    validateRequiredProps() {
        this.validateCardTitle();
        this.validateHref();
        if (this.errors.includes('href') || this.errors.includes('cardTitle')) {
            return false;
        }
        return true;
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateBadge();
        let valid = this.validateRequiredProps();
        if (!valid) {
            logError('gcds-card', this.errors, ['badge']);
        }
    }
    get renderDescription() {
        if (this.el.innerHTML.trim() != '') {
            return h("div", { class: "gcds-card__description" }, h("slot", null));
        }
        else if (this.description) {
            return h("div", { class: "gcds-card__description" }, h("gcds-text", { "margin-bottom": '0' }, this.description));
        }
        else {
            return null;
        }
    }
    render() {
        const { cardTitle, cardTitleTag, href, badge, imgSrc, imgAlt, renderDescription, lang, errors, } = this;
        const Element = cardTitleTag;
        const taggedAttr = {};
        if (badge) {
            taggedAttr['aria-describedby'] = 'gcds-badge';
        }
        if (this.validateRequiredProps()) {
            return (h(Host, null, h("div", { class: "gcds-card" }, imgSrc && (h("img", { src: imgSrc, alt: imgAlt ? imgAlt : '', class: "gcds-card__image" })), badge && !errors.includes('badge') && (h("gcds-text", { id: "gcds-badge", class: "gcds-badge", "text-role": "light", "margin-bottom": "0", size: "caption" }, h("strong", null, h("gcds-sr-only", null, I18N[lang].tagged), badge))), Element != 'a' ? (h(Element, Object.assign({ class: "gcds-card__title" }, taggedAttr), h("gcds-link", { href: href }, cardTitle))) : (h("gcds-link", Object.assign({ href: href, class: "gcds-card__title" }, taggedAttr), cardTitle)), renderDescription)));
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "cardTitle": ["validateCardTitle"],
        "href": ["validateHref"],
        "badge": ["validateBadge"]
    }; }
};
GcdsCard.style = gcdsCardCss;

export { GcdsCard as gcds_card };

//# sourceMappingURL=gcds-card.entry.js.map