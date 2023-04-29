import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from '../../services/auth.service'
import login from '../../assets/img/index.png'
import logo from '../../assets/img/logo-color.png'

function Login() {
    let navigate = useNavigate();

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([])
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        authService.login(email, password)
            .then((response) => {
                if (response.status === 200) {
                    setError("")
                    onLogin(response.data, response.token)
                } else if (response.status === 500) {
                    setError("Usuario o contraseña incorrectos")
                }
            })

    }

    function onLogin(data, token) {
        authService.setUser(data)
        authService.setToken(token)

        if (data.email_verified_at === null) {
            navigate('/verification')
        }
        if (data.rol === 1) {
            navigate('/dashboard/admin')
        } else if (data.rol === 2) {
            navigate('/dashboard')
        }
    }


    return (
        <section className="login">
            <section className="row">
                <div className="col-md-6">
                    <img src={login} alt="" />
                </div>

                <div className="col-md-6 start">
                    <img src={logo} alt="" />
                    <form onSubmit={handleSubmit}>
                        {error !== "" &&
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        }
                        <div className="mb-3">
                            <label htmlFor="email" className="visually-hidden" required>Email</label>
                            <input placeholder="Ingrese su correo electronico" type="text" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="visually-hidden" required>Contraseña</label>
                            <input placeholder="Ingrese su contraseña" type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>

                        <div className="text-center mt-0 botones-login">
                            <button className="btn btn-primary" type="submit">Ingresar</button>
                            <Link className="btn-default fw-bold fs-6 mb-2" to={'/recuperation-password'}> ¿Olvidaste tu contraseña?</Link>
                            <Link className="btn btn-secondary" to={'/register'}> Registrate</Link>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    );
}

export default Login;