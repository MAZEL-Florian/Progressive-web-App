const weekdays = [
    "lundi", "mardi", "mercredi",
    "jeudi", "vendredi", "samedi", "dimanche"
];
function Agenda(props) {
    
    return (
        <div className="m-3">
            <ul>
                {weekdays.map((day) => (
                    <li>{day.toUpperCase()}</li>
                ))}
            </ul>
        </div>
    )
}

export default Agenda;