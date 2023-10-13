const selectedPokemon = document.querySelector('#selectedPokemon')
const showPokemon = selectedPokemon.innerHTML.split(' ')
const detailPokemon = document.querySelector('#pokemon')
const pokeData = document.querySelector('#pokeData')

function mayus(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const fetchPokemons = async () => {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';


    try {
        const response = await fetch(apiEndpoint + showPokemon[1]);
        const pokemonData = await response.json();
        console.log(apiEndpoint + showPokemon[1]);


        const pokemon = {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map(currentType => currentType.type.name).join(', '),
            id: pokemonData.id
        }

        // A continuación, puedes usar los datos del Pokémon (nombre, imagen, tipo, etc.)
        // para mostrarlo en tu página web como lo desees.

        console.log(`Nombre: ${pokemon.name}`);
        console.log(`Tipo: ${pokemon.type}`);
        console.log(`ID: ${pokemon.id}`);

        document.title = mayus(pokemon.name) + ' | Pokedex'

        // Crear un elemento <h1> para el nombre del Pokémon
        const h1 = document.createElement('h1');
        h1.textContent = pokemon.name.toUpperCase();

        let name = document.querySelector('.nombre')
        // Agregar el elemento <h1> al elemento con id "pokemon"
        name.appendChild(h1);

        // Establecer la fuente de la imagen
        const image = document.querySelector('#image');
        image.src = pokemon.image;


    } catch (error) {
        console.error(error);
    }

}
fetchPokemons();