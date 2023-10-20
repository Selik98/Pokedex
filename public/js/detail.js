// Selecciona el elemento con el ID 'selectedPokemon' y guarda una referencia en la variable 'selectedPokemon'.
const selectedPokemon = document.querySelector('#selectedPokemon');

// Divide el contenido de 'selectedPokemon' en una matriz de palabras usando un espacio como separador.
const showPokemon = selectedPokemon.innerHTML.split(' ');

// Selecciona el elemento con el ID 'pokemon' y guarda una referencia en la variable 'detailPokemon'.
const detailPokemon = document.querySelector('#pokemon');

// Selecciona el elemento con la clase 'pokeData' y guarda una referencia en la variable 'pokeData'.
const pokeData = document.querySelector('.pokeData');

// Selecciona el elemento con la clase 'info' y guarda una referencia en la variable 'info'.
const info = document.querySelector('.info');

// Selecciona el elemento con la clase 'stats' y guarda una referencia en la variable 'stats'.
const stats = document.querySelector('.stats');

// Selecciona el elemento con la clase 'size' y guarda una referencia en la variable 'size'.
const size = document.querySelector('.size');

// Selecciona el elemento con la clase 'previous' y guarda una referencia en la variable 'previous'con el H2 Dentro.
const previousH2 = document.querySelector('.previous h2');

// Selecciona el elemento con la clase 'next' y guarda una referencia en la variable 'next' con el H2 Dentro.
const nextH2 = document.querySelector('.next h2');

// Selecciona el elemento con la clase 'previous' y guarda una referencia en la variable 'previous'.
const previous = document.querySelector('.previous');

// Selecciona el elemento con la clase 'next' y guarda una referencia en la variable 'next'.
const next = document.querySelector('.next');

// Define una función llamada 'mayus' que toma un string y devuelve la versión capitalizada.
function mayus(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Define una función asincrónica 'fetchPokemons' para obtener datos de un Pokémon de la API.
const fetchPokemons = async () => {
    // Define la URL de la API de Pokémon.
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

    try {
        // Realiza una solicitud a la API para obtener datos del Pokémon seleccionado.
        const response = await fetch(apiEndpoint + showPokemon[1]);

        // Convierte la respuesta en formato JSON.
        const pokemonData = await response.json();

        // Extrae la información relevante del objeto 'pokemonData'.
        const pokemon = {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map(currentType => currentType.type.name).join(', '),
            id: pokemonData.id
        };

        console.log(pokemonData);


        // Muestra información del Pokémon en la consola.
        console.log(`Nombre: ${pokemon.name}`);
        console.log(`Tipo: ${pokemon.type}`);
        console.log(`ID: ${pokemon.id}`);

        // Establece el título del documento con el nombre del Pokémon capitalizado.
        document.title = mayus(pokemon.name) + ' | Pokedex';

        // Crea un encabezado h1 con el nombre del Pokémon en mayúsculas.
        const h1 = document.createElement('h1');
        h1.textContent = pokemon.name.toUpperCase();

        // Selecciona el elemento con la clase 'nombre' y agrega el encabezado h1.
        let name = document.querySelector('.nombre');
        name.appendChild(h1);

        // Selecciona el elemento con el ID 'image' y establece la fuente de la imagen del Pokémon.
        const image = document.querySelector('#image');
        image.src = pokemon.image;

        // Agrega los Stats Basicos
        const h4Height = document.createElement('h4');
        h4Height.textContent = `Height: ${pokemonData.height / 10} mts`;

        const h4Weight = document.createElement('h4');
        h4Weight.textContent = `Weight: ${pokemonData.weight / 10} kgs`;


        size.appendChild(h4Height);  // Agrega el elemento de altura
        size.appendChild(h4Weight);  // Agrega el elemento de peso

        const ulAbilities = document.createElement('ul');
        ulAbilities.classList.add('abilities');
        stats.appendChild(ulAbilities);  // Agrega el elemento de peso

        const abilities = document.createElement('h4');
        abilities.textContent = 'Habilities:';
        ulAbilities.appendChild(abilities);  // Agrega el elemento de peso



        for (let i = 0; i < pokemonData.abilities.length; i++) {
            let liAbility = document.createElement('li');
            const element = pokemonData.abilities[i].ability.name;
            // Agrega la clase "ability" al <li>
            liAbility.classList.add('ability');
            liAbility.textContent = element; // Establece el texto del <li> con el nombre de la habilidad
            ulAbilities.appendChild(liAbility); // Agrega el <li> al <ul>
        }

        // Crea un párrafo para mostrar el tipo(s) del Pokémon.
        const pokemonType = document.createElement('p');
        pokemonType.classList.add('classes');

        // Divide la cadena de tipos en palabras individuales.
        const typeWords = pokemon.type.split(', ');


        // Agrega un encabezado h4 y el párrafo de tipos al elemento con la clase 'info'.

        const h5 = document.createElement('h5');
        h5.textContent = 'Type:';
        info.appendChild(h5);
        info.appendChild(pokemonType);

        // Itera a través de los tipos y crea elementos span para cada uno.
        typeWords.forEach(word => {
            const className = word.toLowerCase();
            const typeSpan = document.createElement('span');
            typeSpan.textContent = word;
            typeSpan.classList.add(className);
            pokemonType.appendChild(typeSpan);
        });



    } catch (error) {
        // Muestra un mensaje de error en la consola si ocurre un problema.
        console.error(error);
    }
}

// Llama a la función 'fetchPokemons' para obtener los datos del Pokémon.
fetchPokemons();

// Obtiene el número de Pokémon del elemento 'selectedPokemon'.
let nPokemon = selectedPokemon.innerText.split(' ')[1];

// Formatea el número del Pokémon para que tenga 3 dígitos.
if (nPokemon < 10) selectedPokemon.innerText = 'N° 00' + nPokemon;
else if (nPokemon < 100) selectedPokemon.innerText = 'N° 0' + nPokemon;


const fetchAdjacentPokemons = async (apiEndpoint) => {
    let currentNumber = parseInt(showPokemon[1]);
    let previousNumber, nextNumber;

    // Ajusta los números de Pokémon anterior y siguiente según los casos especiales
    if (currentNumber === 1) {
        previousNumber = 150; // Si el Pokémon actual es 1, el anterior es 150.
        nextNumber = currentNumber + 1;
    } else if (currentNumber === 150) {
        previousNumber = currentNumber - 1;
        nextNumber = 1; // Si el Pokémon actual es 150, el siguiente es 1.
    } else {
        previousNumber = currentNumber - 1;
        nextNumber = currentNumber + 1;
    }
    
    const previousResponse = await fetch(apiEndpoint + previousNumber);
    const nextResponse = await fetch(apiEndpoint + nextNumber);

    const previousPokemonData = await previousResponse.json();
    const nextPokemonData = await nextResponse.json();

    const previousPokemonName = previousPokemonData.name.toUpperCase();
    const nextPokemonName = nextPokemonData.name.toUpperCase();

    // Obtén el ID de los Pokémon anteriores y siguientes
    const previousPokemonID = previousPokemonData.id;
    const nextPokemonID = nextPokemonData.id;

    // Modifica el contenido de los elementos 'previous' y 'next' con el enlace
    previous.innerHTML = `
        <a class= "previous" href="/pokemon/${previousPokemonID}">
        <img class="logo" src="/img/previous.png">
            <h2>Previous Pokemon: ${previousPokemonName}</h2>
        </a>`;
    
    next.innerHTML = `
        <a class= "next" href="/pokemon/${nextPokemonID}">
            <h2>Next Pokemon: ${nextPokemonName}</h2>
            <img class="logo" src="/img/next.png">
        </a>`;


}

// Define la URL base de la API de Pokémon.
const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

// Llama a la función para obtener datos del Pokémon anterior y siguiente juntos.
fetchAdjacentPokemons(apiEndpoint);