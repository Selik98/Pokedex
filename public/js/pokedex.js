// Selecciona elementos del DOM por sus identificadores.
const pokeList = document.querySelector('#pokemon-list');
const buscador = document.querySelector('#buscador');
const pokemonLiList = document.querySelectorAll('.pokemon');
const elements = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Steel", "Fairy"];
const nav = document.querySelector('.elementos');

// Función asincrónica para obtener datos de Pokémon desde una API.
const fetchPokemons = async () => {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

    // Itera desde 1 hasta 150 para obtener datos de los primeros 150 Pokémon.
    for (let i = 1; i <= 150; i++) {
        try {
            const response = await fetch(apiEndpoint + i);
            const pokemonData = await response.json();

            // Crea un objeto "pokemon" con datos relevantes.
            const pokemon = {
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                type: pokemonData.types.map(currentType => currentType.type.name).join(', '),
                id: pokemonData.id
            }

            const pokemonLink = document.createElement('a');
            pokemonLink.href = `/pokemon/${pokemon.id}`;

            // Crea la etiqueta <li> para cada Pokémon.
            let pokemonLi = document.createElement('li');

            // Agrega estilos, un ID único y contenido.
            pokemonLi.id = `pokemon-${pokemon.id}`;
            pokemonLi.classList.add('pokemon');

            const pokemonImg = document.createElement('img');
            pokemonImg.src = pokemon.image;
            pokemonLi.appendChild(pokemonImg);

            const pokemonType = document.createElement('p');
            pokemonType.classList.add('classes');

            // Divide la cadena de tipos en un array de palabras.
            const typeWords = pokemon.type.split(', ');

            // Itera sobre las palabras y crea elementos <span> para cada tipo y les asigna una clase con el nombre de dicho elemento.
            typeWords.forEach(word => {
                const className = word.toLowerCase();
                const typeSpan = document.createElement('span');
                typeSpan.textContent = word;
                typeSpan.classList.add(className);
                pokemonType.appendChild(typeSpan);
            });

            pokemonLi.appendChild(pokemonType);

            const pokemonName = document.createElement('h2');
            pokemonName.innerText = pokemon.name.toUpperCase();
            pokemonLi.appendChild(pokemonName);

            const pokemonNumber = document.createElement('p');
            if (pokemon.id < 10) pokemonNumber.innerText = `N.° 00${pokemon.id}`;
            else if (pokemon.id < 100) pokemonNumber.innerText = `N.° 0${pokemon.id}`;
            else pokemonNumber.innerText = `N.° ${pokemon.id}`;
            pokemonLi.appendChild(pokemonNumber);

            // Agrega cada Pokémon a la lista "pokeList" en el DOM.
            pokeList.appendChild(pokemonLink);
            pokemonLink.appendChild(pokemonLi);

        } catch (error) {
            console.error(error);
        }
    }
}

// Agrega un event listener al campo de búsqueda para filtrar Pokémon en tiempo real.
buscador.addEventListener('input', e => {
    // Llama a la función "searchPokemon" con el texto de búsqueda como parámetro.
    searchPokemon(e.target.value);
});

// Función para filtrar Pokémon según el texto de búsqueda.
const searchPokemon = search => {
    // Obtiene una lista de nombres de Pokémon.
    const pokemonNameList = Array.from(document.querySelectorAll('.pokemon h2'));

    // Itera sobre los nombres y oculta/muestra elementos según la búsqueda.
    pokemonNameList.forEach(pokemonName => {
        if (!pokemonName.innerText.includes(search.toUpperCase())) {
            pokemonName.parentElement.style.display = 'none';
        } else {
            pokemonName.parentElement.style.display = 'list-item';
        }
    });
}

// Llama a la función "fetchPokemons" para cargar la lista de Pokémon.
fetchPokemons();

let selectedElements = []

// Itera sobre la lista de elementos de tipo de Pokémon.
elements.forEach((element, index) => {
    // Crea botones para cada tipo de Pokémon.
    const button = document.createElement('button');
    button.textContent = element;
    button.classList.add(element.toLowerCase());

    // Agrega event listeners a los botones para filtrar por tipo.
    button.addEventListener('click', () => {
        const allClass = Array.from(document.querySelectorAll('.classes'));
        const clase = button.innerHTML.toLowerCase();

        // Verifica si el tipo ya está en el array y lo agrega o lo elimina.
        if (selectedElements.includes(clase)) {
            selectedElements = selectedElements.filter(element => element !== clase);
        } else {
            selectedElements.push(clase);
        }

        // Filtra Pokémon en base a los tipos seleccionados.
        allClass.forEach(currentClass => {
            const shouldDisplay = selectedElements.length === 0 || selectedElements.some(currentElement => currentClass.innerHTML.includes(currentElement));
            currentClass.parentElement.parentElement.style.display = shouldDisplay ? 'block' : 'none';
        });

        // Cambia la opacidad de los botones según los elementos seleccionados.
        elements.forEach((element, index) => {
            const button = document.querySelector(`.${element.toLowerCase()}`);
            button.style.opacity = selectedElements.includes(element.toLowerCase()) ? '0.8' : '1';
        });

        console.log(selectedElements);
    });

    // Agrega botones al contenedor "nav".
    nav.appendChild(button);
});
