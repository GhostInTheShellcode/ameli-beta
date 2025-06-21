/**************************/
/* VALIDATIONS AVANCEES   */
/**************************/

/**
 * Conditions d'utilisation :
 *
 *   - les elements (= champs input) ajout�s dans le CnamValidator
 *     doivent �tre entour�s d'un tag cnam:champ (dans la jsp) pour fonctionner
 */


/**
 *
 * Exemple d'utilisation :
 *
	// Creation d'un validator global
	var validator = null;

	// Attendre que les elements du DOM soient charges
	window.addEvent('DOMContentLoaded', function() {

		// Instanciation du validator
		validator = new CnamValidator(

			// Ensemble des controls a effectuer
			[{
				// L'element a controler
				element: $("${portletContext}input1"),

				// Identifier unique
				name: "input1",

				// Ensemble des validators a appliquer a l'element
				validators: [
					{validatorType: VALIDATOR_TYPE.DATE, validatorArgs: {format: 'regex...', dateMini: '12/02/2013'}, message: {format: 'DATEFORMAT_BLABLABLA', dateMini: 'DATEMINI_BLBALBAL'}},
					{validatorType: VALIDATOR_TYPE.MIN_LENGTH, validatorArgs: 3, message: 'MINLENGTH_BLABLABLA'},
					{validatorType: VALIDATOR_TYPE.MAX_LENGTH, validatorArgs: 10, message: 'MAXLENGTH_BLABLABLA'}
				]
			}, {

				// Un autre element a controller
				element: $("${portletContext}input2"),

				// Autre identifier
				name: "input2",

				// Ensemble des validators a appliquer a l'element
				validators: [
					{validatorType: VALIDATOR_TYPE.MIN_LENGTH, validatorArgs: 3, message: 'MINLENGTH_BLABLABLA'},
					{validatorType: VALIDATOR_TYPE.MAX_LENGTH, validatorArgs: 10, message: 'MAXLENGTH_BLABLABLA'}
				]
			}, {

				// Un autre element a controller
				element: [$("${portletContext}checkbox1"), $("${portletContext}checkbox2")],

				// Autre identifier
				name: "checkboxes",
				
				evenement: "input",

				// Ensemble des validators a appliquer a l'element
				validators: [
					{validatorType: VALIDATOR_TYPE.MIN_CHECKBOX_ELEMENTS, validatorArgs: 1, message: 'cochez une box'},
				]
			}], 

			// Le bouton submit
			$("${portletContext}id_r_cnx_btn_submit")
		);
	});
 *
 *
 */

/**
 * Enumeration des types de validation implementees 
 *
 * Pour ajouter une nouvelle validation:
 *   - Ajouter le nouveau type dans l'enum ci-dessous
 *   - Ajouter la gestion de ce nouveau type dans Validator.getValidationError
 */
var VALIDATOR_TYPE = Object.freeze({
	FUNCTION:				'function',     // validatorArgs: function() { return true (erreur de validation) || false (pas d'erreur) }
	MIN_LENGTH: 			'min_length',
	MAX_LENGTH: 			'max_length',
	NIR: 					'nir',
	NIR_ESPACE: 			'nir_espace',
	EMAIL: 					'email',
	MONTANT:				'montant',
	CODE_POSTAL: 			'code_postal',
	DATE: 					'date',
	REGEX:					'regex',
	MIN_CHECKBOX_ELEMENTS:	'min_checkboxes_element', // nbre mini d'elements
	MAX_CHECKBOX_ELEMENTS:	'max_checkboxes_element', // nbre maxi d'elements
	DROPDOWN_LIST:			'liste deroulante'
})

/**
 * La classe CnamValidator accepte en parametres : 
 *     - Control[] controls		 	tous les controls � effectuer.
 *     - HtmlElement submitBtn	 	le bouton submit a activer/desactiver
 *	   - boolean submitEnabled()	une fonction retournant un boolean (permet 
 									d'ajouter des conditions � l'activation du btn)
 */
var CnamValidator = new Class({

	Binds: ['validate', 'enableBouton'],

	initialize: function(controls, submitBtn, submitEnabled) {

		this.controls = controls.map(function(control) {

			var control = new Control(control);
			// On attache la fonction d'activation du bouton
			// sur chaque control, sur l'evenement choisi
			control.element.addEvent(control.evenement, function() {
				this.enableBouton();
			}.bind(this));

			// On attache la fonction de validation du champ
			// sur chaque control, sur l'evenement choisi
			control.element.addEvent(control.evenement, function() {
				this.validate(control.name);
			}.bind(this));

			return control;
		}.bind(this));
		
		this.submitBtn = submitBtn;
		this.submitEnabled = submitEnabled || function() { return true };
		
		// On change l'�tat du bouton au chargement de la page
		this.enableBouton();
	},

	/**
	 * Fonction de validation d'un champ (repere par son identifier unique)
	 */
	validate: function(name) {
		this.controls
		.filter(function(control) {
			return control.name === name
		})
		.map(function(control) {
			return control.validate(true)
		});
	},

	/**
	 * Fonction d'activation du bouton submit
	 */
	enableBouton: function() {

		this.controls.forEach(function(control) { 
			control.validate();
		});
		
		this.controls.filter(function(control) { 
			return control.hasError
		}).length == 0 && this.submitEnabled() ?
			this.submitBtn.disabled = false : 
			this.submitBtn.disabled = true;
	}

});


/**
 * La classe Control accepte en parametres:
 *    - HtmlElement data.element 			l'element mootools a valider
 *    - String 		data.name				le nom du control (identifier unique)
 *    - String      data.evenement			le nom de l'evenement html a �couter (input, blur, keydown, ...)
 *	  - String      data.type				le type de l'�l�ment
 *    - Function	data.champOkCallback	une fonction a executer lorsque le champ est OK.
 *	  - Function	data.champKoCallback	une fonction a executer lorsque le champ est KO.
 *    - Validator[] data.validator 			l'ensemble des validators a appliquer pour l'element
 */
var Control = new Class({

	Binds: ['validate'],

	// data: {element, name, evenement, type, champOkCallback, champKoCallback, validators}
	initialize: function(data) {

		if (!data) {
			data = {};
		}

		this.element = data.element;
		this.evenement = data.evenement || "blur";
		this.name = data.name;
		this.type = data.type;
		this.champOkCallback = data.champOkCallback;
		this.champKoCallback = data.champKoCallback;
		this.validators = data.validators.map(function(validator) {
			return new Validator(validator)
		});
		
		// Boolean permettant de savoir si le control est pass� ou non
		this.hasError = false;
	},

	validate: function(showError) {

		if (!showError) {
			showError = false;
		}

		this.hasError = false;

		if (this.validators instanceof Array) {

			// On r�cup�re ici les messages d'erreur � afficher
			var messages = this.validators
			.map(function(validator) {
			
				// On r�cup�re ici la valeur � valider (element.value dans la plupart des cas)
				if (validator.validatorType === VALIDATOR_TYPE.MIN_CHECKBOX_ELEMENTS || validator.validatorType === VALIDATOR_TYPE.MAX_CHECKBOX_ELEMENTS) {
					// pas de contr�le si tous les �l�ments sont d�sactiv�s
					if (this.element.getElements("input:disabled").length === this.element.getElements("input").length) {
						value = null;
					}
					else {
						value = this.element.getElements("input:checked");
					}
				}
				//R�cup�re la value d'un radio bouton
				else if(this.type == "radioBouton"){
					value = this.element.getElements("input:checked");
				}
				else {
					value = this.element.value;
				}
			
				return validator.getValidationError(value)
			}.bind(this))
			.filter(function(message) {
				return !!message
			});

			if (messages.length > 0) {
				this.hasError = true;
				if (showError) {
					ChampTag.erreurChamp(this.element, messages[0]);
					if (this.champKoCallback) {
						this.champKoCallback();
					}
				}
			} else { 
				this.hasError = false;
				if (showError) {
					ChampTag.champOK(this.element);
					if (this.champOkCallback) {
						this.champOkCallback();
					}
				}
			}

		}

	}

});

/**
 * La classe Validator accepte en parametres:
 *    - VALIDATOR_TYPE data.validatorType	le type de validation (ie: l'enum VALIDATOR_TYPE)
 *    - Any			   data.validatorArgs   le ou les arguments de validation (ex: un entier pour MIN_LENGTH)
 *    - String 		   data.message			le ou les message � afficher en cas d'erreur
 */
var Validator = new Class({

	Binds: ['getValidationError'],

	// data: {validatorType, validatorArgs, message}
	initialize: function(data) {
	
		if (!data) {
			data = {};
		}
		
		this.validatorType = data.validatorType;
		this.validatorArgs = data.validatorArgs;
		this.message = data.message;
	},

	getValidationError: function(value) {

		var message = null;
		
		if (value != null) {
		
			switch (this.validatorType) {
			
				case VALIDATOR_TYPE.FUNCTION:
					if (this.validatorArgs()){
						message = this.message;
					}
					break;
			
				case VALIDATOR_TYPE.MIN_LENGTH:
					if (value.length < this.validatorArgs) {
						message = this.message;
					}
					break;
					
				case VALIDATOR_TYPE.MIN_CHECKBOX_ELEMENTS:
					if (value.length < this.validatorArgs) {
						message = this.message;
					}
					break;
					
				case VALIDATOR_TYPE.MAX_CHECKBOX_ELEMENTS:
					if (value.length > this.validatorArgs) {
						message = this.message;
					}
					break;	
					
				case VALIDATOR_TYPE.MAX_LENGTH:
					if (value.length > this.validatorArgs) {
						message = this.message;
					}
					break;
					
				case VALIDATOR_TYPE.DROPDOWN_LIST:	
					if(value == this.validatorArgs) {
						message = this.message;
					}
					break;
	
				case VALIDATOR_TYPE.NIR_ESPACE:
					value = value.split(' ').join('');
	
				case VALIDATOR_TYPE.NIR:
				case VALIDATOR_TYPE.EMAIL:
				case VALIDATOR_TYPE.CODE_POSTAL:
				case VALIDATOR_TYPE.MONTANT:
					if (value.length > 0 && !new RegExp(this.validatorArgs, "g").test(value)) {
						message = this.message;
					}
					break;
	
				case VALIDATOR_TYPE.DATE:
					var dateMini = new Date(this.validatorArgs.dateMini);
					var dateMaxi = new Date(this.validatorArgs.dateMaxi);
					if (value.length > 0 && !new RegExp(this.validatorArgs, "g").test(value)) {
						return this.message.format;
					}
	
					var saisie = value.split('/');
					var dateSaisie = new Date(saisie[2], saisie[1]-1, saisie[0]);
					if (dateMini && dateSaisie < dateMini) {
						message = this.message.dateMini;
					}
	
					if (dateMaxi && dateSaisie > dateMaxi) {
						message = this.message.dateMaxi;
					}
	
					break;
					
				case VALIDATOR_TYPE.REGEX:
					if(!new RegExp(this.validatorArgs, "g").test(value)) {
						message = this.message;
					}
					break;
					
				default:
					break;
			}
		}

		return message;

	}

});