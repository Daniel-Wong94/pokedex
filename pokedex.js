class Pokedex {
  constructor() {}
  static currentPokemon;
  static showFront = true;
  static showShiny = false;
  static showDefault = true;

  static updatePokedex = (pokemon) => {
    document.querySelector(".name-screen").innerText = pokemon.name;
    document.querySelector(".height").innerText = `Height: ${pokemon.height} m`;
    document.querySelector(
      ".weight"
    ).innerText = `Weight: ${pokemon.weight} kg`;

    let idText;
    if (pokemon.id < 10) idText = "00" + pokemon.id;
    else if (pokemon.id < 100) idText = "0" + pokemon.id;
    else idText = pokemon.id;

    document.querySelector(".id").innerText = idText;

    const display = document.querySelector(".pokemon-img");
    display.src = Pokedex.showFront
      ? pokemon.front_default
      : pokemon.back_default;

    document.querySelector(".description").innerText =
      pokemon.descriptions[pokemon.scrollIndex];

    document.querySelector(`.type-1`).src = "";
    document.querySelector(`.type-1`).alt = "";
    document.querySelector(`.type-2`).src = "";
    document.querySelector(`.type-2`).alt = "";

    for (let i = 0; i < pokemon.types.length; i++) {
      const element = document.querySelector(`.type-${i + 1}`);
      element.src = `./assets/${pokemon.types[i]}-type.png`;
      element.alt = `${pokemon.types[i]} type`;
    }
  };

  static getFlavorTexts = (flavorObj) => {
    const texts = [];
    flavorObj.forEach((flavor) => {
      if (flavor.language.name === "en" && flavor.flavor_text) {
        texts.push(flavor.flavor_text.replaceAll("\n", " "));
      }
    });

    return texts;
  };

  static parseData = (data) => {
    const [pokemonData, flavorData] = data;

    const { name, id, height, weight } = pokemonData;
    const {
      front_default,
      back_default,
      front_female,
      back_female,
      front_shiny,
      back_shiny,
      front_shiny_female,
      back_shiny_female,
    } = pokemonData.sprites;
    const types = pokemonData.types.map((type) => type.type.name);

    const descriptions = Pokedex.getFlavorTexts(flavorData.flavor_text_entries);

    Pokedex.currentPokemon = new Pokemon(
      name,
      id,
      height,
      weight,
      types,
      front_default,
      back_default,
      front_female,
      back_female,
      front_shiny,
      back_shiny,
      front_shiny_female,
      back_shiny_female,
      descriptions
    );

    Pokedex.updatePokedex(Pokedex.currentPokemon);
  };

  static fetchPokemon = async (id) => {
    const pokemonAPI = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const flavorAPI = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    const pokemonData = await fetch(pokemonAPI).then((res) => res.json());
    const flavorData = await fetch(flavorAPI).then((res) => res.json());

    Pokedex.parseData([pokemonData, flavorData]);
  };

  upButtonClick = () => {
    if (Pokedex.currentPokemon.id === 898) Pokedex.currentPokemon.id = 0;
    Pokedex.fetchPokemon(++Pokedex.currentPokemon.id);
  };

  downButtonClick = () => {
    if (Pokedex.currentPokemon.id === 1) Pokedex.currentPokemon.id = 899;
    Pokedex.fetchPokemon(--Pokedex.currentPokemon.id);
  };

  flavorTextNext = () => {
    if (
      Pokedex.currentPokemon.scrollIndex ===
      Pokedex.currentPokemon.descriptions.length - 1
    ) {
      Pokedex.currentPokemon.scrollIndex = -1;
    }
    document.querySelector(".description").innerText =
      Pokedex.currentPokemon.descriptions[++Pokedex.currentPokemon.scrollIndex];
  };

  flavorTextBack = () => {
    if (Pokedex.currentPokemon.scrollIndex === 0) {
      Pokedex.currentPokemon.scrollIndex =
        Pokedex.currentPokemon.descriptions.length - 1;
    }
    document.querySelector(".description").innerText =
      Pokedex.currentPokemon.descriptions[--Pokedex.currentPokemon.scrollIndex];
  };

  updateView = () => {
    const display = document.querySelector(".pokemon-img");
    const front = Pokedex.currentPokemon.front_default;
    const back = Pokedex.currentPokemon.back_default;
    const front_shiny = Pokedex.currentPokemon.front_shiny;
    const back_shiny = Pokedex.currentPokemon.back_shiny;

    if (Pokedex.showFront && Pokedex.showShiny) display.src = front_shiny;
    if (!Pokedex.showFront && Pokedex.showShiny) display.src = back_shiny;
    if (Pokedex.showFront && !Pokedex.showShiny) display.src = front;
    if (!Pokedex.showFront && !Pokedex.showShiny) display.src = back;
  };

  toggleFront = () => {
    Pokedex.showFront = Pokedex.showFront ? false : true;
    this.updateView();
  };

  turnOnShiny = () => {
    Pokedex.showShiny = true;
    this.updateView();
  };

  turnOffShiny = () => {
    Pokedex.showShiny = false;
    this.updateView();
  };

  submitSearch = async (e) => {
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
      Pokedex.fetchPokemon(parseInt(searchId));
      searchId = "";
    }
  };
}