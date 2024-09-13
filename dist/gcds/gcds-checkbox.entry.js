import { r as registerInstance, e as createEvent, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { e as elementGroupCheck, o as observerConfig, a as assignLanguage, i as inheritAttributes, b as emitEvent } from './utils-6349c5d1.js';
import { d as defaultValidator, r as requiredValidator, g as getValidator } from './index-aec9de01.js';

const gcdsCheckboxCss = "@layer reset, default, disabled, error, focus;@layer reset{:host{display:block}:host .gcds-checkbox{padding:0}:host .gcds-checkbox gcds-label:after,:host .gcds-checkbox gcds-label:before{box-sizing:border-box;content:\"\";cursor:pointer}}@layer default{:host .gcds-checkbox{color:var(--gcds-checkbox-default-text);font:var(--gcds-checkbox-font);margin:var(--gcds-checkbox-margin)!important;max-width:var(--gcds-checkbox-max-width);min-height:calc(var(--gcds-checkbox-input-height-and-width) - var(--gcds-checkbox-padding));padding:var(--gcds-checkbox-padding) 0 0;position:relative;transition:color .15s ease-in-out}:host .gcds-checkbox :is(gcds-label,gcds-hint,gcds-error-message){padding:var(--gcds-checkbox-label-padding)!important}:host .gcds-checkbox gcds-hint::part(hint){margin:0}:host .gcds-checkbox gcds-label:after,:host .gcds-checkbox gcds-label:before,:host .gcds-checkbox input{position:absolute}:host .gcds-checkbox gcds-label:before,:host .gcds-checkbox input{height:var(--gcds-checkbox-input-height-and-width);left:0;top:0;width:var(--gcds-checkbox-input-height-and-width)}:host .gcds-checkbox input{opacity:0}:host .gcds-checkbox gcds-label{width:fit-content}:host .gcds-checkbox gcds-label:before{border:var(--gcds-checkbox-input-border-width) solid;border-radius:var(--gcds-checkbox-input-border-radius);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,outline .15s ease-in-out}:host .gcds-checkbox gcds-label:after{border:var(--gcds-checkbox-check-border-width) solid;border-block-start:0!important;border-inline-start:0!important;height:var(--gcds-checkbox-check-height);left:var(--gcds-checkbox-check-left);opacity:0;top:var(--gcds-checkbox-check-top);transform:rotate(40deg);transition:opacity .2s ease-in-out;width:var(--gcds-checkbox-check-width)}:host .gcds-checkbox input:checked+gcds-label:after{opacity:1}}@layer disabled{:host .gcds-checkbox.gcds-checkbox--disabled{color:var(--gcds-checkbox-disabled-text)}:host .gcds-checkbox.gcds-checkbox--disabled gcds-label{color:var(--gcds-checkbox-disabled-text)}:host .gcds-checkbox.gcds-checkbox--disabled gcds-label:after,:host .gcds-checkbox.gcds-checkbox--disabled gcds-label:before{cursor:not-allowed}:host .gcds-checkbox.gcds-checkbox--disabled gcds-label:before{background-color:var(--gcds-checkbox-disabled-background);border-color:currentcolor}}@layer error{:host .gcds-checkbox.gcds-checkbox--error:not(:focus-within) gcds-label:before{border-color:var(--gcds-checkbox-danger-border)}:host .gcds-checkbox.gcds-checkbox--error:not(:focus-within) gcds-label:after{color:var(--gcds-checkbox-danger-border)}}@layer focus{:host .gcds-checkbox:focus-within{color:var(--gcds-checkbox-focus-text)}:host .gcds-checkbox:focus-within input:focus+gcds-label:before{background:var(--gcds-checkbox-focus-background);box-shadow:var(--gcds-checkbox-focus-box-shadow);outline:var(--gcds-checkbox-focus-outline-width) solid currentcolor;outline-offset:var(--gcds-checkbox-input-border-width)}}";

const GcdsCheckbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gcdsClick = createEvent(this, "gcdsClick", 7);
        this.gcdsFocus = createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = createEvent(this, "gcdsBlur", 7);
        this.gcdsChange = createEvent(this, "gcdsChange", 7);
        this.gcdsError = createEvent(this, "gcdsError", 7);
        this.gcdsValid = createEvent(this, "gcdsValid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._validator = defaultValidator;
        this.onBlur = () => {
            if (this.validateOn == 'blur') {
                this.validate();
            }
            this.gcdsBlur.emit();
        };
        this.onChange = e => {
            this.checked = !this.checked;
            this.internals.setFormValue(e.target.value, 'checked');
            if (!this.checked) {
                this.internals.setFormValue(null, 'checked');
            }
            const changeEvt = new e.constructor(e.type, e);
            this.el.dispatchEvent(changeEvt);
            this.gcdsChange.emit(this.checked);
        };
        this.checkboxId = undefined;
        this.label = undefined;
        this.name = undefined;
        this.required = undefined;
        this.disabled = undefined;
        this.value = undefined;
        this.checked = undefined;
        this.errorMessage = undefined;
        this.hint = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.parentError = undefined;
        this.inheritedAttributes = {};
        this.hasError = undefined;
        this.lang = undefined;
    }
    validateDisabledCheckbox() {
        if (this.required) {
            this.disabled = false;
        }
    }
    validateErrorMessage() {
        if (this.disabled) {
            this.errorMessage = '';
        }
        else if (!this.hasError && this.errorMessage) {
            this.hasError = true;
        }
        else if (this.errorMessage == '') {
            this.hasError = false;
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    /**
     * Event listener for gcds-fieldset errors
     */
    gcdsGroupError(e) {
        if (e.srcElement.contains(this.el) && elementGroupCheck(this.name)) {
            this.hasError = true;
            this.parentError = e.detail;
        }
        else if (!elementGroupCheck(this.name)) {
            this.hasError = false;
            this.parentError = '';
        }
    }
    gcdsGroupErrorClear(e) {
        if (e.srcElement.contains(this.el) && this.hasError) {
            this.hasError = false;
            this.parentError = '';
        }
    }
    validateHasError() {
        if (this.disabled) {
            this.hasError = false;
        }
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.checked) &&
            this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsError.emit({
                id: `#${this.checkboxId}`,
                message: `${this.label} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit({ id: `#${this.checkboxId}` });
        }
    }
    submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            if (this.hasError) {
                e.preventDefault();
            }
        }
    }
    /*
     * Form internal functions
     */
    formResetCallback() {
        if (this.checked != this.initialState) {
            this.checked = this.initialState;
        }
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.checked = state;
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
        this.validateDisabledCheckbox();
        this.validateHasError();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'checkbox');
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
        this.internals.setFormValue(this.checked ? this.value : null);
        this.initialState = this.checked ? this.checked : null;
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { lang, checkboxId, label, name, required, disabled, value, checked, hint, errorMessage, hasError, parentError, inheritedAttributes, } = this;
        const attrsInput = Object.assign({ name,
            disabled,
            required,
            value,
            checked }, inheritedAttributes);
        const attrsLabel = {
            label,
            required,
        };
        if (hint || errorMessage || parentError) {
            const hintID = hint ? `hint-${checkboxId} ` : '';
            const errorID = errorMessage ? `error-message-${checkboxId} ` : '';
            const parentErrorID = parentError ? `parent-error-${checkboxId} ` : '';
            attrsInput['aria-describedby'] = `${hintID}${errorID}${parentErrorID}${attrsInput['aria-describedby']
                ? `${attrsInput['aria-describedby']}`
                : ''}`;
        }
        if (hasError) {
            attrsInput['aria-invalid'] = 'true';
        }
        return (h(Host, null, h("div", { class: `gcds-checkbox ${disabled ? 'gcds-checkbox--disabled' : ''} ${hasError ? 'gcds-checkbox--error' : ''}` }, h("input", Object.assign({ id: checkboxId, type: "checkbox" }, attrsInput, { onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), onChange: e => this.onChange(e), onClick: e => emitEvent(e, this.gcdsClick), ref: element => (this.shadowElement = element) })), h("gcds-label", Object.assign({}, attrsLabel, { "label-for": checkboxId, lang: lang })), hint ? h("gcds-hint", { "hint-id": checkboxId }, hint) : null, errorMessage ? (h("gcds-error-message", { messageId: checkboxId }, errorMessage)) : null, parentError ? (h("span", { id: `parent-error-${checkboxId}`, hidden: true }, parentError)) : null)));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "disabled": ["validateDisabledCheckbox"],
        "errorMessage": ["validateErrorMessage"],
        "validator": ["validateValidator"],
        "hasError": ["validateHasError"]
    }; }
};
GcdsCheckbox.style = gcdsCheckboxCss;

export { GcdsCheckbox as gcds_checkbox };

//# sourceMappingURL=gcds-checkbox.entry.js.map