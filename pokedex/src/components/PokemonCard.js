import React from 'react';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ pokemon }) {
    const navigate = useNavigate();

    function getImageSrcFromIndex(index) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
    }

    function getIndexFromUrl(url) {
        const parsedUrl = url.split('/');
        return parsedUrl[parsedUrl.length - 2];
    }

    const imageSrc = getImageSrcFromIndex(getIndexFromUrl(pokemon.url));

    const handlePokemonClick = () => {
        navigate(`/${pokemon.name}`);
    };

    return (
        <div className="card" style={{ width: '18rem', cursor: 'pointer' }} onClick={handlePokemonClick}>
            <img src={imageSrc} className="card-img-top" alt={pokemon.name} />
            <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
            </div>
        </div>
    );
}

export default PokemonCard;
