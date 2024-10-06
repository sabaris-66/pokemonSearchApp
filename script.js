const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonWeight = document.querySelector("#weight");
const pokemonHeight = document.querySelector("#height");
const pokemonTypes = document.querySelector("#types");
const pokemonHp = document.querySelector("#hp");
const pokemonAttack = document.querySelector("#attack");
const pokemonDefense = document.querySelector("#defense");
const pokemonSpAtt = document.querySelector("#special-attack");
const pokemonSpDef = document.querySelector("#special-defense");
const pokemonSpeed = document.querySelector("#speed");

const assignPokemonData = (pokemonData) => {
  pokemonName.textContent = pokemonData.name;
  pokemonId.textContent = pokemonData.id;
  pokemonWeight.textContent = pokemonData.weight;
  pokemonHeight.textContent = pokemonData.height;
  pokemonData.stats.forEach(({ base_stat, stat }) => {
    switch (stat.name) {
      case "hp":
        pokemonHp.textContent = base_stat;
        break;

      case "attack":
        pokemonAttack.textContent = base_stat;
        break;

      case "defense":
        pokemonDefense.textContent = base_stat;
        break;

      case "special-attack":
        pokemonSpAtt.textContent = base_stat;
        break;

      case "special-defense":
        pokemonSpDef.textContent = base_stat;
        break;

      case "speed":
        pokemonSpeed.textContent = base_stat;
        break;

      default:
        break;
    }
  });

  pokemonData.types.forEach((type) => {
    pokemonTypes.textContent += `${type.type.name} `;
  });
};

const fetchPokemonData = async (pokemon) => {
  try {
    const res = await fetch(pokemon.url);
    const data = await res.json();
    assignPokemonData(data);
  } catch (err) {
    console.log(err);
  }
};

const fetchData = async (pokemonName) => {
  try {
    let pokemonFound = false;
    const res = await fetch(
      "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
    );
    const pokemonData = await res.json();
    pokemonData.results.forEach((pokemon) => {
      if (pokemon.name === pokemonName) {
        fetchPokemonData(pokemon);
        pokemonFound = true;
      }
    });
    if (!pokemonFound) {
      alert("Pokémon not found");
    }
  } catch (err) {
    console.log(err);
  }
};

searchButton.addEventListener("click", () => {
  if (searchInput.value) {
    fetchData(searchInput.value);
  }
});
