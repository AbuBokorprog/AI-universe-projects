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
  console.log(data.pricing[0].price);
  //modal flex-1
  const modalBody1 = document.getElementById("modal-flex-1");
  modalBody1.innerHTML = `
  <h5 class="px-4 py-3">${data.description}</h5>
  <div class="d-flex mb-3 justify-content-center px-4 text-center align-items-center gap-2">
  <div class="card border-0 bg-primary-subtle py-3 px-2 w-50"><p>${
    data.pricing[0].price ? data.pricing[0].price : "Free of cost"
  } <br>${data.pricing[0].plan}</p></div>
  <div class="card border-0 bg-danger-subtle py-3 px-2 w-50"><p>${
    data.pricing[1].price ? data.pricing[1].price : "Free of cost"
  }<br>${data.pricing[1].plan}</p></div>
  <div class="card border-0 bg-warning-subtle py-1 px-2 w-50"><p>${
    data.pricing[2].price ? data.pricing[2].price : "Free of cost"
  }<br>${data.pricing[2].plan}</p></div>
  </div>
  <div class="d-flex mb-3 mx-auto justify-content-center px-4 align-items-center gap-5">
  <div class="w-50"><h5>Feature</h5>
  <ul class="text-center">
  <li>${data.features[1].feature_name}</li>
  <li>${data.features[2].feature_name}</li>
  <li>${data.features[3].feature_name}</li>
  </ul>
  </div>
  <div class="w-50"><h5>Integrations</h5>
  <ul>
  <li>${data.integrations[0]}</li>
  <li>${data.integrations[1]}</li>
  <li>${data.integrations[2]}</li>
  <li>${data.integrations[3]}</li>
  </ul>
  </div>
  </div>
  `;

  //modal-flex-2
  const modalBody2 = document.getElementById("modal-flex-2");
  const score = data.accuracy.score * 100;
  //console.log(score);
  modalBody2.innerHTML = `
   <img class="img-fluid p-2 rounded-4" src="${data.image_link[0]}">
   <p id="accuracy" class="bg-danger px-1 position-absolute start-50 mx-5 rounded-3 d-none">${score}% Accuracy</p>
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
  if (score) {
    document.getElementById("accuracy").classList.remove("d-none");
  } else {
    document.getElementById("accuracy").classList.add("d-none");
  }
};

loadData(6);
