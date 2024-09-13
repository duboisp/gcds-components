import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';

const gcdsErrorMessageCss = "@layer reset, default;@layer reset{:host{display:inline-block}:host slot{display:initial}}@layer default{:host .error-message gcds-icon,:host .error-message::part(text){color:var(--gcds-error-message-text-color)}}";

const GcdsErrorMessage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.messageId = undefined;
    }
    render() {
        const { messageId } = this;
        return (h(Host, { id: `error-message-${messageId}`, class: "gcds-error-message-wrapper" }, h("gcds-text", { class: "error-message", role: "alert", "margin-bottom": "300" }, h("gcds-icon", { name: "triangle-exclamation", "margin-right": "100" }), h("strong", null, h("slot", null)))));
    }
    get el() { return getElement(this); }
};
GcdsErrorMessage.style = gcdsErrorMessageCss;

export { GcdsErrorMessage as gcds_error_message };

//# sourceMappingURL=gcds-error-message.entry.js.map