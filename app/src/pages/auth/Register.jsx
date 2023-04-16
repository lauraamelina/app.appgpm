import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo-color.png'

export default function Register() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([])
    const [error, setError] = useState('')


    function handleSubmit(e) {
        e.preventDefault()
        console.log("enviado")
    }

    return (
        <main className="login">
            <section className="row">
                <div className="col-md-6">
                    
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
    )
}