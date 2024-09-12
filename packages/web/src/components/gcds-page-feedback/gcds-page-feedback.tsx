import { Component, Element, Host, Watch, Prop, State, h, Listen } from '@stencil/core';
import { assignLanguage, observerConfig } from '../../utils/utils';
import i18n from './i18n/i18n';
import DOMPurify from 'dompurify';

@Component({
  tag: 'gcds-page-feedback',
  styleUrl: 'gcds-page-feedback.css',
  shadow: true,
})
export class GcdsPageFeedback {
  @Element() el: HTMLElement;

  /**
   * Props
   */

  @Prop({ mutable: true }) notInPageDetailSection?: boolean = false;

  
  /**
   * Language of rendered component
   */
  @State() lang: string;
  
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
  
  /**
   * Configurable option to allow feedback categorization
   */
  @Prop({ mutable: true }) theme?: '';
  //@Watch('theme')
  
  @Prop({ mutable: true }) section?: '';
  //@Watch('section')


  /**
   * If a contact us information is specified
   */
  @Prop({ mutable: true }) contact?: '';
  @Prop({ mutable: true }) contactLink?: '';
  
  
  /* Custom form */
  #feedbackFormHTML = "" as string;
  #feedbackFormFragment = new DocumentFragment();
  #sanitizeOptions = {
	CUSTOM_ELEMENT_HANDLING: {
	  tagNameCheck: /^gcds-/, // only allow GCDS custom elements
	  attributeNameCheck: /.+/, // allow all attributes
	  allowCustomizedBuiltInElements: false // customized built-ins are not allowed yet
	}
  };
  
  @State() submissionURL: string = "";
  @Prop() action?: string;
  validateActionUrl() {
	this.submissionURL = this.action;
  }
  @Prop({ mutable: true }) feedbackForm?: '';
  @Watch('feedbackForm')
  validateFeedbackForm() {

	// Check if we need to load an external feedback form
    if ( this.feedbackForm ) {
	
	  // Load the form from a centralized URL
	  
	  const slotFeedbackFormInjected = this.el.querySelector( 'div[slot=feedback-form]' );
	  
	  if ( slotFeedbackFormInjected && !slotFeedbackFormInjected.hasAttribute( 'data-ajaxed-from' ) ) {
		console.error( 'A custom feedback form are already set, unable to override via ajax' );
		return;
	  }
	  
	  fetch( this.feedbackForm, {
		method: 'get'
	  }).then( ( response ) => {
	  
		// If we get a 404, let's running on the fallback.
		if (!response.ok) {
		  this.feedbackForm = '';
		  console.error( "404 - file not found" );
		  throw new Error( "404 - file not found" );
		}
		
		return response.text();
	  })
	  .then( ( responseText ) => {
		
		
		// Create the slot container
		const divSlotCustomForm = document.createElement('div');
		divSlotCustomForm.slot = 'feedback-form';
		divSlotCustomForm.dataset.ajaxedFrom = this.feedbackForm;
		divSlotCustomForm.innerHTML = DOMPurify.sanitize( responseText, this.#sanitizeOptions ); // Insert sanitized HTML only
		
		// Extract the custom action from the fetched HTML fragment
		const elmWithActionURL = divSlotCustomForm.querySelector( '[data-feedback-form-action]' ) as HTMLElement;
		
		// Remove the submission URL not specified
		if ( !this.action ) {
		  this.submissionURL = "";
		}
		
		if ( !this.submissionURL && elmWithActionURL ) {
		  this.submissionURL = elmWithActionURL.dataset.feedbackFormAction;
		}
		
		// Abort if there no custom form action url defined
		if ( !this.submissionURL ) {
		  console.error( 'A custom feedback form action URL is required' );
		  return;
		}

		// Remove the div slot with the custom form
		slotFeedbackFormInjected && slotFeedbackFormInjected.remove();
		
		// Add the div slot to this element
		this.el.append( divSlotCustomForm );
		
		console.log( "Form are going to be posted: " + this.submissionURL );
		
	  });
	}
  }

  
  //
  // Get opposite page language defined in the current page
  //
  #getOppositeLangLocation() {
	let elmLinkOppLang;
	
	// First: use explicit and first <gcds-lang-toggle>
	elmLinkOppLang = document.querySelector( "gcds-lang-toggle[href]" );
	if ( elmLinkOppLang ) {
	  return elmLinkOppLang.href;
	}

	// Second: Custom opposite page variant via the "gcds-header [slot=toggle]"
	// Waiting for a valid use case prior to support it.
	
	// Third, use <gcds-header>
	elmLinkOppLang = document.querySelector( "gcds-header[lang-href]" );
	if ( elmLinkOppLang ) {
	  return elmLinkOppLang.langHref;
	}
	
	
	// Fourth, co-existing with GCWeb
	elmLinkOppLang = document.querySelector( "#wb-lng ul li:first-child a[lang]" );
	if ( elmLinkOppLang ) {
	  return elmLinkOppLang.href;
	}
	
	// There no opposite language location found
	return '';
  }
  
  //
  // Get the institution name
  //
  #getInstitutionName() {
	let elmInstitutionInfo;
	
	// First: Dublin Core meta element via HTML or RDFa or HTML author
	elmInstitutionInfo = document.querySelector( "meta[name='dcterm.creator'],meta[property='dcterm:creator'],meta[name=author]" );
  	if ( elmInstitutionInfo ) {
	  return elmInstitutionInfo.content;
	}
	
	// JSON-LD only if default context are schema.org vocabulary and assuming the root type is a Thing that do represent the current web page content
	elmInstitutionInfo = document.querySelector( 'script[type="application/ld+json"]' );
	if ( elmInstitutionInfo ) {
	  try {
		const jsonld = JSON.parse( elmInstitutionInfo.innerText );
		const creator = jsonld.creator || jsonld.author;
		if ( jsonld["@context"].match( /^https?:\/\/schema.org\/?$/) && creator && typeof creator === 'string' ) {
		  return creator;
		}
	  } catch (e) {
		// continue
	  }
	}
  
	// RDFa, assuming its an implementation that use schema.org default vocabulary
	elmInstitutionInfo = document.querySelector( '[typeof~="WebPageElement"]:not(:has([typeof])) [property~="creator"],[typeof~="WebPage"]:not(:has([typeof])) [property~="author"]' );
	if ( elmInstitutionInfo ) {
	  return elmInstitutionInfo.textContent;
	}

	// There no institution defined
	return '';
  }
  
  //
  // Get page title
  //
  #getPageTitle() {
	let elmPageTitle;
	
  	// RDFa, assuming its an implementation that use schema.org default vocabulary
	elmPageTitle = document.querySelector( '[typeof~="WebPageElement"]:not(:has([typeof])) [property~="name"],[typeof~="WebPage"]:not(:has([typeof])) [property~="name"]' );
	if ( elmPageTitle ) {
	  return elmPageTitle.textContent;
	}

  	// JSON-LD only if default context are schema.org vocabulary and assuming the root type is a Thing that do represent the current web page content
	elmPageTitle = document.querySelector( 'script[type="application/ld+json"]' );
	if ( elmPageTitle ) {
	  try {
		const jsonld = JSON.parse( elmPageTitle.innerText );
		if ( jsonld["@context"].match( /^https?:\/\/schema.org\/?$/) && jsonld.name ) {
		  return jsonld.name;
		}
	  } catch (e) {
		// continue
	  }
	}
  
	// GCDS heading level 1 or the first h1
	elmPageTitle = document.querySelector( 'gcds-heading[tag=h1],h1' );
	if ( elmPageTitle ) {
	  return elmPageTitle.textContent;
	}
	
	// Document title
	return document.title;
  
  }
  
  #pageTitle = '';
  #pageLanguage = '';
  #pageOppLangUrl = '';
  #submissionPage = '';
  #institution = '';
  
  // Listen to history push and reset the PFT to its intro state
  #historyPushNative;
  #historyPush = (state, unused, url) => {
	this.currentStep = this.#stepPFT.introQuestion;
	this.#historyPushNative.call(window.history, state, unused, url);
	this.#getPageMetadata();
	this.#restoreFeedbackForm();
  };
  
  // Listen to history back and reset the PFT to its intro state
  @Listen('popstate', { target: 'window'})
  popstateListener(ev) {
	this.currentStep = this.#stepPFT.introQuestion;
	this.#getPageMetadata();
  }

  
  #getPageMetadata() {
  	// Define lang attribute
	this.lang = assignLanguage(this.el);
	
	// Get page properties
	this.#pageTitle = this.#getPageTitle();
	this.#pageLanguage = document.documentElement.lang;
	this.#pageOppLangUrl = this.#getOppositeLangLocation();
	this.#submissionPage = document.location.href;
	this.#institution = this.#getInstitutionName();
	
  }
  
  componentWillLoad() {
	
	// Get the current page metadata
	this.#getPageMetadata();
	
	// Listen on history push (To test, run this in the browser console > history.pushState({},"", "page-feedback.html")
	this.#historyPushNative = history.pushState;
	history.pushState = this.#historyPush;

	// Check if we need to load an external feedback form
    this.feedbackForm && this.validateFeedbackForm();
	this.action && this.validateActionUrl();
  }
  

  
  // Step of this page feedback form
  #stepPFT = { 
	introQuestion: 0,
	customFeedback: 1,
	confirmation: 2
  };
  
  /**
   * Define the current view of rendered component
   *
   */
  @State() currentStep: number = this.#stepPFT.introQuestion;
  
  
  stepFoundLookingFor( ev ) {
	console.log( "Clicked: stepFoundLookingFor" );
	
	// Workaround because we can't set value on button, neither associate the internal button with the web form.
	const formHiddenInput = document.createElement('input');
	formHiddenInput.type = "hidden";
	formHiddenInput.name = "helpful";
	formHiddenInput.value = "Yes-Oui";
	
	ev.target.parentElement.appendChild( formHiddenInput );
	
	const data = new URLSearchParams( new FormData( formHiddenInput.form ) as any );
	
	// Send the feedback, the response don't really matter, we always show a successful message
	fetch( formHiddenInput.form.action, {
	  method: formHiddenInput.form.method || 'post',
	  body: data
	}).then( () => {
	  
	  // Remove it to not have duplicate in SPA application
	  formHiddenInput.remove();
	});
	
	this.currentStep = this.#stepPFT.confirmation;
  }
  
  stepNotFoundLookingFor( ev ) {
	this.currentStep = this.#stepPFT.customFeedback;
  }
  
  stepSendFeedback( ev ) {
	
	const parentElementTarget = ev.target.parentElement;
	//const slotDetails = this.el.querySelector( '[slot=details]' );
	const slotDetails = this.el.querySelector( '[slot=feedback-form]' );
	
	console.log( slotDetails );

	// Check if the custom field are valid
	let invalidFields, validFields;
	if ( this.submissionURL && slotDetails ) {
	//if ( slotDetails ) {
	  invalidFields = slotDetails.querySelectorAll( ':invalid' );
	  validFields = slotDetails.querySelectorAll( ':valid' );

	  
	  // Before to continue, we need to check the validation state of every GCDS field that do have a validate method.
	  let validationPromises = [];
	  let gcdsInputsValidation = [];
	  for( let i = 0; i !== validFields.length; i++ ) {
		const inputField = validFields[ i ];
		if ( inputField.nodeName.startsWith( "GCDS-" ) && inputField.validate ) {
		  validationPromises.push( inputField.validate() );
		  gcdsInputsValidation.push( inputField );
		}
	  }
	  
	  if ( !validationPromises.length ) {

		// Continue the process
		this.sendFeedbackFieldValidated( parentElementTarget, validFields, invalidFields );
	  }
	  
	  Promise.allSettled( validationPromises )
		.then( (results) => {
		  
		  // Ensure that all Promise was fulfilled
		  for( let i = 0; i !== results.length; i++ ) {
			const resultPromise = results[ i ];
			
			// Move the focus on the first rejected
			if ( resultPromise.status === 'rejected' ) {
			  gcdsInputsValidation[ i ].focus();
			  return;
			}
		  }
		  
		  // GCDS validation pass, let continue
		  this.sendFeedbackFieldValidated( parentElementTarget, validFields, invalidFields );
		  
		});
	  
	} else {
	
	  this.sendFeedbackFieldValidated( parentElementTarget, validFields, invalidFields );
	}
  }
  
  sendFeedbackFieldValidated( parentElementTarget, validFields, invalidFields ) {
  
	console.log( "CONTINUED --- Clicked: stepSendFeedback" );
  
	// Check if there is any native input field that are invalid.
	if ( invalidFields && invalidFields.length ) {
	  
	  // Only check the first one.
	  const field  = invalidFields[ 0 ] as HTMLInputElement;
	  field.reportValidity();
	  
	  // The user has been advised of the error by the browser
	  return;
	}
	
	// Workaround because we can't set value on button, neither associate the internal button with the web form.
	const formHiddenInput = document.createElement('input');
	formHiddenInput.type = "hidden";
	formHiddenInput.name = "helpful";
	formHiddenInput.value = "No-Non";

	parentElementTarget.appendChild( formHiddenInput );

	// URL Encode the form data
	const data = new URLSearchParams( new FormData( formHiddenInput.form ) as any );
	
	// Check and add name/value of additional web form elements
	if ( validFields && validFields.length ) {
	  for( let i = 0; i !== validFields.length; i++ ) {
		const inputField = validFields[ i ];
		data.append( inputField.name, inputField.value );
	  }
	}
	
	// Send the feedback, the response don't really matter, we always show a successful message
	fetch( formHiddenInput.form.action, {
	  method: formHiddenInput.form.method || 'post',
	  body: data
	}).then( () => {
	  
	  // Remove it to not have duplicate in SPA application
	  formHiddenInput.remove();
	  
	  this.#restoreFeedbackForm();
	});
	
	// Change the step
	this.currentStep = this.#stepPFT.confirmation;
  }
  
  
  // Reset the custom form if applicable because those field are not hard linked with the form
  #restoreFeedbackForm() {
	if ( this.#feedbackFormFragment.childElementCount > 0 ) {
	  const slotFeedbackForm = this.el.querySelector( '[slot=feedback-form]' );
	  slotFeedbackForm.remove();
	  this.el.append( this.#feedbackFormFragment );
	}
  }


  // Reset the PFT state
  resetPFT( ev ) {
	this.#restoreFeedbackForm();
	this.currentStep = this.#stepPFT.introQuestion;
  }
  

  private get renderFormFeedback() {
	const lang = this.lang;
	
	
	//1- Clone le "div/slot" (Afin de restauré plus tard)
	//2-
	
	
	
	// Reset the feedback form
	// Load from cache
	// Check if the lightdom has changed
	
	const slotFeedbackForm = this.el.querySelector( '[slot=feedback-form]' ) as HTMLElement;
	const customAction = this.submissionURL;
	
	if ( slotFeedbackForm && customAction ) {
	  
	  // Reset our internal document fragment
	  if ( this.#feedbackFormFragment.childElementCount > 0 ) {
		this.#feedbackFormFragment = new DocumentFragment();
	  }
	  
	  // Keep a copy of the current Feedback form to restore on page navigation
	  this.#feedbackFormFragment.append( slotFeedbackForm.cloneNode( true ) );
	  
	  // Return the slot
	  return <slot name="feedback-form"></slot>;
	
	} /*else if ( this.action && this.el.querySelector( '[slot=details]' ) ) {

	  // Leverage the form inside the slot
	  return <slot name="details"></slot>;
	} else if ( this.el.querySelector( '[slot=feedback-form]' ) ) {

	  // Leverage a master feedback form
	  return <slot name="feedback-form"></slot>;

	} */else {
	  
	  // Default feedback form
	  return (
		<gcds-textarea
		  textareaId="gc-pft-prblm"
		  label={i18n[lang]['details']}
		  name="details"
		  hint={i18n[lang]['detailsHint']}
		  character-count="300"
		>
		</gcds-textarea>
	  );
	}
	// TODO: Add a function to fetch the form externally
  }
  
  private get renderContact() {
	const { lang, contactLink, contact } = this;
	
	if ( contact && contactLink ) {
	  return (
		<gcds-details detailsTitle={i18n[lang]['urgentHelp']}>
		  <gcds-link href={ contactLink }>{ contact }</gcds-link>
		</gcds-details>
	  );
	} else {
	  return null;
	}
  }
  

  render() {
    const { lang, theme, section, notInPageDetailSection } =
      this,
	  isConfirmedStep = this.currentStep === this.#stepPFT.confirmation;

    return (
      <Host>
		<section> {/* to be removed and replaced by 'tag=section' in the gcds-container when alert styling is fixed */}
        <gcds-container class={`
			gcds-page-feedback
		    ${ isConfirmedStep ? 'confirmed' : '' }
		  `}
		  tag="div" 
		  padding={ !isConfirmedStep ? '300' : null }
		  size="sm"
		>
		  <gcds-sr-only tag={!notInPageDetailSection ? 'h3' : 'h2'}>
			{i18n[lang]['heading']}
		  </gcds-sr-only>

		  <form 
			id={ this.action ? 'pft' + this.action : null }
			action={ !this.submissionURL ? 'http://localhost:3333/submit': this.submissionURL }
			data-action="https://feedback-retroaction.canada.ca/api/QueueProblemForm" method="post">
			
			{/* Hidden field*/}
			<input type="hidden" name="pageTitle" value={this.#pageTitle} />
			<input type="hidden" name="language" value={this.#pageLanguage} />
			<input type="hidden" name="submissionPage" value={this.#submissionPage} />
			<input type="hidden" name="oppositelang" value={this.#pageOppLangUrl} />
			<input type="hidden" name="themeopt" value={theme} />
			<input type="hidden" name="sectionopt" value={section} />
			<input type="hidden" name="institutionopt" value={this.#institution} />
			
			{/* Step 1 - Seek feedback */}
			<gcds-fieldset
			  class={`
			    page-feedback__intro
				${this.currentStep !== this.#stepPFT.introQuestion ? 'd-none': ''}
			  `}
			  fieldsetId="gcds-pft-question"
			  legend={i18n[lang]['headline']}
			>
			  <div class="page-feedback__btn-group">
				<gcds-button size="small" onGcdsClick={ev => this.stepFoundLookingFor(ev)}>{i18n[lang]['yes']}</gcds-button>
				<gcds-button size="small" onGcdsClick={ev => this.stepNotFoundLookingFor(ev)}>{i18n[lang]['no']}</gcds-button>
			  </div>
			</gcds-fieldset>


			
			{/* Step 2 - Get feedback */}
			  <div
				class={`
				  page-feedback__get-feedback
				  ${this.currentStep !== this.#stepPFT.customFeedback ? 'd-none': ''}
			  `}>
				
				{ this.currentStep === this.#stepPFT.customFeedback ? (
				    <gcds-sr-only role="status">{i18n[lang]['tellUs']}</gcds-sr-only>
				 ) : null }
				
				{ this.renderContact }
				
				<div class="page-feedback__details">
				  {/* Reset the feedback field when submission completed*/}
				  {/* !isConfirmedStep ? ( this.renderDescription ) : null */ }
				  { this.currentStep === this.#stepPFT.customFeedback ? ( this.renderFormFeedback ) : null }
				</div>
			  
				<gcds-button onGcdsClick={ev => this.stepSendFeedback(ev)}>{i18n[lang]['submit']}</gcds-button>

			  </div>
 		  </form>

        </gcds-container>
		  {/* Step 3 - Confirmation feedback submitted */}
		  {/* Note: this alert is outside the gcds-container because of a styling conflict. When the style conflict is resolved, the explicit section can be removed and the gcds-container tag can be a section
		  */}
		  { isConfirmedStep ? (
			<div class="page-feedback__confirmation">
		      <gcds-alert
			    alertRole="success"
			    heading="Submitted"
				container="sm"
				isFixed
		      >
			    <p>{i18n[lang]['thanks']}</p>
		      </gcds-alert>		
			</div>
		  ) : null }
		  </section>
		  {/*
			The following elements are only for development support, those need to be removed
		  */}
		   <hr />
		  <gcds-button onGcdsClick={ev => this.resetPFT(ev)}>RESET PFT</gcds-button>
      </Host>
    );
  }
}
