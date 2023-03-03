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
    card.features.forEach((list) => {
      console.log(list);
    });
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
    <img src="${card.image}" class="card-img-top rounded-5 p-3" alt="" />
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <ol>
      <li></li>
      </ol>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
  });
};

loadData();
