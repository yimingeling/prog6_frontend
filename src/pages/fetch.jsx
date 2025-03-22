
import React, {useState, useEffect} from 'react';

function ProductComponent() {
    const [pokemonList, setPokemonList] = useState([]);


    useEffect(() => {
        async function fetchPokemonList() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10'); // Adjust limit as needed
                const data = await response.json();
                setPokemonList(data.results); // `data.results` contains the array of Pokémon
            } catch (error) {
                console.error('Fout bij het ophalen van het Product.jsx:', error);
            }
        }

        fetchPokemonList();
    }, []); // Lege array zorgt ervoor dat useEffect alleen bij de eerste render wordt uitgevoerd.

    return (
        <div>
            <ul>
                {pokemonList.map((pokemon, index) => (
                    <li key={index}>
                        <h2>{pokemon.name}</h2>
                        <a href={pokemon.url} target="_blank" rel="noopener noreferrer">
                            View Details
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductComponent;