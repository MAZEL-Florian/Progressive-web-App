import React, { useState, useEffect } from 'react';
import Generation from './components/Generation';
import Header from './components/Header';

function App() {
    const [generations, setGenerations] = useState([]);

    useEffect(() => {
        const fetchGenerations = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/generation/');
            const data = await response.json();
            setGenerations(data.results);
        };

        fetchGenerations();
    }, []);

    return (
        <div>
            <Header />
            {generations.map(generation => (
                <Generation key={generation.name} generationUrl={generation.url} />
            ))}
        </div>
    );
}

export default App;
