import { r as registerInstance, e as createEvent, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage, i as inheritAttributes } from './utils-6349c5d1.js';
import { d as defaultValidator, r as requiredValidator, g as getValidator } from './index-aec9de01.js';

const I18N = {
  en: {
    button: {
      remove: 'Remove',
      upload: 'Choose file',
    },
    summary: {
      selected: 'Currently selected:',
      unselected: 'No file currently selected.',
    },
    removeFile: 'Remove file',
  },
  fr: {
    button: {
      remove: 'Supprimer',
      upload: 'Choisir un fichier',
    },
    summary: {
      selected: 'Actuellement sélectionné:',
      unselected: 'Aucun fichier actuellement sélectionné.',
    },
    removeFile: 'Supprimer le fichier',
  },
};

const gcdsFileUploaderCss = "@layer reset, default, input, files, disabled, error, focus, active;@layer reset{:host{display:block}:host .gcds-file-uploader-wrapper{border:0;margin:0;padding:0}:host .gcds-file-uploader-wrapper button{cursor:pointer;font:inherit;outline:0}}@layer default{:host .gcds-file-uploader-wrapper{align-items:flex-start;color:var(--gcds-file-uploader-default-text);display:flex;flex-direction:column;font:var(--gcds-file-uploader-font);max-width:90%;transition:color .15s ease-in-out}:host .gcds-file-uploader-wrapper button{border-radius:var(--gcds-file-uploader-file-button-border-radius);transition:all .15s ease-in-out}}@layer input{:host .gcds-file-uploader-wrapper .file-uploader__input{display:inline-block;position:relative}:host .gcds-file-uploader-wrapper .file-uploader__input button{background-color:var(--gcds-file-uploader-button-background);border:var(--gcds-file-uploader-button-border-width) solid var(--gcds-file-uploader-button-text);color:var(--gcds-file-uploader-button-text);font-weight:var(--gcds-file-uploader-button-font-weight);margin:var(--gcds-file-uploader-button-margin);padding:var(--gcds-file-uploader-button-padding)}:host .gcds-file-uploader-wrapper .file-uploader__input input{cursor:pointer;height:100%;left:0;opacity:0;position:absolute;top:0;width:100%}:host .gcds-file-uploader-wrapper .file-uploader__input #file-uploader__summary{height:0;margin:0;overflow:hidden;visibility:hidden}}@layer files{:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file{align-items:center;border:var(--gcds-file-uploader-file-border-width) solid var(--gcds-file-uploader-file-border-color);cursor:pointer;display:flex;justify-content:space-between;max-width:var(--gcds-file-uploader-file-max-width);padding:var(--gcds-file-uploader-file-padding);width:100%}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file:not(:last-of-type){border-block-end:0}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file:last-of-type{margin:var(--gcds-file-uploader-button-margin)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file gcds-text{overflow:auto}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file gcds-text::part(text){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button{align-items:center;background:transparent;border:0;color:var(--gcds-file-uploader-file-button-default-text);display:flex;font-weight:var(--gcds-file-uploader-button-font-weight);margin:var(--gcds-file-uploader-file-button-margin);padding:var(--gcds-file-uploader-file-button-padding)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button:not(:focus) span{overflow:visible;text-decoration:underline var(--gcds-file-uploader-file-button-default-decoration-thickness);text-underline-offset:var(\n          --gcds-file-uploader-file-button-underline-offset\n        )}}@layer disabled{:host .gcds-file-uploader-wrapper.gcds-disabled{color:var(--gcds-file-uploader-disabled-text)}:host .gcds-file-uploader-wrapper.gcds-disabled :is(.file-uploader__input,.file-uploader__uploaded-file){pointer-events:none}:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__input button,:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__uploaded-file,:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__uploaded-file button{color:inherit}:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__input button{background-color:var(--gcds-file-uploader-disabled-background);border-color:currentColor}}@layer error{:host .gcds-file-uploader-wrapper.gcds-error .file-uploader__uploaded-file{border-color:var(--gcds-file-uploader-file-danger-border-color)}}@layer hover{@media (hover:hover){:host .gcds-file-uploader-wrapper .file-uploader__input:not(:focus-within):hover button{background-color:var(--gcds-file-uploader-hover-button-background)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button:not(:focus):hover{color:var(--gcds-file-uploader-file-button-hover-text)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button:not(:focus):hover span{text-decoration-thickness:var(\n            --gcds-file-uploader-file-button-hover-decoration-thickness\n          )}}}@layer focus{:host .gcds-file-uploader-wrapper:focus-within{color:var(--gcds-file-uploader-focus-text)}:host .gcds-file-uploader-wrapper:focus-within .file-uploader__uploaded-file:focus-within{border-color:var(--gcds-file-uploader-file-focus-border-color)}:host .gcds-file-uploader-wrapper:focus-within .file-uploader__input:focus-within button,:host .gcds-file-uploader-wrapper:focus-within .file-uploader__uploaded-file button:focus{background-color:var(--gcds-file-uploader-focus-button-background);border-color:var(--gcds-file-uploader-focus-button-background);color:var(--gcds-file-uploader-focus-button-text);outline:var(--gcds-file-uploader-button-outline-width) solid var(--gcds-file-uploader-focus-button-background);outline-offset:var(--gcds-file-uploader-focus-button-outline-offset)}}@layer active{:host .gcds-file-uploader-wrapper .file-uploader__input:has(input:active) button{background-color:var(--gcds-file-uploader-active-button-background);border-color:var(--gcds-file-uploader-active-button-background);color:var(--gcds-file-uploader-active-button-text)}}";

const GcdsFileUploader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.gcdsFocus = createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = createEvent(this, "gcdsBlur", 7);
        this.gcdsChange = createEvent(this, "gcdsChange", 7);
        this.gcdsInput = createEvent(this, "gcdsInput", 7);
        this.gcdsRemoveFile = createEvent(this, "gcdsRemoveFile", 7);
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
        this.handleInput = (e, customEvent) => {
            const filesContainer = [];
            const files = Array.from(e.target.files);
            files.map(file => {
                filesContainer.push(file['name']);
            });
            this.addFilesToFormData(files);
            this.value = [...filesContainer];
            // Validate since the input loses focus when dialog opens
            if (this.validateOn == 'blur') {
                setTimeout(() => {
                    this.validate();
                }, 100);
            }
            if (e.type === 'change') {
                const changeEvt = new e.constructor(e.type, e);
                this.el.dispatchEvent(changeEvt);
            }
            customEvent.emit(this.value);
        };
        this.removeFile = e => {
            e.preventDefault();
            const fileName = e.target.closest('.file-uploader__uploaded-file')
                .childNodes[0].textContent;
            const filesContainer = this.value;
            const file = filesContainer.indexOf(fileName);
            if (file > -1) {
                filesContainer.splice(file, 1);
                // Add additional logic to remove file from input
                const dt = new DataTransfer();
                for (let f = 0; f < this.shadowElement.files.length; f++) {
                    if (this.shadowElement.files[f].name != fileName) {
                        dt.items.add(this.shadowElement.files[f]);
                    }
                }
                this.shadowElement.files = dt.files;
                this.addFilesToFormData(this.shadowElement.files);
            }
            this.value = [...filesContainer];
            this.gcdsRemoveFile.emit(this.value);
        };
        /*
         * Set form data for internals
         */
        this.addFilesToFormData = files => {
            const formData = new FormData();
            files.forEach(file => {
                formData.append(this.name, file, file.name);
            });
            this.internals.setFormValue(formData);
        };
        this.uploaderId = undefined;
        this.name = undefined;
        this.label = undefined;
        this.required = false;
        this.disabled = false;
        this.value = [];
        this.accept = undefined;
        this.multiple = undefined;
        this.errorMessage = undefined;
        this.hint = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.hasError = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
    }
    validateDisabledSelect() {
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
    validateHasError() {
        if (this.disabled) {
            this.hasError = false;
        }
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.shadowElement.files) &&
            this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsError.emit({
                id: `#${this.uploaderId}`,
                message: `${this.label} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit({ id: `#${this.uploaderId}` });
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
        this.internals.setFormValue('');
        this.value = [];
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.value = state;
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
        this.validateDisabledSelect();
        this.validateHasError();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'file');
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { accept, disabled, errorMessage, hasError, hint, label, lang, multiple, name, required, uploaderId, value, inheritedAttributes, } = this;
        const attrsInput = Object.assign(Object.assign({ accept,
            disabled,
            multiple,
            name,
            required,
            value }, inheritedAttributes), { 'aria-describedby': `${inheritedAttributes['aria-describedby']
                ? `${inheritedAttributes['aria-describedby']} `
                : ''}file-uploader__summary` });
        const attrsLabel = {
            label,
            required,
        };
        if (hint || errorMessage) {
            const hintID = hint ? `hint-${uploaderId} ` : '';
            const errorID = errorMessage ? `error-message-${uploaderId} ` : '';
            attrsInput['aria-describedby'] =
                `${hintID}${errorID}${attrsInput['aria-describedby']}`;
        }
        return (h(Host, null, h("div", { class: `gcds-file-uploader-wrapper ${disabled ? 'gcds-disabled' : ''} ${hasError ? 'gcds-error' : ''}` }, h("gcds-label", Object.assign({}, attrsLabel, { "label-for": uploaderId, lang: lang })), hint ? h("gcds-hint", { "hint-id": uploaderId }, hint) : null, errorMessage ? (h("gcds-error-message", { messageId: uploaderId }, errorMessage)) : null, h("div", { class: `file-uploader__input ${value.length > 0 ? 'uploaded-files' : ''}` }, h("button", { type: "button", tabindex: "-1", onClick: () => this.shadowElement.click() }, I18N[lang].button.upload), h("input", Object.assign({ type: "file", id: uploaderId }, attrsInput, { onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), onInput: e => this.handleInput(e, this.gcdsInput), onChange: e => this.handleInput(e, this.gcdsChange), "aria-invalid": hasError ? 'true' : 'false', ref: element => (this.shadowElement = element) })), value.length > 0 ? (h("gcds-sr-only", { id: "file-uploader__summary" }, h("span", null, I18N[lang].summary.selected, " "), value.map(file => (h("span", null, file, " "))))) : (h("gcds-sr-only", { id: "file-uploader__summary" }, I18N[lang].summary.unselected))), value.length > 0
            ? value.map(file => (h("div", { class: "file-uploader__uploaded-file", "aria-label": `${I18N[lang].removeFile} ${file}.` }, h("gcds-text", { "margin-bottom": "0" }, file), h("button", { onClick: e => this.removeFile(e) }, h("span", null, I18N[lang].button.remove), h("gcds-icon", { name: "times", size: "text", "margin-left": "200" })))))
            : null)));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "disabled": ["validateDisabledSelect"],
        "errorMessage": ["validateErrorMessage"],
        "validator": ["validateValidator"],
        "hasError": ["validateHasError"]
    }; }
};
GcdsFileUploader.style = gcdsFileUploaderCss;

export { GcdsFileUploader as gcds_file_uploader };

//# sourceMappingURL=gcds-file-uploader.entry.js.map