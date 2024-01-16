import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="bg-secondary text-center p-2" style={{ width: '100%' }}>
            <Link to="/" className="text-decoration-none text-white" style={{ display: 'block', fontSize: '20px' }}>
                Retour à l'accueil
            </Link>
        </div>
    );
}

export default Header;
