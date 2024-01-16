import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

function PokemonDetails() {
    const { pokemonName } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            const data = await response.json();
            setPokemonDetails(data);
        };

        if (pokemonName) {
            fetchPokemonDetails();
        }
    }, [pokemonName]);

    if (!pokemonDetails) return <div>Chargement...</div>;

    return (
        <div className='text-center'>
            <Header />
            <h1>{pokemonDetails.name}</h1>
            <img src={pokemonDetails.sprites.other.showdown.front_default} alt={pokemonDetails.name} />
            <p><b>Poids :</b> {pokemonDetails.weight / 10} kg</p>
            <p><b>Taille :</b> {pokemonDetails.height / 10} m</p>
            <p><b>Type(s) :</b> {pokemonDetails.types.map((typeInfo, index) => (
                <span key={index}>
                    {typeInfo.type.name}{index < pokemonDetails.types.length - 1 ? ', ' : ''}
                </span>
            ))}</p>
            <p><b>Capacités :</b> {pokemonDetails.abilities.map((abilityInfo, index) => (
                <span key={index}>
                    {abilityInfo.ability.name}{index < pokemonDetails.abilities.length - 1 ? ', ' : ''}
                </span>
            ))}</p>
        </div>
    );
}

export default PokemonDetails;
