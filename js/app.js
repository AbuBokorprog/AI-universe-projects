const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCard(data.data.tools));
};

const displayCard = (data) => {
  //console.log(data);
  const cardContainer = document.getElementById("card-container");
  data.forEach((card) => {
    //console.log(card);
    /* card.features.forEach((list) => {
      console.log(list);
    }); */
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
    <img src="${card.image}" class="card-img-top rounded-5 p-3" alt="" />
    <div class="card-body">
      <h5 id="feature" class="card-title">Features</h5>
    </div>
    <div class="card-footer">
      <h5>${card.name}</h5>
      <small class="text-muted"><i class="fa-regular fa-calendar"></i>${card.published_in}</small>
      <button><i class="fa-sharp fa-solid fa-arrow-right text-right"></i></button>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
  });
  /* const feature = document.getElementById("feature");
  //const ol = document.createElement("ol");
  data.forEach((card) => {
    //console.log(card);
    card.features.forEach((list) => {
      console.log(list);
      feature.innerHTML = `
      <ol>
      <li>${list}</li>
      </ol>
      `;
    });
  }); */
};

loadData();
