import { Link } from "react-router-dom";
import printer from "../assets/computer-printer.png";
import settings from "../assets/gear.png";
import signIn from "../assets/signIn.png";
import sino from "../assets/sino.png";
import '../styles.css';

export default function NavBar() {

    return (
        <div className="navBar" style={{ boxShadow: '1px 1px 9px #CCCDCD' }}>
            <span className="divPrinterIcon">
                <img id="printerIcon" src={printer} alt="icone de impressora" />
            </span>
            <span className="midNavBar mt-3" >
                <Link style={{textDecoration: "none"}} to="/" ><p title="home">Home</p></Link>
                <Link style={{textDecoration: "none"}} to="/Printer-Customizer" ><p title="servicos">Impressora</p></Link>
                <Link style={{textDecoration: "none"}} to="/Three-Ropes" ><p title="ThreeRopes">Leitura Nº Serie</p></Link>
                <Link style={{textDecoration: "none"}} to="/Validation-Order" ><p title="Reader">Validação BarCode</p></Link>
            </span>
            <span className="divRigthNavBar">
                <img className="navBarIcons" id="sinoIcon" src={sino} alt="desc" />
                <img className="navBarIcons" id="settingsIcon" src={settings} alt="botão de configurações" />
                <img className="navBarIcons" id="signInIcon" src={signIn} alt="desc" />
            </span>
        </div>
    )
}