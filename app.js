Pokedex.fetchPokemon(1);
const pokedex = new Pokedex();

document.querySelector(".up").addEventListener("click", pokedex.upButtonClick);

document
  .querySelector(".down")
  .addEventListener("click", pokedex.downButtonClick);

document
  .querySelector(".scroll-next")
  .addEventListener("click", pokedex.flavorTextNext);

document
  .querySelector(".scroll-back")
  .addEventListener("click", pokedex.flavorTextBack);

document.querySelector(".left").addEventListener("click", pokedex.toggleFront);
document.querySelector(".right").addEventListener("click", pokedex.toggleFront);

let searchId = "";

document
  .querySelector(".button-container")
  .addEventListener("click", pokedex.submitSearch);

document.querySelector(".yellow-circle").addEventListener("click", () => {
  Pokedex.fetchPokemon(parseInt(searchId));
  searchId = "";
});

document.querySelector(".top").addEventListener("click", pokedex.turnOnShiny);

document
  .querySelector(".bottom")
  .addEventListener("click", pokedex.turnOffShiny);

const male = document.querySelector(".male");
const female = document.querySelector(".female");

male.addEventListener("click", () => {
  pokedex.turnOnMale();
  male.style.color = "#DE4E89";
  female.style.color = "white";
});

female.addEventListener("click", () => {
  pokedex.turnOnFemale();
  male.style.color = "white";
  female.style.color = "#092FAE";
});
