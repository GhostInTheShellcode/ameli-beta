function removeDefaultValue(c, a, b) {
	if (c.value == a) {
		c.value = "";
		c.className = b;
	}
}
function addDefaultValue(c, a, b) {
	if (c.value == "") {
		c.value = a;
		c.className = b;
	}
}
function changeTextInputColor(c, a, b) {
	for (var i = 0; i < document.forms[0].elements.length; i++) {
		if ((document.forms[0].elements[i].id.indexOf(c) != -1)
				&& ((document.forms[0].elements[i].value == "") || (document.forms[0].elements[i].value == a))) {
			document.forms[0].elements[i].className = b;
			document.forms[0].elements[i].value = a;
		}
	}
}
function setAutoCompleteOff(a) {
	a.setAttribute("autocomplete", "off");
	for (var i = 0; i < a.elements.length; i++) {
		a.elements[i].setAttribute("autocomplete", "off");
	}
}
function Autotab(e, a, h) {
	if (h != undefined) {
		var g = window.event ? h.keyCode : h.which;
		var c = new RegExp("^[0-9]{1}", "g");
		var f = new RegExp("^[0-9aAbB]{1}", "g");
		var b = e + 1;
		var d = e - 1;
		if (g == 8) {
			if (e != 1) {
				document.getElementById(a + d).focus();
				document.getElementById(a + d).value = document
				.getElementById(a + d).value;
				document.getElementById(a + d).select();
			}
			document.getElementById(a + e).style = "border: solid 1px #B75190; background-color: #FFFFFF;";
		} else {
			if (g == 39 && (e != 13)) {
				document.getElementById(a + b).focus();
				document.getElementById(a + b).select();
			} else {
				if (g == 37 && (e != 1)) {
					document.getElementById(a + d).focus();
					document.getElementById(a + d).select();
				} else {
					if ((g == 9)
							&& (document.getElementById(a + e).value != "")) {
						document.getElementById(a + e).select();
					} else {
						if (((document.getElementById(a + e).value != "")
								&& (c
										.test(document.getElementById(a + e).value)) && e != 7)
										|| ((document.getElementById(a + e).value != "")
												&& (f.test(document.getElementById(a
														+ e).value)) && e == 7)) {
							document.getElementById(a + e).style = "border: solid 1px #B75190; background-color: #FFFFFF;";
							if (e != 13) {
								document.getElementById(a + b).focus();
								document.getElementById(a + b).select();
							}
						} else {
							if (document.getElementById(a + e).value != "") {
								document.getElementById(a + e).style = "border: solid 1px #FF0000; background-color: #FFFEDB;";
							}
							document.getElementById(a + e).focus();
						}
					}
				}
			}
		}
	}
}
function moveCursorToFirstEmptyCase(d, a, b) {
	var c = true;
	for (i = 8; i < 14; i++) {
		if (document.getElementById(a + b + i).value != "*") {
			c = false;
		}
	}
	if (c == true) {
		for (var j = 1; j < 14; j++) {
			document.getElementById(a + b + j).value = "";
		}
	}
	if (document.getElementById(a + b + d).value == "") {
		for (i = 1; i < d + 1; i++) {
			if (document.getElementById(a + b + i).value == "") {
				document.getElementById(a + b + i).focus();
				break;
			}
		}
	} else {
		document.getElementById(a + b + d).select();
	}
}
function splitNir(e, a, b) {
	var d = document.getElementById(a + b + e).value;
	if (d.length > 1) {
		for (i = 0; (i < 13 && i < d.length); i++) {
			var c = e + i;
			if (c < 14) {
				document.getElementById(a + b + c).value = d.charAt(i);
				document.getElementById(a + b + c).focus();
			}
		}
	}
}
function setMaxLength(b, a) {
	for (i = 0; i < document.forms[0].elements.length; i++) {
		if (document.forms[0].elements[i].id.indexOf(b) != -1) {
			document.forms[0].elements[i].maxLength = a;
		}
	}
}
function countChar(c, b, a) {
	var h = document.getElementById(c).value;
	var g = new RegExp("\r\n|\n\r", "g");
	var f = new RegExp("\n|\r", "g");
	var d = new RegExp("<br>", "g");
	h = h.replace(g, "<br>");
	h = h.replace(f, "<br>");
	h = h.replace(d, "\r\n");
	if (mb_strlen(h) > a) {
		document.getElementById(c).value = h.substring(0, a);
		document.getElementById(c).scrollTop = document.getElementById(c).scrollHeight;
		return false;
	} else {
		if (b != null) {
			var e = document.getElementById(b);
			e.innerHTML = mb_strlen(h);
		}
	}
}
function mb_strlen(c) {
	var a = 0;
	for (var b = 0; b < c.length; b++) {
		a += c.charCodeAt(b) < 0 || c.charCodeAt(b) > 255 ? 2 : 1
	}
	return a;
}
function desactiveBoutonsTmp(a) {
	var b = function(c) {
		c.preventDefault();
	};
	$(a).getElements(".r_btsubmit, .r_btretour").each(function(c) {
		if (c.get("tag") === "a") {
			c.addEvent("click", b);
			c.addEvent("keypress", b);
			c.addClass("r_disabled");
		} else {
			c.setProperty("disabled", "true");
		}
	});
	setTimeout(function() {
		$(a).getElements(".r_btsubmit, .r_btretour").each(function(c) {
			if (c.get("tag") === "a") {
				c.removeEvent("click", b);
				c.removeEvent("keypress", b);
				c.removeClass("r_disabled");
			} else {
				c.removeProperty("disabled");
			}
		})
	}, 10000)
}
function initCalendarWithNir(m, o, l, d, f) {
	var e = m.value;
	var c = o.value;
	if (c.length == 10) {
		return
	}
	if (e.length == 13 && !f) {
		var h = e.substring(1, 3);
		var g = e.substring(3, 5);
		var b = String(new Date().getFullYear()).substring(2, 4);
		var n;
		if (h < b) {
			n = "20" + h;
		} else {
			n = "19" + h;
		}
		var a = formatterJJMMAAAA(n, g - 1, 1);
		var k = formatterJJMMAAAA(n, g, 0);
		o.set("data-mindate", a);
		o.set("data-maxdate", k);
		o.set("value", a.substring(2, 10));
	} else {
		if (e.length == 18 && f) {
			var h = e.substring(2, 4);
			var g = e.substring(5, 7);
			var b = String(new Date().getFullYear()).substring(2, 4);
			var n;
			if (h < b) {
				n = "20" + h;
			} else {
				n = "19" + h;
			}
			var a = formatterJJMMAAAA(n, g - 1, 1);
			var k = formatterJJMMAAAA(n, g, 0);
			o.set("data-mindate", a);
			o.set("data-maxdate", k);
			o.set("value", a.substring(2, 10));
		} else {
			o.set("data-mindate", l);
			o.set("data-maxdate", d);
		}
	}
}
function formatterNIRWithEspace(a, e) {
	var d = $(a);
	var c = "";
	if (!d) {
		return false;
	}
	d.value = d.value.split(" ").join("");
	for (var b = 0; b < Math.min(d.value.length, 13); b++) {
		if (d.value[b] && d.value[b] != " ") {
			c += d.value[b];
			if (b == 0 || b == 2 || b == 4 || b == 6 || b == 9) {
				c += " ";
			}
		}
	}
	d.value = c;
	setTimeout(function() {
		d.setSelectionRange(d.value.length, d.value.length);
	}, 0)
}
function formatterJJMMAAAA(e, d, c) {
	if (isNaN(e) || isNaN(d) || isNaN(c)) {
		return "";
	}
	var a, g, f;
	if (d > 12) {
		if (c == 0) {
			g = d;
		} else {
			g = d + 1;
		}
		a = "" + c;
		f = "" + e;
	} else {
		var b = new Date(e, d, c);
		g = "" + (b.getMonth() + 1);
		a = "" + b.getDate();
		f = b.getFullYear();
	}
	if (g.length < 2) {
		g = "0" + g;
	}
	if (a.length < 2) {
		a = "0" + a;
	}
	return [ a, g, f ].join("/");
}
function bindClientValidations(c, a) {
	if (typeof a == "undefined" || typeof a.id == "undefined"
		|| typeof a.handler == "undefined" || !Array.isArray(c)) {
		throw new Error(
		"Calling bindClientValidations with wrong parameters ...");
	}
	var b = Object.keys(c);
	b.forEach(function(d) {
		if (typeof c[d] != "undefined") {
			var e = $(d);
			e.addEvent("blur", function(f) {
				c[d](f);
			});
			e.addEvent("input", function(f) {
				a(f);
			})
		}
	})
}
function formatterVersionPortail(b) {
	var a = "";
	if (b && b.match("VU[0-9]{6}X")) {
		a = b.slice(2, 4) + "." + b.slice(4, 6) + "." + b.slice(6, 8);
	} else {
		a = b;
	}
	document.getElementById("numeroVersion").innerHTML = a;
}
function pasteReference(a, g, b, d, m) {
	var e;
	a.preventDefault();
	if (window.clipboardData) {
		e = window.clipboardData.getData("Text");
	} else {
		e = a.clipboardData.getData("text");
	}
	e = e.replace(/\s/g, "");
	var l = e.split("");
	var k = 0;
	for (var index = 1; index < 6; index++) {
		var c = "";
		if (document.getElementById(b + index)) {
			var h = document.getElementById(b + index).maxLength;
			k = k + h;
			for (var nbCaractere = h; nbCaractere > 0; nbCaractere--) {
				if (l[k - nbCaractere]) {
					c = c + l[k - nbCaractere];
					document.getElementById(b + index).value = c;
				}
			}
		}
	}
	var f = new RegExp(d, "g");
	if (!f.test(e)) {
		ChampSaisieTag.erreurChamp($(String(g)), m);
	}
}
function controleSaisieMessage(e, d, b, c, a) {
	var f = document.getElementById(d);
	if ("" != f.value) {
		f.removeClass("error");
		document.getElementById(b).addClass("cnamts-hidden");
	} else {
		f.addClass("error");
		document.getElementById(b).removeClass("cnamts-hidden");
	}
	countChar(d, c, a);
}
function GetIEVersion() {
	var c = -1;
	if (navigator.appName == "Microsoft Internet Explorer") {
		var a = navigator.userAgent;
		var b = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
		if (b.exec(a) != null) {
			c = parseFloat(RegExp.$1);
		}
	} else {
		if (navigator.appName == "Netscape") {
			var a = navigator.userAgent;
			var b = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
			if (b.exec(a) != null) {
				c = parseFloat(RegExp.$1);
			}
		}
	}
	return c;
}
function GetIsInternetExplorer() {
	if (GetIEVersion() > 0) {
		return true;
	} else {
		return false;
	}
};

//Pour ouvrir et fermer l'aide concernant la saisie du nir
function showHideAideSaisieNir() {
	if ($('divAideSaisieNir').hasClass('hidden')) {
		effect.tweenShow($('divAideSaisieNir'));
	}
	else {
		effect.tweenHide($('divAideSaisieNir'));
	}
}

function hideAideSaisieNir() {
	effect.tweenHide($('divAideSaisieNir'));
}

//Pour ouvrir et fermer l'aide concernant la saisie du code de securite (OTP)
function showHideAideSaisieOTP() {
	if ($('divAideSaisieOTP') && $('divAideSaisieOTP').hasClass('hidden')) {
		effect.tweenShow($('divAideSaisieOTP'));
	}
	else {
		effect.tweenHide($('divAideSaisieOTP'));
	}
}

function hideAideSaisieOTP() {
	effect.tweenHide($('divAideSaisieOTP'));
}

//Pour la navigation au clavier pour ouvrir et fermer les aides
function navClavierAide(event, aide) {
	if (event.code === 'Enter' || event.code === 'Space') {
		if (aide === 'nir') {
			showHideAideSaisieNir();
		} else if (aide === 'otp') {
			showHideAideSaisieOTP();
		}
	}
}

function navClavierCloseAide(event, aide) {
	if (event.code === 'Enter' || event.code === 'Space') {
		if (aide === 'nir') {
			hideAideSaisieNir();
			$('bulleAideSaisieNir').focus();
		} else if (aide === 'otp') {
			hideAideSaisieOTP();
			$('bulleAideSaisieOTP').focus();
		}
	}
}
