const pokemon = {
  id: 1,
  descriptions: null,
  scrollIndex: 0,
  back_default: null,
  front_default: null,
  view: true,

  fetchPokemonById: async (id) => {
    pokemon.id = id;
    pokemon.scrollIndex = 0;

    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const flavorURL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    const fullData = [];

    await fetch(pokemonURL)
      .then((res) => res.json())
      .then((data) => (fullData[0] = data));

    await fetch(flavorURL)
      .then((res) => res.json())
      .then((data) => (fullData[1] = data));

    pokemon.updatePokedex(fullData);
  },

  updatePokedex: (data) => {
    const [pokemonData, flavorData] = data;
    const { name, id, height, weight } = pokemonData;
    const { front_default, back_default, front_shiny, back_shiny } =
      pokemonData.sprites;
    const types = pokemonData.types.map((type) => type.type.name);

    const texts = [];
    pokemon.descriptions = flavorData.flavor_text_entries.forEach((flavor) => {
      if (flavor.language.name === "en" && flavor.flavor_text) {
        texts.push(flavor.flavor_text.replaceAll("\n", " "));
      }
    });

    pokemon.descriptions = texts;
    pokemon.back_default = back_default;
    pokemon.front_default = front_default;

    let idText;
    if (parseInt(pokemon.id) < 10) idText = "00" + pokemon.id;
    else if (parseInt(pokemon.id) < 100) idText = "0" + pokemon.id;
    else idText = pokemon.id;

    document.querySelector(".name-screen").innerText = name;
    document.querySelector(".height").innerText = `Height: ${height / 10} m`;
    document.querySelector(".weight").innerText = `Weight: ${weight / 10} kg`;
    document.querySelector(".id").innerText = idText;
    document.querySelector(".pokemon-img").src = front_default;
    document.querySelector(".description").innerText =
      pokemon.descriptions[pokemon.scrollIndex];

    document.querySelector(`.type-1`).src = "";
    document.querySelector(`.type-1`).alt = "";
    document.querySelector(`.type-2`).src = "";
    document.querySelector(`.type-2`).alt = "";

    for (let i = 0; i < types.length; i++) {
      const element = document.querySelector(`.type-${i + 1}`);
      element.src = `./assets/${types[i]}-type.png`;
      element.alt = `${types[i]} type`;
    }
  },

  upButtonClick: () => {
    if (pokemon.id === 898) pokemon.id = 0;
    console.log(pokemon.descriptions[0]);
    pokemon.fetchPokemonById(++pokemon.id);
  },

  downButtonClick: () => {
    if (pokemon.id === 1) pokemon.id = 899;
    pokemon.fetchPokemonById(--pokemon.id);
  },

  flavorTextNext: () => {
    if (pokemon.scrollIndex === pokemon.descriptions.length - 1) {
      pokemon.scrollIndex = -1;
    }
    document.querySelector(".description").innerText =
      pokemon.descriptions[++pokemon.scrollIndex];
  },

  flavorTextBack: () => {
    if (pokemon.scrollIndex === 0) {
      pokemon.scrollIndex = pokemon.descriptions.length - 1;
    }
    document.querySelector(".description").innerText =
      pokemon.descriptions[--pokemon.scrollIndex];
  },

  changeView: () => {
    if (document.querySelector(".pokemon-img").src === pokemon.front_default) {
      document.querySelector(".pokemon-img").src = pokemon.back_default;
    } else {
      document.querySelector(".pokemon-img").src = pokemon.front_default;
    }
  },

  // submitSearch: () => {
  //   console.log(searchId);
  //   pokemon.fetchPokemonById(searchId);
  //   searchId = "";
  // },
};

pokemon.fetchPokemonById(1);

document.querySelector(".up").addEventListener("click", pokemon.upButtonClick);

document
  .querySelector(".down")
  .addEventListener("click", pokemon.downButtonClick);

document
  .querySelector(".scroll-next")
  .addEventListener("click", pokemon.flavorTextNext);

document
  .querySelector(".scroll-back")
  .addEventListener("click", pokemon.flavorTextBack);

document.querySelector(".left").addEventListener("click", pokemon.changeView);
document.querySelector(".right").addEventListener("click", pokemon.changeView);

let searchId = "";
document
  .querySelector(".button-container")
  .addEventListener("click", async (e) => {
    if (e.target.type === "submit" && searchId.length < 3) {
      searchId += e.target.innerText;
      document.querySelector(
        ".description"
      ).innerText = `Search for Pokemon: ${searchId}`;
    }

    if (searchId.length === 3) {
      await (() =>
        new Promise((res, rej) =>
          setTimeout(() => {
            res();
          }, 1500)
        ))();
      pokemon.fetchPokemonById(parseInt(searchId));
      searchId = "";
    }
  });

document.querySelector(".yellow-circle").addEventListener("click", () => {
  pokemon.fetchPokemonById(searchId);
  searchId = "";
});
