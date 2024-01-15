import React, { useState, useEffect } from 'react';

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit odio a nisi venenatis finibus.`;

function Typer() {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [countdown, setCountdown] = useState(3);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let interval = null;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && isTyping) {
            setStartTime(Date.now());
            clearInterval(interval);
        } else if (isTyping) {
            const timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(timer);
        }
        return () => clearInterval(interval);
    }, [countdown, isTyping, startTime]);
    
    const handleStart = () => {
        setIsTyping(true);
        setUserInput('');
        setCountdown(3);
    };
    
    const handleInputChange = (e) => {
        if (!isTyping) return;
        const input = e.target.value;
        setUserInput(input);
        if (input === LOREM_IPSUM) {
            setIsTyping(false);
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }
    };
    
    return (
        <div className="m-5 d-flex">
            <div className="p-2 flex-grow-1 border">
                {LOREM_IPSUM}
            </div>
            <div className="p-2 flex-grow-1">
                {!isTyping && (
                    <button className="btn btn-primary" onClick={handleStart}>
                        Démarrer !
                    </button>
                )}
                {isTyping && countdown > 0 && <div>Début dans {countdown}...</div>}
                {isTyping && countdown === 0 && (
                    <textarea
                        className="form-control"
                        value={userInput}
                        onChange={handleInputChange}
                        disabled={!isTyping}
                    ></textarea>
                )}
                {!isTyping && elapsedTime !== null && (
                    <div>
                        {elapsedTime} secondes!
                    </div>
                )}
            </div>
        </div>
    );
}

export default Typer;    