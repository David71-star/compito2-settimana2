let container = document.querySelector("#scatola2");
let save = document.querySelector("#salvaCarrello");
let remove = document.querySelectorAll(".rimuovi");
let totalExpense = document.querySelector("h3");
let totalItems = document.querySelector("h6");
let cart2 = document.querySelector(".cart2");
let total = 0;
let items = 0;

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
          <button class="add" onclick="saveCart(id)" id="${
            book.asin
          }">${"Cart"} </button>
          <button class="remove"> ${"remove"}</button>
          <a href="/dettaglio.html?id=${book.asin}"> ${"Dettaglio"}</a>
        </div>
      </div>`;
        })
        .join("");
      const removeCard = document.querySelectorAll(".remove");
      removeCard.forEach((skip) =>
        skip.addEventListener("click", nascondiCard)
      );
      const card = document.querySelectorAll(".add");
      card.forEach((cards) => {
        cards.addEventListener("click", selezionato);
      });
    })
    .catch((err) => console.error(err));
};
generatorHTML();

function selezionato(event) {
  console.log(event);
  event.target.closest(".card").classList.toggle("carrello");
}

const saveCart = function (id) {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res2) => {
      return res2.json();
    })
    .then((data2) => {
      data2
        .map((book2) => {
          if (id === book2.asin) {
            total += book2.price;
            items += 1;
            totalExpense.innerText = "Totale: " + total + "€";
            totalItems.innerText = "Totale articoli: " + items;
            save.innerHTML += `<div class="dettaglio d-flex justify-content-start align-items-center py-2">
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

const searchBook = function () {
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
                    <button class="add" onclick="saveCart(id)" id="${
                      book3.asin
                    }">${"Cart"} </button>
                    <button class="remove"> ${"remove"}</button>
                    <a href="/dettaglio.html?id=${
                      book3.asin
                    }"> ${"Dettaglio"}</a>
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

const empty = function () {
  save.innerHTML = "";
  total = 0;
  items = 0;
};
