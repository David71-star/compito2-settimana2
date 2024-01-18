const params = new URLSearchParams(location.search);
const id = params.get("id");
let container = document.querySelector(".container");
fetch("https://striveschool-api.herokuapp.com/books/" + id)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    container.innerHTML = `<h1>${data.title}</h1>
    <div class="d-flex justify-content-start mt-3">
    <img src="${data.img}"/>
    <h4>Price: ${data.price} €</h4>
    </div>`;
  });
