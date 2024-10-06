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
const display3 = document.querySelector("#display3");

const assignPokemonData = (pokemonData) => {
  pokemonName.textContent = pokemonData.name.toUpperCase();
  pokemonId.textContent = `#${pokemonData.id}`;
  pokemonWeight.textContent = `Weight: ${pokemonData.weight}`;
  pokemonHeight.textContent = `Height: ${pokemonData.height}`;
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

  pokemonTypes.innerHTML = "";
  pokemonData.types.forEach((type) => {
    pokemonTypes.innerHTML += `<span>${type.type.name.toUpperCase()} </span>`;
  });

  display3.innerHTML = "";
  const image = document.createElement("img");
  image.id = "sprite";
  image.src = pokemonData.sprites.front_default;
  display3.appendChild(image);
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
      if (
        pokemon.name === pokemonName ||
        pokemon.id === parseInt(pokemonName)
      ) {
        fetchPokemonData(pokemon);
        const display = document.querySelector(".hidden");
        display.style.display = "flex";
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
    fetchData(searchInput.value.toLowerCase());
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData(searchInput.value.toLowerCase().split(" ").join("-"));
  }
});
