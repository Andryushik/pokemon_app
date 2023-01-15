'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/

async function fetchData(url) {
  try {
    const fetchedData = await fetch(url);
    if (fetchedData.ok) {
      const data = await fetchedData.json();
      return data;
    }
  } catch (error) {
    throw new Error('HTTP error', error);
  }
}

async function fetchAndPopulatePokemons() {
  if (document.querySelector('select')) {
    document.querySelector('select').remove();
    document.querySelector('img').remove();
  }
  const selectPokemon = document.createElement('select');
  selectPokemon.style.width = '20%';
  document.body.appendChild(selectPokemon);

  const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151');
  const arrayPokemons = data.results;
  arrayPokemons.unshift({
    name: 'Pokemon name',
    value: '',
  });

  for (let i = 0; i < arrayPokemons.length; i++) {
    const namePokemon = arrayPokemons[i].name;
    const option = document.createElement('option');
    option.textContent = namePokemon;
    option.value = arrayPokemons[i].url;
    selectPokemon.appendChild(option);
  }
  selectPokemon.addEventListener('change', (option) => {
    const pokemonUrl = option.target.value;
    fetchImage(pokemonUrl);
  });
}

async function fetchImage(pokemonUrl) {
  try {
    if (document.querySelector('img')) {
      document.querySelector('img').remove();
    }
    const imgPokemon = document.createElement('img');
    imgPokemon.alt = 'Pokemon picture';
    const imgUrl = await fetchData(pokemonUrl);
    imgPokemon.src = imgUrl.sprites.other.dream_world.front_default;
    document.body.appendChild(imgPokemon);
  } catch (error) {
    throw new Error('Fetch IMAGE Error', error);
  }
}

function main() {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Get Pokemon';
  button.style.width = '20%';
  document.body.appendChild(button);
  button.addEventListener('click', () => {
    fetchAndPopulatePokemons();
  });
}

window.addEventListener('load', main);
