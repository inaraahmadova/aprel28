function getShows(link) {
  fetch(link)
    .then(res => res.json())
    .then(data => fillHTML(data));
}

let filmArea = document.getElementById("films-area");

function fillHTML(data) {
   data.sort((a, b) => a.rating.average - b.rating.average);

  filmArea.innerHTML = "";
  data.forEach(element => {
    let id = element.id;
    let img = element.image.medium;
    let start = element.premiered;
    let end = element.ended;
    let rating = element.rating.average;
    filmArea.innerHTML += `<div class="col-md-3 my-2">
      <div class="card text-center position-relative">
        <span style="z-index:4; left:25px; top:25px; " class="rating position-absolute text-light translate-middle p-2  border ">
          <span >${rating}</span>
        </span>
        <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
          <img src="${img}" class="img-fluid w-100"/>
          <a href="#!">
            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
          </a>
        </div>          
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text"></p>
          <a href="detail.html?${id}" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal" class="btn btn-primary" data-mdb-ripple-init>Button</a>
        </div>
        <div class="card-footer text-muted d-flex justify-content-between">
          <span>${start}</span>
          <span>${end ?? "continuing"}</span>
        </div>
      </div>
    </div>`;
  });
}

getShows('https://api.tvmaze.com/shows');

const searchbox = document.getElementById("searchbox");

searchbox.addEventListener("input", function () {
  const searchText = searchbox.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    if (title.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
document.getElementById("sortSelect").addEventListener("change", function () {
  const selectedOption = this.value; 
  if (selectedOption === "artan") {
      sortArtan();
  } else if (selectedOption === "azalan") {
      sortAzalan();
  }
});

function sortArtan() {
  allShows.sort((a, b) => a.rating.average - b.rating.average);
  fillHTML(allShows);
}

function sortAzalan() {
  allShows.sort((a, b) => b.rating.average - a.rating.average);
  fillHTML(allShows);
}
