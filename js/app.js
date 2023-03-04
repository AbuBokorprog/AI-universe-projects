const loadData = (limit, sortData) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCard(data.data.tools, limit, sortData);
    });
  document.getElementById("loader").classList.remove("d-none");
};
// display card
//console.log(arr);
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
  const arr = [];
  //console.log(arr);
  data.forEach((card) => {
    //console.log(card);
    const dates = card.published_in;
    arr.push(dates);

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
        <li class="" id="list3">${
          card.features[2] ? card.features[2] : "No data"
        }</li>
        <li class="" id="list4">${
          card.features[3] ? card.features[3] : "No data"
        }</li>
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
    /* const list = document.getElementById("list3");
    const listText = list.innerText;
    console.log(listText);
    if (listText == "No data") {
      document.getElementById("list3").classList.add("d-none");
    } else {
      document.getElementById("list3").classList.remove("d-none");
    }
    const list2 = document.getElementById("list4");
    const list2Text = list2.innerText;
    console.log(list2Text);
    if (listText == "No data") {
      document.getElementById("list3").classList.add("d-none");
    } else if (listText == "No data") {
      document.getElementById("list3").classList.remove("d-none");
    } */
  });
  arr.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  sortData(arr);
  //return arr;
};
// show all
const loadingAll = (limit) => {
  loadData(limit);
};
document.getElementById("see-more").addEventListener("click", function () {
  loadingAll();
});
//sort
const sortData = (sort) => {
  console.log(sort);
  //sortData();
};
document.getElementById("sort-btn").addEventListener("click", function () {
  console.log("hello");
  //sortData();
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
  console.log(data);
  //console.log(data.pricing);
  //modal flex-1
  const modalBody1 = document.getElementById("modal-flex-1");
  modalBody1.innerHTML = `
  <h5 class="px-4 py-2">${data.description}</h5>
  <div class="d-flex my-3 justify-content-center px-4 text-center align-items-center gap-2">
  <div class="card border-0 bg-primary-subtle h-75 px-2 w-50" id="price"><p>${
    data.pricing ? data.pricing[0].price : ""
  }<br>/${data.pricing ? data.pricing[0].plan : ""}</p></div>
  <div class="card border-0 bg-danger-subtle h-75 px-2 w-50" id="price2"><p>${
    data.pricing ? data.pricing[1].price : ""
  }<br>/${data.pricing ? data.pricing[1].plan : ""}</p></div>
  <div class="card border-0 bg-warning-subtle h-75 px-2 w-50" id="price3"><p>${
    data.pricing ? data.pricing[2].price : ""
  }<br>/${data.pricing ? data.pricing[2].plan : ""}</p></div>
  </div>
  <div class="d-flex mb-2 mx-auto justify-content-center px-4 align-items-center gap-5">
  <div class="w-50 h-50"><h5>Feature</h5>
  <ul class="text-center">
  <li>${data.features[1].feature_name}</li>
  <li>${data.features[2].feature_name}</li>
  <li>${data.features[3].feature_name}</li>
  </ul>
  </div>
  <div class="w-50 h-50"><h5>Integrations</h5>
  <p class="d-none" id="Integrations-no">No Data Found</p>
  <ul class="" id="Integrations-ul">
  <li>${data.integrations ? data.integrations[0] : "No Data Found"}</li>
  <li>${data.integrations ? data.integrations[1] : "No Data Found"}</li>
  <li>${data.integrations ? data.integrations[2] : "No Data Found"}</li>
  <li>${data.integrations ? data.integrations[3] : "No Data Found"}</li>
  </ul>
  </div>
  </div>
  `;
  /* const ul = document.getElementById("Integrations-ul");
  const ulList = ul.innerText;
  console.log(ulList);
  if (ulList == "") {
    document.getElementById("Integrations-no").classList.remove("d-none");
    document.getElementById("Integrations-ul").classList.add("d-none");
  } */

  //price Basic
  const priceIndex = document.getElementById("price");
  const priceText = priceIndex.innerText;
  //console.log(priceText);
  if (priceText == "/") {
    document.getElementById("price").innerText = "Free Of Cost/Free";
    document.getElementById("price").classList.add("py-4");
  } else if (priceText == "0/Basic") {
    document.getElementById("price").innerText = "Free Of Cost/Basic";
    document.getElementById("price").classList.add("py-4");
  } else if (priceText == "No cost/Free") {
    document.getElementById("price").innerText = "Free Of Cost/Basic";
    document.getElementById("price").classList.add("py-4");
  }
  // price Professional
  const price2Index = document.getElementById("price2");
  const price2Text = price2Index.innerText;
  //console.log(price2Text);
  if (priceText == "/") {
    document.getElementById("price2").innerText = "Free Of Cost/Free";
    document.getElementById("price2").classList.add("py-4");
  }
  // price Enterprise
  const price3Index = document.getElementById("price2");
  const price3Text = price3Index.innerText;
  //console.log(price3Text);
  if (priceText == "/") {
    document.getElementById("price3").innerText = "Free Of Cost/Free";
    document.getElementById("price3").classList.add("py-4");
  }

  //modal-flex-2
  const modalBody2 = document.getElementById("modal-flex-2");
  const score = data.accuracy.score * 100;
  //console.log(score);
  modalBody2.innerHTML = `
   <img class="img-fluid p-3 rounded-5" src="${
     data.image_link ? data.image_link[0] : ""
   }">
   <p id="accuracy" class="bg-danger px-1 position-absolute start-50 mx-5 rounded-3 d-none">${score}% Accuracy</p>
    <p class="mx-auto" >${
      data.input_output_examples
        ? data.input_output_examples[0].input
        : "No Data Found"
    } <br> ${
    data.input_output_examples ? data.input_output_examples[1].input : ""
  }</p>
  `;
  if (score) {
    document.getElementById("accuracy").classList.remove("d-none");
  } else {
    document.getElementById("accuracy").classList.add("d-none");
  }
};

loadData(6);
