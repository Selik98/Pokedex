const pokeList = document.querySelector('#pokemon-list');
const buscador = document.querySelector('#buscador');
const pokemonLiList = document.querySelectorAll('.pokemon');
const elements = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Steel", "Fairy"]
const nav = document.querySelector('.elementos')





const fetchPokemons = async () => {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

    for (let i = 1; i <= 150; i++) {
        try {
            const response = await fetch(apiEndpoint + i);
            const pokemonData = await response.json();

            const pokemon = {
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                type: pokemonData.types.map(currentType => currentType.type.name).join(', '),
                id: pokemonData.id
            }

            // Creamos la etiqueta li
            let pokemonLi = document.createElement('li');

            // Le agregamos estilos, un ID único  y un innerHTML
            pokemonLi.id = `pokemon-${pokemon.id}`;
            pokemonLi.classList.add('pokemon')
            //pokemonLi.setAttribute('href', 'asdfaesdf') otra forma de agregar atributos

            const pokemonImg = document.createElement('img');
            pokemonImg.src = pokemon.image;
            pokemonLi.appendChild(pokemonImg);

            /*
            const pokemonType = document.createElement('p');
            pokemonType.innerText = pokemon.type;
            pokemonLi.appendChild(pokemonType);
            console.log(pokemon.type)*/

            const pokemonType = document.createElement('p');
            pokemonType.classList.add('classes')

            // Dividir la cadena en un array de palabras
            const typeWords = pokemon.type.split(', ');

            typeWords.forEach(word => {
                // Eliminar las comas y crear una clase con el nombre de la palabra
                const className = word.toLowerCase();

                // Crear un elemento span para cada palabra
                const typeSpan = document.createElement('span');
                typeSpan.textContent = word;

                // Agregar la clase al elemento span
                typeSpan.classList.add(className);

                // Agregar el elemento span al párrafo
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
            // Al ul le agregamos cada LI como hijo
            pokeList.appendChild(pokemonLi);

        } catch (error) {
            console.error(error);
        }
    }
}

// Agregamos el eventListener de input para responder a cuando el usuario ingresa su búsqueda
buscador.addEventListener('input', e => {
    // Cada vez que el usuario escriba algo, llamamos a la función searchPokemon y le pasamos como parámetro lo que el usuario escribió
    searchPokemon(e.target.value);
});

// La función searchPokemon se encargará de recibir una búsqueda, y hará desaparecer a todos los pokemones cuyo nombre no coincida con la búsqueda
const searchPokemon = search => {
    // Creamos un array que contiene todos los nombres de pokemon (todos son etiquetas h2)
    const pokemonNameList = Array.from(document.querySelectorAll('.pokemon h2'));

    // Usamos un forEach para poder evaluar cierta condición para cada nombre de pokemón
    pokemonNameList.forEach(pokemonName => {
        // Si el texto del h2 actual no contiene la búsqueda (lo que el usuario ingresó)

        if (!pokemonName.innerText.includes(search.toUpperCase())) {
            // Al padre del h2 actual le ponemos display none
            pokemonName.parentElement.style.display = 'none';
        } else {
            pokemonName.parentElement.style.display = 'list-item';
        }
    })
}
fetchPokemons();

let selectedElements = []

elements.forEach((element, index) => {
    const button = document.createElement('button');
    button.textContent = element;
    button.classList.add(element.toLowerCase());

    button.addEventListener('click', () => {
        const allClass = Array.from(document.querySelectorAll('.classes'));
        const clase = button.innerHTML.toLowerCase();

        // Verifica si el tipo ya está en el array y lo agrega o lo elimina
        if (selectedElements.includes(clase)) {
            selectedElements = selectedElements.filter(element => element !== clase);
        } else {
            selectedElements.push(clase);
        }

        allClass.forEach(currentClass => {
            // Verifica si al menos un tipo seleccionado coincide con el tipo del Pokémon
            const shouldDisplay = selectedElements.length === 0 || selectedElements.some(currentElement => currentClass.innerHTML.includes(currentElement));
            currentClass.parentElement.style.display = shouldDisplay ? 'list-item' : 'none';
        });

        // Cambia la opacidad de los botones según los elementos seleccionados
        elements.forEach((element, index) => {
            const button = document.querySelector(`.${element.toLowerCase()}`);
            button.style.opacity = selectedElements.includes(element.toLowerCase()) ? '0.8' : '1';
        });

        console.log(selectedElements);
    });

    nav.appendChild(button);
});




