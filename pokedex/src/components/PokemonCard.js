function PokemonCard({ pokemon }) {
    function getImageSrcFromIndex(index) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
    }

    function getIndexFromUrl(url) {
        const parsedUrl = url.split('/');
        return parsedUrl[parsedUrl.length - 2];
    }

    const imageSrc = getImageSrcFromIndex(getIndexFromUrl(pokemon.url));

    return (
        <div>
            <h3>{pokemon.name}</h3>
            <img src={imageSrc} alt={pokemon.name} />
        </div>
    );
}

export default PokemonCard;
