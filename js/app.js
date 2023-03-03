const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCard(data.data.tools));
  document.getElementById("loader").classList.remove("d-none");
};

const displayCard = (data) => {
  //console.log(data);
  document.getElementById("loader").classList.add("d-none");
  const cardContainer = document.getElementById("card-container");
  data.forEach((card) => {
    console.log(card);

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
      <button class="border-0 px-3 py-2 text-danger rounded-5"> <span><i class="fa-sharp fa-solid fa-arrow-right text-right"></i></span> </button>
      </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
  });
};

loadData();
