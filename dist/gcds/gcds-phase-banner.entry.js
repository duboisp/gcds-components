import { r as registerInstance, h, a as Host, g as getElement } from './index-e6d17e19.js';
import { o as observerConfig, a as assignLanguage } from './utils-6349c5d1.js';

const I18N = {
  en: {
    label: 'Banner',
  },
  fr: {
    label: 'Bannière',
  },
};

const gcdsPhaseBannerCss = "@layer reset, default, fixed, role, wide, compact;@layer reset{:host{display:block}:host slot{display:initial}}@layer default{:host .gcds-phase-banner{container:component banner/inline-size;font:var(--gcds-phase-banner-font);line-height:var(--gcds-phase-banner-line-height)}:host .gcds-phase-banner .banner__content{padding:var(--gcds-phase-banner-padding)}:host .gcds-phase-banner .banner__icon{display:flex;margin:0}:host .gcds-phase-banner .banner__icon.icon--left{margin-inline-end:var(--gcds-phase-banner-icon-margin)}:host .gcds-phase-banner .banner__icon.icon--right{margin-inline-start:var(--gcds-phase-banner-icon-margin)}:host .gcds-phase-banner .banner__icon ::slotted(img),:host .gcds-phase-banner .banner__icon ::slotted(svg){max-height:var(--gcds-phase-banner-icon-max-height)}:host .gcds-phase-banner .banner__details{align-items:baseline;display:flex;flex-wrap:wrap}:host .gcds-phase-banner .banner__details ::slotted(a),:host .gcds-phase-banner .banner__details ::slotted(gcds-button){flex:0 0 auto}:host .gcds-phase-banner .banner__details ::slotted(a),:host .gcds-phase-banner .banner__details ::slotted(small),:host .gcds-phase-banner .banner__details ::slotted(span){font-size:80%!important}:host .gcds-phase-banner .banner__details ::slotted(p){font:var(--gcds-phase-banner-font);margin:0}:host .gcds-phase-banner .banner__details ::slotted(a){color:inherit}:host .gcds-phase-banner .banner__details ::slotted(gcds-button){margin:var(--gcds-phase-banner-details-cta-margin);transform:scale(90%)}}@layer fixed{:host .gcds-phase-banner.banner-is-fixed{position:sticky;top:0;width:100%;z-index:9999}}@layer role{:host .gcds-phase-banner.banner--role-primary{background-color:var(--gcds-phase-banner-primary-background);color:var(--gcds-phase-banner-primary-text)}:host .gcds-phase-banner.banner--role-secondary{background-color:var(--gcds-phase-banner-secondary-background);color:var(--gcds-phase-banner-secondary-text)}}@layer wide{@container banner (width >= 36em){:host .gcds-phase-banner .banner__content{display:flex}}}@layer compact{@container banner (width < 36em){:host .gcds-phase-banner .banner__content .banner__icon{display:none}}}";

const GcdsPhaseBanner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.bannerRole = 'primary';
        this.container = 'xl';
        this.isFixed = undefined;
        this.lang = undefined;
    }
    /**
     * Events
     */
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
        const { bannerRole, container, isFixed, lang } = this;
        return (h(Host, null, h("div", { class: `gcds-phase-banner banner--role-${bannerRole} ${isFixed ? 'banner--is-fixed' : ''}`, role: "status", "aria-label": I18N[lang].label }, h("gcds-container", { size: container, centered: true }, h("div", { class: "banner__content" }, h("figure", { class: "banner__icon icon--left" }, h("slot", { name: "banner-icon-left" })), h("div", { class: "banner__details" }, h("slot", { name: "banner-text" }), h("slot", { name: "banner-cta" })), h("figure", { class: "banner__icon icon--right" }, h("slot", { name: "banner-icon-right" })))))));
    }
    get el() { return getElement(this); }
};
GcdsPhaseBanner.style = gcdsPhaseBannerCss;

export { GcdsPhaseBanner as gcds_phase_banner };

//# sourceMappingURL=gcds-phase-banner.entry.js.map