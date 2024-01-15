import React, { useState, useEffect } from "react";

const url = 'http://api.weatherapi.com/v1/current.json?key=72361dc0de984631970174354230208&q=Nimes';

function Weather() {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTemperature(data.current.temp_c);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données météo", error);
            });
    }, []);

    if (temperature !== null) {
        return <div>Il fait {temperature}°C à Nîmes</div>;
    } else {
        return <div>Chargement...</div>;
    }
}

export default Weather;
