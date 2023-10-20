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
        
        stats.appendChild(h4Height);  // Agrega el elemento de altura
        stats.appendChild(h4Weight);  // Agrega el elemento de peso
        console.log(pokemonData.weight)
        
        
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
