function testCodePersonnel(f, e, d) {
    var b = false;
    if (f.length > 0) {
        var e = new RegExp(e, "g");
        var c = e.test(f);
        var a = false;
        if (d) {
            a = d.some(function(g) { return f.indexOf(g) !== -1 })
        }
        if (c && !a) { b = true }
    }
    return b
}

function testNiveauCodePersonnel(c) {
    var b = -1;
    if (c.length > 0) {
        var a = zxcvbn(c);
        b = a.score;
    }
    return b
}

function creerDictionnaire(e, f) {
    var g = [];
    var d = "/";
    var b = "-";
    e = e.toString();
    f = f.toString();
    var h = f.substring(0, 2);
    var c = f.substring(2, 4);
    var i = f.substring(4, 6);
    var a = f.substring(6, 8);
    g.push(e);
    g.push(f);
    g.push(i + a);
    g.push(h + c + a);
    g.push(h + c);
    g.push(i + a + c + h);
    g.push(a + c + h);
    g.push(c + h);
    g.push(h + d + c + d + i + a);
    g.push(h + d + c + d + a);
    g.push(h + d + c);
    g.push(i + a + d + c + d + h);
    g.push(a + d + c + d + h);
    g.push(c + d + h);
    g.push(h + b + c + b + i + a);
    g.push(h + b + c + b + a);
    g.push(h + b + c);
    g.push(i + a + b + c + b + h);
    g.push(a + b + c + b + h);
    g.push(c + b + h);
    return g;
}

function afficherMotDePasse(c, a, d, b) {
    var path = a.src;
    console.log(path.match(/.*\//)[0]);

    if (c.type === "password") {
        c.type = "text";
        a.src = path.match(/.*\//)[0] + "Oeil.png";
        a.title = d;
    } else {
        c.type = "password";
        a.src = path.match(/.*\//)[0] + "OeilBarre.png";
        a.title = b;
    }
}

function enableBouton(d, a, c, b) {
    if (niveauCode == -1) {
        d.disabled = true;
    } else {
        if (a != null && c === a) {
            d.disabled = true;
        } else {
            if (a != null) {
                if (a.length > 0) {
                    if (b !== c) { d.disabled = true } else { d.disabled = false }
                } else { d.disabled = true }
            } else { if (b !== c) { d.disabled = true } else { d.disabled = false } }
        }
    }
}

function afficherNiveauCode(c) {
    var niveauCode = testNiveauCodePersonnel(nouveauCodePerso);
    if (!testCodePersonnel(nouveauCodePerso, regex, exclusions)) { niveauCode = -1 }
    var d = "niveauRouge";
    var b = "niveauOrange";
    var a = "niveauVert";
    if (niveauCode == -1) {
        c.innerHTML = niveauInsuffisant;
        c.classList.remove(b);
        c.classList.remove(a);
        c.classList.add(d);
    } else {
        if (niveauCode == 0) {
            c.innerHTML = niveau0;
            c.classList.remove(b);
            c.classList.remove(a);
            c.classList.add(d);
        } else {
            if (niveauCode == 1) {
                c.innerHTML = niveau1;
                c.classList.remove(b);
                c.classList.remove(a);
                c.classList.add(d);
            } else {
                if (niveauCode == 2) {
                    c.innerHTML = niveau2;
                    c.classList.remove(d);
                    c.classList.remove(a);
                    c.classList.add(b);
                } else {
                    if (niveauCode == 3) {
                        c.innerHTML = niveau3;
                        c.classList.remove(b);
                        c.classList.remove(d);
                        c.classList.add(a);
                    } else {
                        if (niveauCode == 4) {
                            c.innerHTML = niveau4;
                            c.classList.remove(b);
                            c.classList.remove(d);
                            c.classList.add(a);
                        }
                    }
                }
            }
        }
    }
    if (!nouveauCodePerso) {
        c.innerHTML = "";
        c.classList.remove(d);
        c.classList.remove(b);
        c.classList.remove(a);
    }
}

function validerRegles(b, e, f, g, d, c) {
    if (testCodePersonnel(nouveauCodePerso, regexLongueur)) { b.classList.add("regleOK") } else { b.classList.remove("regleOK") }
    if (testCodePersonnel(nouveauCodePerso, regexCasse)) { e.classList.add("regleOK") } else { e.classList.remove("regleOK") }
    if (testCodePersonnel(nouveauCodePerso, regexNumSpecial)) { f.classList.add("regleOK") } else { f.classList.remove("regleOK") }
    if (testCodePersonnel(nouveauCodePerso, regexCaractAutorises)) { g.classList.add("regleOK") } else { g.classList.remove("regleOK") }
    if (typeof codePersoActuel !== "undefined" && d) { if (codePersoActuel && nouveauCodePerso && codePersoActuel !== nouveauCodePerso) { d.classList.add("regleOK") } else { d.classList.remove("regleOK") } }
    var a = false;
    if (c) { a = exclusions.some(function(h) { return nouveauCodePerso.indexOf(h) !== -1 }) }
    if (nouveauCodePerso) { if (nouveauCodePerso && a) { c.classList.remove("regleOK") } else { c.classList.add("regleOK") } } else { c.classList.remove("regleOK") }
}

/**
 * Valider le formulaire de login
 *
 * @return
 */
function validerFormLogin(nir) {
	var newNir;
	// Verif NIR
	if (nir !== null || nir !== '') {
		newNir = nir.value.toUpperCase();
	}
	// Nir toUpperCase
	nir.value = newNir;
}