const loadData = (limit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCard(data.data.tools, limit);
    });
  document.getElementById("loader").classList.remove("d-none");
};
// display card
const displayCard = (data, limit) => {
  //console.log(data);
  document.getElementById("loader").classList.add("d-none");
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (data.length > 6 && limit) {
    data = data.slice(0, 6);
    document.getElementById("see-more").classList.remove("d-none");
  } else {
    document.getElementById("see-more").classList.add("d-none");
  }

  data.forEach((card) => {
    //console.log(card);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
    <img src="${card.image}" class="card-img-top rounded-5 p-3" alt="" />
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <ol id="ol-container">
        <li>${card.features[0]}</li>
        <li>${card.features[1]}</li>
        <li>${card.features[2] ? card.features[2] : "no data"}</li>
        <li>${card.features[3] ? card.features[3] : "no data"}</li>
      </ol>
    </div>
    <div class="card-footer">
      <h5>${card.name}</h5>
      <div class="d-flex justify-content-between">
      <small class="text-muted me-2"><span><i class="fa-regular fa-calendar"></span></i>${
        card.published_in
      }</small>
      <button type="button" class="border-0 px-3 py-2 text-danger rounded-5" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="modalDataLoad('${
        card.id
      }')"><i class="fa-sharp fa-solid fa-arrow-right text-right"></i></button>
      </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
  });
};

const loadingAll = (limit) => {
  loadData(limit);
};

document.getElementById("see-more").addEventListener("click", function () {
  loadingAll();
});

// modal
const modalDataLoad = (data) => {
  //console.log(data);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${data}`;
  //console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => modalShow(data.data));
};

const modalShow = (data) => {
  console.log(data.accuracy.score);
  const modalBody1 = document.getElementById("modal-flex-1");
  modalBody1.innerHTML = `
  <p>${data.description}</P>
  <div class="d-flex justify-content-center align-items-center gap-2">

  </div>
  `;

  //modal-flex-2
  const modalBody2 = document.getElementById("modal-flex-2");

  modalBody2.innerHTML = `
   <img class="img-fluid p-2 rounded-4" src="${data.image_link[0]}">
   <p class="bg-danger px-1 position-absolute start-50 mx-5 rounded-3">${
     data.accuracy.score ? data.accuracy.score : ""
   }% Accuracy</p>
    <p class="mx-auto" >${
      data.input_output_examples[0].input
        ? data.input_output_examples[0].input
        : "no data"
    } <br> ${
    data.input_output_examples[1].input
      ? data.input_output_examples[1].input
      : "no data"
  }</p>

  `;
};

loadData(6);
