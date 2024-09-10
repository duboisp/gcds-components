import { Component, Element, Host, Watch, Prop, State, h, Listen } from '@stencil/core';
import { assignLanguage, observerConfig } from '../../utils/utils';
import i18n from './i18n/i18n';

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

  /**
   * Sets the main style of the text.
   */
  @Prop({ mutable: true }) textRole?: 'light' | 'primary' | 'secondary' =
    'primary';

  @Watch('textRole')
  validateTextRole(newValue: string) {
    const values = ['light', 'primary', 'secondary'];

    if (!values.includes(newValue)) {
      this.textRole = 'primary';
    }
  }

  /**
   * Sets the line length to a maximum amount of characters per line to ensure a comfortable, accessible reading length.
   */
  @Prop() characterLimit?: boolean = true;

  /**
   * Specifies the display behaviour of the text.
   */
  @Prop({ mutable: true }) display?:
    | 'block'
    | 'flex'
    | 'inline'
    | 'inline-block'
    | 'inline-flex'
    | 'none' = 'block';

  @Watch('display')
  validateDisplay(newValue: string) {
    const values = [
      'block',
      'flex',
      'inline',
      'inline-block',
      'inline-flex',
      'none',
    ];

    if (!values.includes(newValue)) {
      this.display = 'block';
    }
  }

  /**
   * Adds margin above the text.
   */
  @Prop({ mutable: true }) marginTop?:
    | '0'
    | '50'
    | '100'
    | '150'
    | '200'
    | '250'
    | '300'
    | '400'
    | '450'
    | '500'
    | '550'
    | '600'
    | '700'
    | '800'
    | '900'
    | '1000' = '0';

  @Watch('marginTop')
  validateMarginTop(newValue: string) {
    const values = [
      '0',
      '50',
      '100',
      '150',
      '200',
      '250',
      '300',
      '400',
      '450',
      '500',
      '550',
      '600',
      '700',
      '800',
      '900',
      '1000',
    ];

    if (!values.includes(newValue)) {
      this.marginTop = '0';
    }
  }

  /**
   * Adds margin below the text.
   */
  @Prop({ mutable: true }) marginBottom?:
    | '0'
    | '50'
    | '100'
    | '150'
    | '200'
    | '250'
    | '300'
    | '400'
    | '450'
    | '500'
    | '550'
    | '600'
    | '700'
    | '800'
    | '900'
    | '1000' = '400';

  @Watch('marginBottom')
  validateMarginBottom(newValue: string) {
    const values = [
      '0',
      '50',
      '100',
      '150',
      '200',
      '250',
      '300',
      '400',
      '450',
      '500',
      '550',
      '600',
      '700',
      '800',
      '900',
      '1000',
    ];

    if (!values.includes(newValue)) {
      this.marginBottom = '400';
    }
  }

  /**
   * Sets the appropriate HTML tags for the selected size.
   */
  @Prop({ mutable: true }) size?: 'body' | 'caption' = 'body';

  @Watch('size')
  validateSize(newValue: string) {
    const values = ['body', 'caption'];

    if (!values.includes(newValue)) {
      this.size = 'body';
    }
  }

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
  
	this.#getPageMetadata();
	
	
    // Validate attributes and set defaults
    this.validateTextRole(this.textRole);
    this.validateDisplay(this.display);
    this.validateMarginTop(this.marginTop);
    this.validateMarginBottom(this.marginBottom);
    this.validateSize(this.size);
	
	console.log( this.el );
	this.el.dataset.aaaYep = "abc123";
	
	// Listen on history push
	this.#historyPushNative = history.pushState;
	history.pushState = this.#historyPush;
	
    
/*	const self = this;
	window.addEventListener("popstate", (event) => {
	  console.log( "POP state" );
	  self.currentStep = self.#stepPFT.introQuestion;
	});*/
	
	// Get page properties
	/*
	 * pageTitle
	 * language
	 * submissionPage
	 * oppositelang
	 * themeopt
	 * sectionopt
	 * institutionopt
	 
	 helpful = "Yes-Oui" | "No-Non"
	 details => Text Area
	*/
	
	// Need to check the preceding heading, if in a page-detail section, use h3, otherwise h2.
	
	// Bind to popstate event -> Recalculate the required prop
	
  }
  
  
  /*
	TODO:
	
	* Set the i18n language variable
	* Fix the behavioural of this feature
	* Adjust the CSS to get it rendered as expected
  */
  
  
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
	
	console.log( ev );
	console.log( this );

	// Workaround because we can't set value on button, neither associate the internal button with the web form.
	const formHiddenInput = document.createElement('input');
	formHiddenInput.type = "hidden";
	formHiddenInput.name = "helpful";
	formHiddenInput.value = "Yes-Oui";
	
	ev.target.parentElement.appendChild( formHiddenInput );
	console.log( "Form to be submitted" );
	console.log( formHiddenInput.form );
	
	const data = new URLSearchParams( new FormData( formHiddenInput.form ) as any ); //"abc&dce" );
	
	console.log( data );
	
	// Send the feedback, the response don't really matter, we always show a successful message
	fetch( formHiddenInput.form.action, {
	  method: formHiddenInput.form.method || 'post',
	  body: data
	});
	
	this.currentStep = this.#stepPFT.confirmation;
  }
  
  stepNotFoundLookingFor( ev ) {
	console.log( "Clicked: stepNotFoundLookingFor" );
	console.log( ev );
	
	
	this.currentStep = this.#stepPFT.customFeedback;
  }
  
  stepSendFeedback( ev ) {
	console.log( "Clicked: stepSendFeedback" );
	
	// Workaround because we can't set value on button, neither associate the internal button with the web form.
	const formHiddenInput = document.createElement('input');
	formHiddenInput.type = "hidden";
	formHiddenInput.name = "helpful";
	formHiddenInput.value = "No-Non";
	
	ev.target.parentElement.appendChild( formHiddenInput );
	
	const data = new URLSearchParams( new FormData( formHiddenInput.form ) as any ); //"abc&dce" );
	
	console.log( data );
	console.log( formHiddenInput.form.elements );
	
	// Send the feedback, the response don't really matter, we always show a successful message
	fetch( formHiddenInput.form.action, {
	  method: formHiddenInput.form.method || 'post',
	  body: data
	});
	
	this.currentStep = this.#stepPFT.confirmation;
  }
  
  resetPFT( ev ) {
	this.currentStep = this.#stepPFT.introQuestion;
  }
  

  private get renderDescription() {
	const lang = this.lang;
	if ( !this.el.querySelector( '[slot=details]' ) ) {
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
	} else {
	  return <slot name="details"></slot>;
	}
  }
  
  private get renderContact() {
	// if( Contact Name + Contact URL )
	const lang = this.lang;
	return (
	  <gcds-details detailsTitle={i18n[lang]['urgentHelp']}>
		<gcds-link href="#link">ABC corp</gcds-link>
	  </gcds-details>
	);
  }
  

  render() {
    const { lang, theme, section } =
      this;

    return (
      <Host>
        <section class={`
			gcds-page-feedback
		    ${ this.currentStep === this.#stepPFT.confirmation ? 'confirmed' : '' }
		  `}
		>
		  <gcds-sr-only tag="h3">
			{i18n[lang]['heading']}
		  </gcds-sr-only>

		  <form action="http://localhost:3333/submit" data-action="https://feedback-retroaction.canada.ca/api/QueueProblemForm" method="post">
			
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
				<gcds-sr-only role="status">{i18n[lang]['tellUs']}</gcds-sr-only>
				
				{this.renderContact}
				
				<div class="page-feedback__details">
				  {/* Reset the feedback field when submission completed*/}
				  { this.currentStep !== this.#stepPFT.confirmation ? ( this.renderDescription ) : null }
				</div>
			  
				<gcds-button onGcdsClick={ev => this.stepSendFeedback(ev)}>{i18n[lang]['submit']}</gcds-button>

			  </div>
 		  </form>

		  {/* Step 3 - Confirmation feedback submitted */}
		  {/* Note: the alert is not rendering properly, some config change is required 

			The right side of the PFT should be reserved for future use, like for adding an assistance function like a chat open button. So the alert can't be full width.
		  */}
		  { this.currentStep === this.#stepPFT.confirmation ? (
			<div 
			  class="page-feedback__confirmation"
			  role="status">
		      <gcds-alert
			    alertRole="success"
			    heading="Submitted"
		      >
			    <p>{i18n[lang]['thanks']}</p>
		      </gcds-alert>		
			</div>
		  ) : null }
		  {/*
		  */}
        </section>
		   <hr />
		  <gcds-button onGcdsClick={ev => this.resetPFT(ev)}>RESET PFT</gcds-button>
      </Host>
    );
  }
}
