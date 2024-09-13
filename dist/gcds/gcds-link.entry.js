import { r as registerInstance, e as createEvent, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, i as inheritAttributes, a as assignLanguage, b as emitEvent } from './utils-6349c5d1.js';

const I18N = {
  en: {
    external: ' (Opens destination in a new tab.)',
    phone: ' (Attempts to open a phone app.)',
    download: ' (Attempts to download a file to the device.)',
    email: ' (Opens new message in email program.)',
  },
  fr: {
    external: " (Ouvre l'emplacement dans un nouvel onglet.)",
    phone: " (Tente d'ouvrir une application de téléphonie.)",
    download: " (Tente de télécharger un fichier sur l'appareil.)",
    email: ' (Ouvre un nouveau message dans le logiciel de messagerie.)',
  },
};

const gcdsLinkCss = "@layer reset, default, display, size, variant, hover, visited, focus;@layer reset{:host{display:inline-block}:host slot{display:initial}}@layer default{:host .gcds-link{color:var(--gcds-link-default);cursor:pointer;text-decoration-color:currentColor;text-decoration-style:solid;text-decoration-thickness:var(--gcds-link-decoration-thickness);text-underline-offset:var(--gcds-link-underline-offset);transition:all .35s}}@layer display{:host .gcds-link.d-block{display:block}}@layer size{:host .gcds-link.link--small{font:var(--gcds-link-font-small-desktop)}@media only screen and (width < 48em){:host .gcds-link.link--small{font:var(--gcds-link-font-small-mobile)}}:host .gcds-link.link--regular{font:var(--gcds-link-font-regular-desktop)}@media only screen and (width < 48em){:host .gcds-link.link--regular{font:var(--gcds-link-font-regular-mobile)}}:host .gcds-link.link--inherit{font:inherit}}@layer variant{:host .gcds-link.variant-light{color:var(--gcds-link-light)}}@layer hover{@media (hover:hover){:host .gcds-link:hover{text-decoration-thickness:var(--gcds-link-hover-decoration-thickness)}:host .gcds-link:hover:not(.variant-light){color:var(--gcds-link-hover)}}}@layer visited{:host .gcds-link:not(.variant-light):visited{color:var(--gcds-link-visited)}}@layer focus{:host .gcds-link:focus{background-color:var(--gcds-link-focus-background);border-radius:var(--gcds-link-focus-border-radius);box-shadow:var(--gcds-link-focus-box-shadow);color:var(--gcds-link-focus-text);outline:var(--gcds-link-focus-outline-width) solid var(--gcds-link-focus-background);outline-offset:var(--gcds-link-focus-outline-offset);text-decoration:none}}";

const GcdsLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gcdsFocus = createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = createEvent(this, "gcdsBlur", 7);
        this.gcdsClick = createEvent(this, "gcdsClick", 7);
        this.variant = 'default';
        this.size = 'inherit';
        this.display = 'inline';
        this.href = undefined;
        this.rel = undefined;
        this.target = '_self';
        this.external = false;
        this.download = undefined;
        this.type = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
    }
    validateVariant(newValue) {
        const values = ['default', 'light'];
        if (!values.includes(newValue)) {
            this.variant = 'default';
        }
    }
    validateSize(newValue) {
        const values = ['regular', 'small', 'inherit'];
        if (!values.includes(newValue)) {
            this.size = 'inherit';
        }
    }
    validateDisplay(newValue) {
        const values = ['block', 'inline'];
        if (!values.includes(newValue)) {
            this.display = 'inline';
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
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateVariant(this.variant);
        this.validateSize(this.size);
        this.validateDisplay(this.display);
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement, [
            'referrerpolicy',
        ]);
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { size, lang, display, href, rel, target, external, download, type, inheritedAttributes, variant, } = this;
        const attrs = {
            href,
            rel,
            target,
            download,
            type,
        };
        const isExternal = target === '_blank' || external;
        return (h(Host, null, h("a", Object.assign({ role: "link", tabIndex: 0 }, attrs, { class: `gcds-link link--${size} ${display != 'inline' ? `d-${display}` : ''} ${variant != 'default' ? `variant-${variant}` : ''}`, ref: element => (this.shadowElement = element), target: isExternal ? '_blank' : target, rel: isExternal ? 'noopener noreferrer' : rel }, inheritedAttributes, { part: "link", onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => emitEvent(e, this.gcdsClick, href) }), h("slot", null), target === '_blank' || external ? (h("gcds-icon", { name: "external-link", label: I18N[lang].external, "margin-left": "100" })) : download !== undefined ? (h("gcds-icon", { name: "download", label: I18N[lang].download, "margin-left": "100" })) : href && href.toLowerCase().startsWith('mailto:') ? (h("gcds-icon", { "icon-style": "regular", name: "envelope", label: I18N[lang].email, "margin-left": "100" })) : (href &&
            href.toLowerCase().startsWith('tel:') && (h("gcds-icon", { name: "phone", label: I18N[lang].phone, "margin-left": "100" }))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "variant": ["validateVariant"],
        "size": ["validateSize"],
        "display": ["validateDisplay"]
    }; }
};
GcdsLink.style = gcdsLinkCss;

export { GcdsLink as gcds_link };

//# sourceMappingURL=gcds-link.entry.js.map