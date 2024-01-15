import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function Generation({ generationUrl }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [visible, setVisible] = useState(5);

    useEffect(() => {
        const fetchGeneration = async () => {
            const response = await fetch(generationUrl);
            const data = await response.json();
            setPokemonList(data.pokemon_species);
        };

        fetchGeneration();
    }, [generationUrl]);

    const renderPokemonRows = () => {
        const rows = [];
        for (let i = 0; i < visible; i += 5) {
            rows.push(
                <div className="row justify-content-center my-3" key={i}>
                    {pokemonList.slice(i, i + 5).map(pokemon => (
                        // Ajustement de la classe de colonne pour plus d'espacement
                        <div className="col-md-2 mx-2 d-flex align-items-stretch" key={pokemon.name}>
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex flex-column align-items-center border p-3 rounded">
                {renderPokemonRows()}
                {visible < pokemonList.length && (
                    <button className="btn btn-primary mt-3" onClick={() => setVisible(prev => prev + 5)}>Voir plus</button>
                )}
            </div>
        </div>
    );
}

export default Generation;
