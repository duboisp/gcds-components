export declare class GcdsPageFeedback {
    #private;
    el: HTMLElement;
    /**
     * Props
     */
    notInPageDetailSection?: boolean;
    /**
     * Language of rendered component
     */
    lang: string;
    updateLang(): void;
    /**
     * Optional configurable option for feedback categorization
     */
    theme?: '';
    section?: '';
    /**
     * Optional contact us information
     */
    contact?: '';
    contactLink?: '';
    submissionURL: string;
    action?: string;
    validateActionUrl(): void;
    feedbackForm?: '';
    validateFeedbackForm(): void;
    popstateListener(ev: any): void;
    componentWillLoad(): void;
    currentStep: number;
    resetPFT(ev: any): void;
    private get renderFormFeedback();
    private get renderContact();
    render(): any;
}
