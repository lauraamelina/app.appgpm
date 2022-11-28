import React , {useState}from "react";
import { Link } from "react-router-dom";
import * as authService from '../components/services/auth.service'

// import {useNavigate} from "react-router-dom";

import login from '../assets/img/index.png'
import logo from '../assets/img/logo-color.png'

function Login() {
    // let navigate = useNavigate();

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([])
    const [error, setError] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        authService.login(email, password)
        .then(res => console.log(res))
        .catch(res => console.log(res.error))
    }


    return (
       <main className="login">
            <section className="row">
                <div className="col-md-6">
                    <img src={login} alt="" />
                </div>
                <div className="col-md-6 start">
                    <img src={logo} alt="" />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="visually-hidden" required>Nombre</label>
                            <input placeholder="Ingrese su correo electronico" type="text" className="form-control" id="email" value={email} onChange={e=> setEmail(e.target.value)} required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="visually-hidden" required>Contraseña</label>
                            <input placeholder="Ingrese su contraseña" type="password" className="form-control" id="password" value={password} onChange={e=> setPassword(e.target.value)} required/>
                        </div>

                        <div className="text-center mt-0 botones-login">
                            <button className="btn btn-primary" type="submit">Ingresar</button>
                            <Link className="btn-default fw-bold fs-6 mb-2" to={'/recuperacion'}> ¿Olvidaste tu contraseña?</Link>
                            <Link className="btn btn-secondary" to={'/registro'}> Registrate</Link>
                        </div>
                    </form>
                </div>
            </section>
       </main>
    );
}

export  default Login;