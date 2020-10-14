/*
V souboru kontakty.js je pole osob, které máš zobrazit.
Vzorová šablona pro osobu vypadá takto:

	<div class="kontakt">
		<div class="hleda">hledá práci</div>
		<div class="foto">
			<img src="obrazky/foto01.jpg" alt="Alena Nováková">
			<div class="vek">28</div>
		</div>
		<div class="detaily">
			<h2>Alena Nováková</h2>
			<p class="profese">zubní lékařka</p>
			<p class="telefon">+420 123 456 789</p>
		</div>
	</div>

Níže v tomto dokumentu máš hotový kód,
který vytvoří prvek podle této šablony a doplní do něj napevno
testovací data.








BONUS PRO MEGA-ŠPRTKY: (!!!!!! ;)
----------------------
6) Dokážeš funkce z předchozích kroků napsat tak, aby fungovaly dohromady?
Tj. aby šlo hledat podle jména, vyhledaný seznam aby šel seřadit a případně
ještě vyfiltrovat podle hledání práce.

*/

// 1) Zabal připravený kód pro vytvoření jednoho kontaktu do funkce,
// abys ho mohla snadno použít odkudkoliv.
// Napiš funkci tak, aby jí buď bylo možno jednoduše předat jako parametr, jakou osobu z pole kontaktů chceš vytvořit.
// Funkce by měla vytvořený objekt vrátit jako výstupní parametr. Meměla by ho sama připojovat do stránky.

function vytvorElement(divka) {
  let kontaktElement = document.createElement("div");
  kontaktElement.classList.add("kontakt");

  vyhledanaOsoba = kontakty.filter((e) => e.jmeno.includes(divka));

  // pokud osoba hledá práci, připojíme i <div class="hleda">, jinak ho vynecháme
  if (vyhledanaOsoba[0].hledaPraci) {
    let hledaElement = document.createElement("div");
    hledaElement.classList.add("hleda");
    hledaElement.textContent = "hledá práci";
    kontaktElement.appendChild(hledaElement);
  }

  // hlavicka s fotkou a vekem
  let fotoElement = document.createElement("div");
  fotoElement.classList.add("foto");
  let imgElement = document.createElement("img");
  fotoElement.appendChild(imgElement);
  let vekElement = document.createElement("div");
  vekElement.classList.add("vek");
  fotoElement.appendChild(vekElement);
  kontaktElement.appendChild(fotoElement);

  // podrobnosti se jmenem, profesi a telefonem
  let detailyElement = document.createElement("div");
  detailyElement.classList.add("detaily");
  let jmenoElement = document.createElement("h2");
  detailyElement.appendChild(jmenoElement);
  let profeseElement = document.createElement("p");
  profeseElement.classList.add("profese");
  detailyElement.appendChild(profeseElement);
  let telefonElement = document.createElement("p");
  telefonElement.classList.add("telefon");
  detailyElement.appendChild(telefonElement);
  kontaktElement.appendChild(detailyElement);

  // vytvořeným prvkům nastavíme obsah
  imgElement.src = vyhledanaOsoba[0].foto;
  imgElement.alt = vyhledanaOsoba[0].jmeno;
  jmenoElement.textContent = vyhledanaOsoba[0].jmeno;
  vekElement.textContent = vyhledanaOsoba[0].vek;
  profeseElement.textContent = vyhledanaOsoba[0].profese;
  telefonElement.textContent = vyhledanaOsoba[0].telefon;

  return kontaktElement;
}

// 3) Napiš funkci, která při stisknutí tlačítka "Hledat" zobrazí jen ty
// kontakty, jejichž jméno obsahuje text zadaný do hledacího textového pole.
// Nápověda:
// - k hledání použij metodu textových řetězců includes (google "mdn string includes")
// - nezapomeň, že hledání je citlivé na malá a velká písmena,
// takže ideálně musíš nějak zajistit, aby se hledalo bez rozdílu
// (google "mdn string toLowerCase" nebo "mdn string toUpperCase")

// Při hledání zkus použít metodu pole "filter".

const btnUkazVse = document.querySelector(".filtr #vse");
const btnHledat = document.querySelector(".hledani button");
const elHledaneJmeno = document.querySelector("#jmeno");
const btnOdNejmladsi = document.querySelector("#odNejmladsi");
const btnOdNejstarsi = document.querySelector("#odNejstarsi");
const btnPrace = document.querySelector("#prace");

let vyhledaneKontakty = kontakty;

vyhledejKontakt();

btnUkazVse.onclick = vyhledejKontakt;
btnHledat.onclick = vyhledejKontakt;
btnOdNejmladsi.onclick = seradOdNejmladsi;
btnOdNejstarsi.onclick = seradOdNejstarsi;
btnPrace.onclick = hledaPraci;
elHledaneJmeno.addEventListener("input", vyhledejKontakt);

function vyhledejKontakt() {
  let hledanyText = elHledaneJmeno.value.toLowerCase();
  vyhledaneKontakty = kontakty;
  if (hledanyText != "") {
    vyhledaneKontakty = vyhledaneKontakty.filter((e) =>
      e.jmeno.toLowerCase().includes(hledanyText)
    );
  }
  vypisSeznam();
}

// 4) Při stisku tlačítek "Od nejmladší" nebo "Od nejstarší" seřad pole
// vzestupně nebo sestupně podle věku a zobraz výsledek.
// Na řazení použij metodu pole "sort".
// Musíš si k ní napsat porovnávací funkci - jednu pro porovnání pro
// sestupné řazení, druhou pro porovnání dvou objektů pole pro vzestupné
// řazení podle věku.

function seradOdNejmladsi() {
  vyhledaneKontakty = vyhledaneKontakty.sort((a, b) => a.vek - b.vek);
  vyhledejKontakt();
}

function seradOdNejstarsi() {
  vyhledaneKontakty = vyhledaneKontakty.sort((a, b) => b.vek - a.vek);
  vyhledejKontakt();
}

// 5) Při stisknutí tlačítka "Hledá práci" zobraz jen ty kontakty, které
// hledají práci. V objektu osoby je vlastnost hledaPraci, která má buď
// hodnotu true nebo false.

function hledaPraci() {
  vyhledaneKontakty = vyhledaneKontakty.filter((e) => e.hledaPraci);
  vypisSeznam();
}

// 2) Napiš funkci, která zobrazí všechny kontakty v seznamu. Tato funkce se zavolá hned při otevření stránky, aby se zobrazily všechny kontakty. Bude se volat také po stisknutí tlačítka "Ukaž vše". Veškeré výsledky (i dalších kroků) se budou generovat vždy do prvku <div id="vysledek"> ... </div>. Jak by to mělo vypadat, když se ti vše povede, můžeš vidět na obrázku ukazka-vysledku.jpg, který je přiložen k tomuto projektu.

function vypisSeznam() {
  let vysledek = document.querySelector("#vysledek");
  vysledek.innerHTML = "";
  for (i = 0; i < vyhledaneKontakty.length; i++) {
    let kontakt = vyhledaneKontakty[i];

    // vytvořený kontakt připojíme na stránku

    vysledek.appendChild(vytvorElement(kontakt.jmeno));
  }
}
