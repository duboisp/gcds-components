import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage, l as logError } from './utils-6349c5d1.js';

const I18N = {
  en: {
    step: 'Step',
    of: 'of',
  },
  fr: {
    step: 'Étape',
    of: 'sur',
  },
};

const gcdsStepperCss = "@layer reset, default;@layer reset{:host{display:block}}@layer default{:host .gcds-stepper .gcds-stepper__steps{display:block;font:var(--gcds-stepper-font-desktop);margin:var(--gcds-stepper-margin-desktop)}@media only screen and (width < 48em){:host .gcds-stepper .gcds-stepper__steps{font:var(--gcds-stepper-font-mobile);margin:var(--gcds-stepper-margin-mobile)}}}";

const GcdsStepper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.currentStep = undefined;
        this.totalSteps = undefined;
        this.tag = 'h2';
        this.errors = [];
        this.lang = undefined;
    }
    validateCurrentStep() {
        if (this.currentStep <= 0 ||
            isNaN(this.currentStep) ||
            this.currentStep > this.totalSteps) {
            this.errors.push('currentStep');
        }
        else if (this.errors.includes('currentStep')) {
            this.errors.splice(this.errors.indexOf('currentStep'), 1);
        }
    }
    validateTotalSteps() {
        if (this.totalSteps <= 0 ||
            isNaN(this.totalSteps) ||
            this.totalSteps < this.currentStep) {
            this.errors.push('totalSteps');
        }
        else if (this.errors.includes('totalSteps')) {
            this.errors.splice(this.errors.indexOf('totalSteps'), 1);
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
    validateChildren() {
        if (this.el.innerHTML.trim() == '') {
            this.errors.push('children');
        }
        else if (this.errors.includes('children')) {
            this.errors.splice(this.errors.indexOf('children'), 1);
        }
    }
    validateRequiredProps() {
        this.validateCurrentStep();
        this.validateTotalSteps();
        this.validateChildren();
        if (this.errors.includes('totalSteps') ||
            this.errors.includes('currentStep') ||
            this.errors.includes('children')) {
            return false;
        }
        return true;
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        let valid = this.validateRequiredProps();
        if (!valid) {
            logError('gcds-stepper', this.errors);
        }
    }
    render() {
        const { currentStep, lang, totalSteps, tag } = this;
        return (h(Host, null, this.validateRequiredProps() && (h("gcds-heading", { tag: tag, class: "gcds-stepper", "margin-top": "0", "margin-bottom": "300" }, h("span", { class: "gcds-stepper__steps" }, `${I18N[lang].step} ${currentStep} ${I18N[lang].of} ${totalSteps}`, h("gcds-sr-only", null, " : ")), h("slot", null)))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "currentStep": ["validateCurrentStep"],
        "totalSteps": ["validateTotalSteps"]
    }; }
};
GcdsStepper.style = gcdsStepperCss;

export { GcdsStepper as gcds_stepper };

//# sourceMappingURL=gcds-stepper.entry.js.map