import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage } from './utils-6349c5d1.js';

const I18N = {
  en: {
    heading: 'There was a problem',
    subheading: 'Errors were found on this page:',
  },
  fr: {
    heading: 'Un problème est survenu',
    subheading: 'Des erreurs ont été trouvées sur cette page :',
  },
};

const gcdsErrorSummaryCss = "@layer reset, default, compact;@layer reset{:host{display:block}}@layer default{:host{container:component summary/inline-size}:host .gcds-error-summary{border:var(--gcds-error-summary-border-width) solid var(--gcds-error-summary-border-color);color:var(--gcds-error-summary-text);display:none;margin:var(--gcds-error-summary-margin);padding:var(--gcds-error-summary-padding);transition:background .15s ease-in-out,border .15s ease-in-out,color .15s ease-in-out}:host .gcds-error-summary.gcds-show{display:block}:host .gcds-error-summary .summary__errorlist{margin:var(--gcds-error-summary-list-margin);padding:0}:host .gcds-error-summary .summary__errorlist .summary__listitem{max-width:var(--gcds-error-summary-max-width)}:host .gcds-error-summary .summary__errorlist .summary__listitem:not(:last-child){padding:var(--gcds-error-summary-list-item-padding)}:host .gcds-error-summary .summary__errorlist .summary__listitem gcds-link::part(link):not(:focus){color:var(--gcds-error-summary-link-color)}}@layer compact{@container summary (width < 24em){:host .gcds-error-summary{padding:var(--gcds-error-summary-mobile-padding)}}}";

const GcdsErrorSummary = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.errorLinksObject = {};
        this.heading = undefined;
        this.listen = true;
        this.errorLinks = undefined;
        this.lang = undefined;
        this.errorQueue = {};
        this.hasSubmitted = false;
    }
    listenChanged() {
        if (this.errorLinks) {
            this.listen = false;
        }
    }
    /**
     * Convert contextual links prop to object
     * (Object props get treated as string when using Stencil components without a framework)
     */
    errorLinksChanged(newErrorLinks) {
        if (typeof newErrorLinks == 'string') {
            this.errorLinks = JSON.parse(newErrorLinks);
        }
        else if (typeof newErrorLinks == 'object') {
            this.errorLinks = newErrorLinks;
        }
        this.errorQueue = this.errorLinks;
        // Turn off listen if error-links is being used
        if (this.listen) {
            this.listen = false;
        }
    }
    errorListener(e) {
        if (this.listen && e.target.closest('form') == this.el.closest('form')) {
            this.errorLinksObject[e.detail.message] = e.target;
        }
    }
    validListener(e) {
        if (this.listen && e.target.closest('form') == this.el.closest('form')) {
            for (const [key, value] of Object.entries(this.errorLinksObject)) {
                if (value == e.target) {
                    delete this.errorLinksObject[key];
                }
            }
            if (this.errorQueue) {
                const sortedErrorList = this.sortErrors();
                this.errorQueue = Object.assign({}, sortedErrorList);
            }
        }
    }
    submitListener(e) {
        if (this.listen && e.target.closest('form') == this.el.closest('form')) {
            this.hasSubmitted = true;
            // Time out to collect gcdsError events before rendering
            setTimeout(() => {
                const sortedErrorList = this.sortErrors();
                this.errorQueue = Object.assign({}, sortedErrorList);
                // Time out to let list render
                setTimeout(() => {
                    this.shadowElement.focus();
                }, 50);
            }, 100);
        }
    }
    /*
     * Sort error object based on the order form compoennts appear in the form
     */
    sortErrors() {
        const sortable = Object.entries(this.errorLinksObject).map(([key, value]) => [
            key,
            value,
            value.getBoundingClientRect().y,
        ]);
        sortable.sort(function (a, b) {
            return a[2] - b[2];
        });
        const objSorted = {};
        sortable.forEach(function (item) {
            objSorted[item[0]] = item[1];
        });
        return objSorted;
    }
    /*
     * Focus element on error link click with label visible
     */
    focusElement(id) {
        const element = document.querySelector(id);
        let target = `[for=${id.replace('#', '')}]`;
        if (element.nodeName == 'FIELDSET') {
            target = `#legend-${id.replace('#', '')}`;
        }
        element.closest('form').querySelector(target).scrollIntoView();
        element.focus();
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
        this.listenChanged();
        // Format error-links string / object
        if (this.errorLinks && typeof this.errorLinks == 'string') {
            this.errorQueue = Object.assign({}, JSON.parse(this.errorLinks));
        }
        else if (this.errorLinks && typeof this.errorLinks == 'object') {
            this.errorQueue = Object.assign({}, this.errorLinks);
        }
    }
    render() {
        const { heading, errorQueue, lang, hasSubmitted, errorLinks } = this;
        return (h(Host, null, h("div", { role: "alert", tabindex: "-1", ref: element => (this.shadowElement = element), class: `gcds-error-summary ${(hasSubmitted || errorLinks) && Object.keys(errorQueue).length > 0
                ? 'gcds-show'
                : ''}` }, h("gcds-heading", { tag: "h2", "margin-top": "0", "margin-bottom": "300" }, heading !== null && heading !== void 0 ? heading : I18N[lang].heading), h("ol", { class: "summary__errorlist" }, (hasSubmitted || errorLinks) &&
            Object.keys(errorQueue).length > 0 &&
            Object.keys(errorQueue).map(key => {
                return (h("li", { class: "summary__listitem" }, h("gcds-link", { size: "regular", href: errorLinks ? key : '#', onClick: e => {
                        e.preventDefault();
                        errorLinks
                            ? this.focusElement(key)
                            : errorQueue[key].focus();
                    } }, errorLinks ? errorQueue[key] : key)));
            })))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "listen": ["listenChanged"],
        "errorLinks": ["errorLinksChanged"]
    }; }
};
GcdsErrorSummary.style = gcdsErrorSummaryCss;

export { GcdsErrorSummary as gcds_error_summary };

//# sourceMappingURL=gcds-error-summary.entry.js.map