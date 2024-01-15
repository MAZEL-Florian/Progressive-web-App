import { useState } from "react";
import Button from "./Button";

function Counter(props) {

    function increment() {
        setNumber(number + 1)
    }


    const [number, setNumber] = useState(0);
    return (
        <div className="w-500">
            <h3 className="text-center">Compteur</h3>

            <div>
                <h4>{number}</h4>
                <div className="mx-5">
                    <Button
                        className="btn-secondary mx-5"
                        onClick={increment}
                        name="incrémenter"
                    />
                    <Button 
                        className="btn btn-secondary mx-5"
                        onClick={() => setNumber(number - 1)}
                        name="décrémenter"
                    />
                </div>
            </div>
        </div>
    )
}

export default Counter