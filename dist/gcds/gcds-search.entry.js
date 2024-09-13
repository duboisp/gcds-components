import { r as registerInstance, e as createEvent, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage, b as emitEvent } from './utils-6349c5d1.js';

const I18N = {
  en: {
    search: 'Search',
    searchLabel: 'Search {$}',
  },
  fr: {
    search: 'Recherche',
    searchLabel: 'Rechercher dans {$}',
  },
};

const gcdsSearchCss = "@layer reset, default, focus;@layer reset{:host{display:block}:host .gcds-search input{background-image:none;box-sizing:border-box}:host [type=search]::-webkit-search-cancel-button,:host [type=search]::-webkit-search-decoration{-webkit-appearance:none;appearance:none}}@layer default{:host .gcds-search .gcds-search__header{display:block;height:0;margin:0;overflow:hidden;width:0}:host .gcds-search .gcds-search__form{display:flex;margin:var(--gcds-search-margin)!important}:host .gcds-search input{background-color:var(--gcds-search-default-background);border:var(--gcds-search-border-width) solid;border-radius:var(--gcds-search-border-radius);color:var(--gcds-search-default-text);font:var(--gcds-search-font);height:auto;min-height:var(--gcds-search-min-width-and-height);padding:var(--gcds-search-padding)!important;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:100%}:host .gcds-search ::part(button){border-end-start-radius:0;border-start-start-radius:0;height:100%;margin:0}}@layer focus{:host .gcds-search input:focus{border-color:var(--gcds-search-focus-text);border-radius:var(--gcds-search-focus-border-radius);box-shadow:var(--gcds-search-focus-box-shadow);outline:var(--gcds-search-outline-width) solid var(--gcds-search-focus-text);outline-offset:var(--gcds-search-border-width);z-index:30}:host .gcds-search ::part(button):focus{border-radius:var(--gcds-search-focus-border-radius);box-shadow:var(--gcds-search-focus-box-shadow)}}";

const GcdsSearch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gcdsInput = createEvent(this, "gcdsInput", 7);
        this.gcdsChange = createEvent(this, "gcdsChange", 7);
        this.gcdsFocus = createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = createEvent(this, "gcdsBlur", 7);
        this.gcdsSubmit = createEvent(this, "gcdsSubmit", 7);
        this.handleInput = (e, customEvent) => {
            const input = e.target;
            this.value = input.value;
            customEvent.emit(this.value);
        };
        this.placeholder = 'Canada.ca';
        this.action = '/sr/srb.html';
        this.method = 'get';
        this.name = 'q';
        this.searchId = 'search';
        this.value = undefined;
        this.suggested = undefined;
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
    }
    render() {
        const { placeholder, action, method, name, value, lang, searchId, suggested, } = this;
        const labelText = `${I18N[lang].searchLabel.replace('{$}', placeholder)}`;
        const attrsInput = {
            name,
            placeholder: labelText,
        };
        const formAction = action === '/sr/srb.html'
            ? `https://www.canada.ca/${lang}/sr/srb.html`
            : action;
        return (h(Host, null, h("div", { class: "gcds-search" }, h("gcds-sr-only", { tag: "h2" }, I18N[lang].search), h("form", { action: formAction, method: method, role: "search", onSubmit: e => emitEvent(e, this.gcdsSubmit, this.value), class: "gcds-search__form" }, h("gcds-label", { label: labelText, "label-for": searchId, "hide-label": true }), h("input", Object.assign({ type: "search", id: searchId, list: "search-list", size: 34, maxLength: 170, onInput: e => this.handleInput(e, this.gcdsInput), onChange: e => this.handleInput(e, this.gcdsChange), onFocus: () => this.gcdsFocus.emit(), onBlur: () => this.gcdsBlur.emit() }, attrsInput, { class: "gcds-search__input", value: value })), suggested && (h("datalist", { id: "search-list" }, suggested.map((k, v) => (h("option", { value: k, key: v }))))), h("gcds-button", { type: "submit", class: "gcds-search__button", exportparts: "button" }, h("gcds-icon", { name: "search", label: I18N[lang].search, "fixed-width": true }))))));
    }
    get el() { return getElement(this); }
};
GcdsSearch.style = gcdsSearchCss;

export { GcdsSearch as gcds_search };

//# sourceMappingURL=gcds-search.entry.js.map