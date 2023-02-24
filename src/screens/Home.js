import '../styles.css';
import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from "../components/NavBar";


function Home() {

    return (
        <>
            <NavBar />
            <div className="d-flex" >
                <div className="d-flex" style={{backgroundColor: "#F07839", width: "50%", alignItems: "center", justifyContent: "center" }} >
                    <h2 className="largeFont">
                        CT STOCK
                    </h2>
                </div>
                <div className="text-center m-5-auto">
                    <h2>Fazer login</h2>
                    <form action="/home">
                        <p>
                            <label>Usuário</label><br />
                            <input type="text" name="first_name" required />
                        </p>
                        <p>
                            <label>Senha</label>
                            <br />
                            <input type="password" name="password" required />
                        </p>
                        <p>
                            <label>Token (opcional)</label>
                            <br />
                            <input type="password" name="password" required />
                        </p>
                        <p>
                            <button id="sub_btn" type="submit">Login</button>
                        </p>
                    </form>
                    <footer>
                        <p>Primeiro acesso? <Link to="/register">Criar uma conta</Link>.</p>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Home;