function Footer() {

    const date = new Date();

    return (
        <div className="fixed-bottom">
            Vive la France !
            Nous sommes le {date.toLocaleString()}
        </div>
    );
}

function FooterBis() {
    return (
        <div>
            Vive la France, nom de Dieu !
        </div>
    );
}

export { FooterBis };

export default Footer;