const input = document.querySelector("#search");
const bgens = document.querySelectorAll(".bgen");
const grid = document.querySelectorAll(".grid-container");
const changeText = document.querySelector("#change-text");

// Gen buttons
const press1 = document.querySelector("#gen1");
const press2 = document.querySelector("#gen2");
const press3 = document.querySelector("#gen3");
const press4 = document.querySelector("#gen4");
const press5 = document.querySelector("#gen5");
const press6 = document.querySelector("#gen6");
const press7 = document.querySelector("#gen7");
const press8 = document.querySelector("#gen8");
const press9 = document.querySelector("#gen9");

let pokeData = [];
let pokemon = [];
let filteredpokenames = [];
const content = document.querySelector(".grid-container");

bgens.forEach((bgen, i) => {
  bgen.addEventListener("click", () => shownum(i));

});

function shownum(i) {
  const limit = generations[i].limit;
  const offset = generations[i].offset;
  fetchData(limit, offset);
}





const generations = [
  { id: 0, limit: 151, offset: 0 },
  { id: 1, limit: 100, offset: 151 },
  { id: 2, limit: 135, offset: 251 },
  { id: 3, limit: 107, offset: 386 },
  { id: 4, limit: 156, offset: 493 },
  { id: 5, limit: 72, offset: 649 },
  { id: 6, limit: 88, offset: 721 },
  { id: 7, limit: 96, offset: 809 },
  { id: 8, limit: 112, offset: 905 },
];

const fetchData = async (limit, offset) => {
  await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
    .then((res) => res.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((res) => res.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other["official-artwork"].front_default,
              types: data.types,
              height: data.height,
              weight: data.weight,
            };
          });
      });
      Promise.all(fetches).then((res) => {
        pokeData = res;
        pokeCards();
      });
    });
};

const pokeCards = (filteredData = pokeData) => {
  const cards = filteredData
    .map((pokemon) => {
      return `
        <div class="grid-item">
        <p class="id">${pokemon.id}</p>
        <img src="${pokemon.img}" class="pic" />
        <div class="name">${pokemon.name}</div>
        <div class="types">
          ${pokemon.types.map((type) => getTypeString(type)).join("")}
          <p class="Height">Height: ${pokemon.height} FT </p>
          <p class="Weight">Weight: ${pokemon.weight} Pounds </p>
        </div>
        </div>`;
    })
    .join("");

  content.innerHTML = cards;
};

const getTypeString = (type) => {
  return `<p>${type.type.name}</p>`;
};

const searchFiltered = () => {
  input.addEventListener("keyup", () => {
    const searchString = input.value.toLowerCase();
    if (searchString) {
      const filteredPokemons = pokeData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchString);
      });
      pokeCards(filteredPokemons);
    } else {
      pokeCards(pokeData);
    }
  });
};

searchFiltered();
fetchData();

// Event listeners. Way too much code but does the job

press1.addEventListener("click", function () {
  changeText.textContent = "There are 151 Pokemon in Generation 1!";
});

press2.addEventListener("click", function () {
  changeText.textContent = "There are 100 Pokemon in Generation 2!";
});

press3.addEventListener("click", function () {
  changeText.textContent = "There are 135 Pokemon in Generation 3!";
});

press4.addEventListener("click", function () {
  changeText.textContent = "There are 107 Pokemon in Generation 4!";
});

press5.addEventListener("click", function () {
  changeText.textContent = "There are 156 Pokemon in Generation 5!";
});

press6.addEventListener("click", function () {
  changeText.textContent = "There are 72 Pokemon in Generation 6!";
});

press7.addEventListener("click", function () {
  changeText.textContent = "There are 88 Pokemon in Generation 7!";
});

press8.addEventListener("click", function () {
  changeText.textContent = "There are 96 Pokemon in Generation 8!";
});

press9.addEventListener("click", function () {
  changeText.textContent = "There are 112 Pokemon in Generation 9!";
});

input.addEventListener("keyup", function () {
  changeText.textContent = "";
});
