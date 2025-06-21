window.addEventListener('DOMContentLoaded', initAmeliConnect, false);

function initAmeliConnect() {

    // Init de l'objet contenant les messages d'erreur serveur (format key = champ.id, value = errMsg)
  var errors = {};
  errors['connexioncompte_2nir_as'] = {
    length: 'Votre numéro de Sécurité sociale ne peut pas être inférieur à 13 chiffres.',
    pattern: 'Votre numéro de Sécurité sociale doit contenir des chiffres, A ou B. Veuillez recommencer.'
  };
  errors['connexioncompte_2date_naissance'] = {
    pattern: "La date n'a pas un format correct (jj/mm/aaaa).",
    anterieur: 'La date de naissance doit être inférieure à la date du jour.'
  };
  
  //Script contentSquare balise principale
  ajouterTagWebAnalyse();
  
  //Verification si le consentement existe, sinon on le demande
  if(doitAfficherBandeauConsentement()) {
	  //Cookie de consentement non existant donc on demande le consentement
	  document.getElementById('bandeauConsentement').style.display = 'block';
	  document.getElementById('pageConsentement').style.display = 'block';
  }
	  
  function changePlaceholderCode() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      document.getElementById('connexioncompte_2connexion_code').placeholder = 'Mon mot de passe';
    }
  }

  function enableBouton() {
    if (controlNir(document.getElementById('connexioncompte_2nir_as'), errors['connexioncompte_2nir_as'], true, true) === false &&
            $('connexioncompte_2connexion_code').value !== '') {
      if (document.getElementById('connexioncompte_2date_naissance') !== null) {
        if (controlDateNaissance(document.getElementById('connexioncompte_2date_naissance'), errors['connexioncompte_2date_naissance'], true) === false)
          $('id_r_cnx_btn_submit').disabled = false;
        else
          $('id_r_cnx_btn_submit').disabled = true;
      } else {
    	  if(document.getElementById('authStep').value == 'SAISIE_OTP' &&
    			  (!document.getElementById('numOTP1').value
    				|| !document.getElementById('numOTP2').value
    				|| !document.getElementById('numOTP3').value
    				|| !document.getElementById('numOTP4').value
    				|| !document.getElementById('numOTP5').value
    				|| !document.getElementById('numOTP6').value)) {
    		  $('id_r_cnx_btn_submit').disabled = true;
    	  } else {
    		  $('id_r_cnx_btn_submit').disabled = false;  
    	  }
      }
    } else
      $('id_r_cnx_btn_submit').disabled = true;

  }

  function addNirToParameters(attrName) {

    var nirElmt = $('connexioncompte_2nir_as');
    var linkElmt = $('problemeConnexion');
    var href = linkElmt.getAttribute('href');
    var hrefAttrIndex = href.indexOf('&' + attrName);

    if (hrefAttrIndex >= 0 || (nirElmt.value.length < 18 && hrefAttrIndex >= 0)) {
      href = href.slice(0, hrefAttrIndex);
      linkElmt.setAttribute('href', href);
    }

    if (nirElmt.value.length === 18) {

      href += '&' + attrName + '=' + nirElmt.value;
      linkElmt.setAttribute('href', href);
    }

  }

  function isIEVersionOK() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf('MSIE');

        // If IE < 11 return false
    if (Idx > 0)
      return false;

        // If IE 11 then look for Updated user agent string.
        else if (!!navigator.userAgent.match(/Trident\/7\./))
          return true;

        else
          return true; //It is not IE
  }

  function showHideAideSaisieNir() {
    if ($('divAideSaisieNir').hasClass('hidden'))
      effect.tweenShow($('divAideSaisieNir'));
    else
      effect.tweenHide($('divAideSaisieNir'));
  }

  function hideAideSaisieNir() {
    effect.tweenHide($('divAideSaisieNir'));
  }

  function showMaintenanceMessageIfNeedeed() {
    var dateDebutS = '13/05/2025';
    var dateFinS = '14/05/2025';
    var maintenanceMessage = '<div>Le mardi 13 mai, pour des raisons de maintenance technique, les services li&eacute;s &agrave; la carte Vitale et le changement de coordonn&eacute;es bancaires seront temporairement inaccessibles. Merci de votre compr&eacute;hension.</div>';
    var dateDebut = new Date(dateDebutS.slice(6), dateDebutS.slice(3, 5) - 1, dateDebutS.slice(0, 2));
    var dateFin = new Date(dateFinS.slice(6), dateFinS.slice(3, 5) - 1, dateFinS.slice(0, 2));

    var date = new Date();

    if(dateDebut !== '' && dateFin !== '' && maintenanceMessage !== '' && dateDebut <= date && date < dateFin) {
      //premier div pour affichage du !
      var element1 = new Element('div');
      element1.innerHTML = maintenanceMessage;
      //div maintenance
      var element2 = new Element('div',  {class: 'r_cnx_maintenance'});
      element2.grab(element1);
      $('loginPage').getFirst('div').grab(element2, 'top');
    }
  }

  window.addEvent('domready', function(event) {
    changePlaceholderCode();
    window.onresize = changePlaceholderCode;
    formatterNIRWithEspace('connexioncompte_2nir_as', event);
    enableBouton();
    addNirToParameters('demandCodeConfidentiel_3numSecuriteSociale');
    showMaintenanceMessageIfNeedeed();
    if (!isIEVersionOK()) { //si IE >= 11
      $(navIncompatible).removeClass('hidden');
      $('id_r_cnx_btn_submit').disabled = false;
    }
    if (navigator.cookieEnabled == 0) {
    	$(cookieDesactive).removeClass('hidden');
        $('id_r_cnx_btn_submit').disabled = true;
    	$('connexioncompte_2nir_as').disabled = true;
    	$('connexioncompte_2connexion_code').disabled = true;
    } 

    var formatted = new Formatter(document.getElementById('connexioncompte_2nir_as'), {
      'pattern': '{~9~} {~99~} {~99~} {~9*~} {~999~} {~999~}'
    });

    $('connexioncompte_2nir_as').focus();
  });

  $('connexioncompte_2nir_as').addEvent('input', function(event) {
    addNirToParameters('demandCodeConfidentiel_3numSecuriteSociale');
    enableBouton();
  });

  $('iconeToggleCode').addEvent('keydown', function(event) {
    var TOUCHE_ESPACE = 32;
    var TOUCHE_ENTER = 13;
    if (event.event.keyCode === TOUCHE_ESPACE || event.event.keyCode === TOUCHE_ENTER) {
      afficherMotDePasse($('connexioncompte_2connexion_code'), this, 'Masquer le code', 'Afficher le code');
    }
  });

  $('connexioncompte_2nir_as').addEvent('blur', function(event) {
    enableBouton();
    controlNir(this, errors['connexioncompte_2nir_as'], false);
  });

  $('connexioncompte_2connexion_code').addEvent('input', function(event) {
    enableBouton();

  });
  $('connexioncompte_2connexion_code').addEvent('blur', function(event) {
    enableBouton();

  });
  
}
