const input = document.querySelector("#search");
const bgens = document.querySelectorAll(".bgen");

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
  { id: 8, limit: 116, offset: 905 },
];

// for buttons use foreach to figure out which button was clicked (see speedgame for that)
// first define generations and connect with the correct button
// when you triger the fetchdata function, you pass the limit and offset to be correct ones

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
