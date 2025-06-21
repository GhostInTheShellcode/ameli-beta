//Permet d'activer le bouton de connexion
function enableBoutonConnect() {
	if(!document.getElementById('numOTP1').value
			|| !document.getElementById('numOTP2').value
			|| !document.getElementById('numOTP3').value
			|| !document.getElementById('numOTP4').value
			|| !document.getElementById('numOTP5').value
			|| !document.getElementById('numOTP6').value) {
		$('id_r_cnx_btn_submit').disabled = true;
	} else {
		$('id_r_cnx_btn_submit').disabled = false;  
	}
}


//Des qu'une valeur est entree dans un champ OTP, on verifie si on doit activer le bouton de connexion
//et si la valeur est autorisee
function saisieAuthentOTP(event, current) {
	Autotab(current, "numOTP", event);
}

//Gestion de la saisie du code OTP
//-> gestion des touches clavier
//-> passage d'un input au suivant ou precedent
function Autotab(current, name, evenement) {
	if(evenement != undefined){
		var touche = window.event ? evenement.keyCode : evenement.which;
		var reg = new RegExp('^[0-9]{1}', 'g');
		var next = current + 1;
		var previous = current - 1;
		//Si l'assure clique sur retour
		if (touche == 8){
			if(current!=1){
				document.getElementById(name+previous).focus();
				document.getElementById(name+previous).value=document.getElementById(name+previous).value;
				document.getElementById(name+previous).select();
			}
		} else {
			//Si l'assure clique sur la fleche droite et que la case actuelle n'est pas la derniere
			if(touche == 39 && (current!=6)){
				document.getElementById(name+next).focus();
				document.getElementById(name+next).select();
			//Si l'assure clique sur la fleche gauche
			} else if(touche == 37){
				//et qu'il n'est pas sur la premiere case
				if(current!=1){
					//On passe au champ suivant
					document.getElementById(name+previous).focus();
					document.getElementById(name+previous).select();
				}else{
					//On reste oe on est
					document.getElementById(name+current).select();
				}
			//Si l'assure clique sur la tabulation 
			} else if (touche == 9){
				document.getElementById(name+current).select();
			//Si l'assure n'a pas clique sur maj on fait le traitement par rapport au contenu la case actuelle
			} else if(touche != 16 && touche != 20){ 
				if (current != 6){
					// on va sur le prochain champ
					document.getElementById(name+next).focus();
					document.getElementById(name+next).select();
				}else{
					// on reste sur le champ actuel
					document.getElementById(name+current).focus();
				}
			}
		}
	}
}

//Methode pour le split de l'OTP si l'assure fait un coller dans la premiere case
function splitOTP(current){
	var contenu = document.getElementById('numOTP'+current).value;
	if(contenu.length > 1){
		//remplissage des autre champs selon la valeur du champ
		for (var i=0; (i<6 && i<contenu.length); i++) {
			var next = current + i;
			if(next<7){
				document.getElementById('numOTP'+next).value = contenu.charAt(i);
				document.getElementById('numOTP'+next).focus();
			}				
		}
	}
}

//Cache la partie pour envoyer un OTP et affiche la partie pour saisir l'OTP
function modifierAffichageOTP(etape) {
	if(etape == "ENVOI_OTP") {
		document.getElementById('authStep').value="ENVOI_OTP";
	}
}