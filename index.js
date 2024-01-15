let container = document.querySelector("#scatola2");
let salva = document.querySelector("#salvaCarrello");
let card = document.querySelector(".card");
let rimuovi = document.querySelectorAll(".rimuovi");
let totalespesa = document.querySelector("h3");
let totalearticoli = document.querySelector("h6");
let totale = 0;
let articoli = 0;

const generatorHTML = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      container.innerHTML = data
        .map((book) => {
          return `
    <div class="card col-3">
        <img src="${book.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${"Prezzo: €" + book.price}</p>
          <button onclick="salvaCarrello(id)" id="${
            book.asin
          }">${"Carrello"} </button>
          <button onclick="nascondiCard(event)" class="rimuovi"> ${"Rimuovi"}</button>
        </div>
      </div>`;
        })
        .join("");
    })
    .catch((err) => console.error(err));
};
generatorHTML();

const salvaCarrello = function (id) {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res2) => {
      return res2.json();
    })
    .then((data2) => {
      data2
        .map((book2) => {
          if (id === book2.asin) {
            totale += book2.price;
            articoli += 1;
            totalespesa.innerText = "Totale: " + totale + "€";
            totalearticoli.innerText = "Totale articoli: " + articoli;
            salva.innerHTML += `<div class="dettaglio d-flex justify-content-start align-items-center py-2">
              <h5 class="mb-0">${book2.price} ${"€"}</h5>
              <div class="d-flex justify-content-start align-items-center">
              <img src="${book2.img}"/>
              <h6 class="mb-0 text-dark">${book2.title}</h6>
              </div>
              </div>
              `;
          }
        })
        .join("");
    })
    .catch((err) => console.error(err));
};

const cercaLibro = function () {
  let input1 = document.querySelector("#cercaLibro2");
  container.innerHTML = "";
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res3) => {
      return res3.json();
    })
    .then((data3) => {
      data3
        .filter((book3) => {
          if (
            input1.value
              .toLowerCase()
              .includes(book3.title.toLowerCase().slice(0, 4))
          ) {
            container.innerHTML = `
              <div class="card col-3">
                  <img src="${book3.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${book3.title}</h5>
                    <p class="card-text">${"Prezzo: €" + book3.price}</p>
                    <button onclick="salvaCarrello(id)" class="carrello2" id="${
                      book3.asin
                    }">${"Carrello"} </button>
                    <button onclick="nascondiCard(event)" class="rimuovi"> ${"Rimuovi"}</button>
                  </div>
                </div>`;
          }
        })
        .join("");
    })
    .catch((err) => console.log(err));
};

function nascondiCard(event) {
  const cardNascosta = event.target.closest(".card");
  if (cardNascosta) {
    cardNascosta.style.display = "none";
  }
}

const svuota = function () {
  salva.innerHTML = "";
  totale = 0;
  articoli = 0;
};
