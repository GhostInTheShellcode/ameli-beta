/**
 * Si l'assure refuse le tracking contentSquare 
 */
function refuserConsentement() {
	window._uxa = window._uxa || [];
	creerCookieConsent("non");
	supprimerBandeauConsentement();
}

/**
 * Si l'assure accepte le tracking contentSquare 
 */
function accepterConsentement() {
	window._uxa = window._uxa || [];
	creerCookieConsent("oui");
	ajouterTagWebAnalyse();
	supprimerBandeauConsentement();
}

function creerCookieConsent(consentement) {
	document.cookie = "analyse_consent=" + consentement + "; domain=ameli.fr; path=/; Secure=false; SameSite=Lax";
}

/**
 * Pour supprimer le bandeau de consentement
 */
function supprimerBandeauConsentement() {
	document.getElementById('bandeauConsentement').style.display = 'none';
	document.getElementById('pageConsentement').style.display = 'none';
}

/*
 * Ajouter le tag principal du content dans la page
 * pCheminScriptWA : emplacement du script Contentsquare
 * pEtape : soit nom de l'étape au sein d'une démarche ayant une URL statique soit UNDEFINED
 */
function ajouterTagWebAnalyse(){
	//Verification si webanalyse est active et si le cookie consentement est present
	if(doitIntegrerTagWebAnalyse()){
	   var mt = document.createElement("script");
	   mt.type = "text/javascript";
	   mt.async = true;	  
	   mt.src = '//t.contentsquare.net/uxa/205f1557f1f81.js';
	 
	   // ajouter des options
	   window._uxa = window._uxa || [];
	   
	   // Calcul de l'etape pour webanalyse
	   //On enregistre a quelle etape d'authentification on est
	   var etapeAuthent = "CONNEXION_SIMPLE";
	   if(document.getElementById('authStep').value === "OTP_NECESSAIRE") {
	 	  etapeAuthent = "OTP_NECESSAIRE";
	   } else if(document.getElementById('authStep').value === "NOUVEL_OTP") {
	 	  etapeAuthent = "NOUVEL_OTP";
	   } else if(document.getElementById('authStep').value === "SAISIE_OTP") {
	 	  etapeAuthent = "SAISIE_OTP";
	   } else if(document.getElementById('authStep').value === "KO_CONNEXION_SIMPLE") {
	 	  etapeAuthent = "KO_CONNEXION_SIMPLE";
	   } else if(document.getElementById('authStep').value === "KO_SAISIE_OTP") {
	 	  etapeAuthent = "KO_SAISIE_OTP";
	   } else if(document.getElementById('authStep').value === "KO_DEMANDE_OTP") {
	 	  etapeAuthent = "KO_DEMANDE_OTP";
	   } else if(document.getElementById('authStep').value === "KO_SAISIE_MDP") {
	 	  etapeAuthent = "KO_SAISIE_MDP";
	   }
	   window._uxa.push(['setCustomVariable', 1, "nom_etape", etapeAuthent, "nextPageOnly"]);		   
	   
	   // intégration au dom
	   document.getElementsByTagName("head")[0].appendChild(mt);
	}
}

/*
 * Vérifier si l'on doit intégrer le tag web analyse
 */
function doitIntegrerTagWebAnalyse(){
	if(true === true){
		var valCookieConsentement = getValCookie("analyse_consent");		
		if (valCookieConsentement.startsWith("oui")){
			return true;
		}
	}
	return false;
}

/*
 * Vérifier si l'on doit afficher le bandeau de recueil de consentement
 * pNomCookieConsentement : nom du cookie Cnam pour la gestion du consentement
 */
function doitAfficherBandeauConsentement(){
	if(true === true){
		var valCookieConsentement = getValCookie("analyse_consent");
		if (valCookieConsentement === "undefinded" 
				|| valCookieConsentement === "oui_" 
				|| valCookieConsentement === "non_"){
			return true;			
		}
	}
	return false;
}

/*
 * Récuperer la valeur d'un cookie ou 'null' si le cookie n'existe pas
 * pNomCookie : nom du cookie
 */
function getValCookie(pNomCookie) {
    
    var valCookie = "undefinded";
    if(pNomCookie){
    	var nomCookieEQ = pNomCookie + "=";
    	var tab = document.cookie.split(';');
    	for(var i=0;i < tab.length;i++) {
    		var cookie = tab[i];        
    		if(cookie.indexOf(nomCookieEQ) != -1){
    			valCookie = cookie.substring(nomCookieEQ.length + cookie.indexOf(nomCookieEQ), cookie.length);
    			return valCookie;
    		}
    	}    	
    }
	return valCookie;
}
