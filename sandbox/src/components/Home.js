import Agenda from "./Agenda";
import Button from "./Button";
import Counter from "./Counter";
import Footer, { FooterBis } from "./Footer";

function home(props) {
    function onButtonPressed() {
        console.log('bouton appuyé');
    }
    return (
        <div>
            <br/>
      <Footer />
      <Button name="Soutenir la France" className="btn-primary" onClick={onButtonPressed} yelling />
      <br/>
      <Button name={5 + 3} className="btn-secondary" link="https://www.google.fr" />
      <Agenda />
      <br/>
      <Counter />
      <FooterBis />
        </div>
    )
}

export default home;