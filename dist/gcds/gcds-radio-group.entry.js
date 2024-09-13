import { r as registerInstance, e as createEvent, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage, i as inheritAttributes } from './utils-6349c5d1.js';

const gcdsRadioGroupCss = "@layer reset, default, disabled, error, focus;@layer reset{:host{display:block}:host .gcds-radio{border:0;padding:0}:host .gcds-radio gcds-label:after,:host .gcds-radio gcds-label:before{box-sizing:border-box;content:\"\";cursor:pointer}}@layer default{:host .gcds-radio{color:var(--gcds-radio-default-text);font:var(--gcds-radio-font);margin:var(--gcds-radio-margin)!important;max-width:var(--gcds-radio-max-width);min-height:calc(var(--gcds-radio-input-height-and-width) - var(--gcds-radio-padding));padding:var(--gcds-radio-padding) 0 0;position:relative;transition:color .15s ease-in-out}:host .gcds-radio :is(gcds-label,gcds-hint){padding:var(--gcds-radio-label-padding)!important}:host .gcds-radio gcds-hint::part(hint){margin:0}:host .gcds-radio gcds-label:after,:host .gcds-radio gcds-label:before,:host .gcds-radio input{position:absolute}:host .gcds-radio gcds-label:before,:host .gcds-radio input{height:var(--gcds-radio-input-height-and-width);left:0;top:0;width:var(--gcds-radio-input-height-and-width)}:host .gcds-radio input{opacity:0}:host .gcds-radio gcds-label{width:fit-content}:host .gcds-radio gcds-label:after,:host .gcds-radio gcds-label:before{border-radius:var(--gcds-radio-border-radius)}:host .gcds-radio gcds-label:before{border:var(--gcds-radio-input-border-width) solid;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,outline .15s ease-in-out}:host .gcds-radio gcds-label:after{background-color:currentcolor;height:var(--gcds-radio-check-height-and-width);left:var(--gcds-radio-check-left);opacity:0;top:var(--gcds-radio-check-top);transition:opacity .2s ease-in-out;width:var(--gcds-radio-check-height-and-width)}:host .gcds-radio input:checked+gcds-label:after{opacity:1}}@layer disabled{:host .gcds-radio.gcds-radio--disabled{color:var(--gcds-radio-disabled-text)}:host .gcds-radio.gcds-radio--disabled gcds-label:after,:host .gcds-radio.gcds-radio--disabled gcds-label:before{cursor:not-allowed}:host .gcds-radio.gcds-radio--disabled gcds-label:before{background-color:var(--gcds-radio-disabled-background);border-color:var(--gcds-radio-disabled-border)}}@layer error{:host .gcds-radio.gcds-radio--error:not(:focus-within) gcds-label:before{border-color:var(--gcds-radio-danger-border)}:host .gcds-radio.gcds-radio--error:not(:focus-within) gcds-label:after{background-color:var(--gcds-radio-danger-border)}}@layer focus{:host .gcds-radio:focus-within{color:var(--gcds-radio-focus-text)}:host .gcds-radio:focus-within input:focus+gcds-label:before{background:var(--gcds-radio-focus-background);box-shadow:var(--gcds-radio-focus-box-shadow);outline:var(--gcds-radio-focus-outline-width) solid currentcolor;outline-offset:var(--gcds-radio-input-border-width)}:host .gcds-radio:focus-within input:focus+gcds-label:after{background-color:currentcolor}}";

const GcdsRadioGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gcdsChange = createEvent(this, "gcdsChange", 7);
        this.gcdsFocus = createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = createEvent(this, "gcdsBlur", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this.onBlur = () => {
            this.gcdsBlur.emit();
        };
        this.onChange = e => {
            this.value = e.target.value;
            this.gcdsChange.emit(e.target.value);
            this.internals.setFormValue(e.target.value, 'checked');
            const changeEvt = new e.constructor(e.type, e);
            this.el.dispatchEvent(changeEvt);
        };
        this.options = undefined;
        this.name = undefined;
        this.value = undefined;
        this.hasError = undefined;
        this.parentError = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
    }
    validateOptions() {
        if (typeof this.options == 'object') {
            this.optionObject = this.options;
        }
        else if (typeof this.options == 'string') {
            this.optionObject = JSON.parse(this.options);
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
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateOptions();
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
        this.optionObject &&
            this.optionObject.map(radio => {
                if (radio.checked) {
                    this.internals.setFormValue(radio.value, 'checked');
                }
            });
    }
    /**
     * Event listener for gcds-fieldset errors
     */
    gcdsGroupError(e) {
        if (e.srcElement.contains(this.el)) {
            this.hasError = true;
            this.parentError = e.detail;
        }
    }
    gcdsGroupErrorClear(e) {
        if (e.srcElement.contains(this.el) && this.hasError) {
            this.hasError = false;
            this.parentError = '';
        }
    }
    render() {
        const { lang, name, hasError, parentError, inheritedAttributes } = this;
        return (h(Host, null, this.optionObject &&
            this.optionObject.map(radio => {
                const attrsInput = Object.assign({ name, disabled: radio.disabled, required: radio.required, value: radio.value, checked: radio.checked }, inheritedAttributes);
                if (radio.hint || parentError) {
                    const hintID = radio.hint ? `hint-${radio.id} ` : '';
                    const errorID = parentError ? `parent-error ` : '';
                    attrsInput['aria-describedby'] = `${hintID}${errorID}${attrsInput['aria-describedby']
                        ? `${attrsInput['aria-describedby']}`
                        : ''}`;
                }
                if (hasError) {
                    attrsInput['aria-invalid'] = 'true';
                }
                return (h("div", { class: `gcds-radio ${radio.disabled ? 'gcds-radio--disabled' : ''} ${hasError ? 'gcds-radio--error' : ''}` }, h("input", Object.assign({ id: radio.id, type: "radio" }, attrsInput, { onChange: e => this.onChange(e), onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), ref: element => (this.shadowElement = element) })), h("gcds-label", { label: radio.label, "label-for": radio.id, lang: lang }), radio.hint ? (h("gcds-hint", { "hint-id": radio.id }, radio.hint)) : null));
            }), parentError && (h("span", { id: `parent-error`, hidden: true }, parentError))));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "options": ["validateOptions"]
    }; }
};
GcdsRadioGroup.style = gcdsRadioGroupCss;

export { GcdsRadioGroup as gcds_radio_group };

//# sourceMappingURL=gcds-radio-group.entry.js.map