import React, { useState, useEffect } from "react";
import * as ServicesService from '../../services/services.service'
import { CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom'
import * as AuthService from '../../services/auth.service'

export default function PageAllServices() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        setLoading(true)
        ServicesService.getStatsServices()
            .then(response => {
                setServices(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const user = AuthService.getUser();
        if (user?.rol === 1) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [])

    return (
        <main className="container listServices">
            <div className="header">
                <h1>Lista de servicios</h1>
                {isAdmin &&
                    <Link to={'/dashboard/services/new'} className="btn btn-primary mt-2">Agregar un servicio</Link>
                }
            </div>

            {loading &&
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            }

            {!loading && services.length > 0 &&
                <div className="row">
                    {services.map((service, index) => (
                        <div className="col-2 col-md-3" key={index}>
                            <Link to={`/dashboard/services/${service.id}`}>
                                <div className="card">
                                    <img src={require(`../../assets/img/services/${index}.png`)} className="card-img-top" alt={service.name} />
                                    <h2>{service.name}</h2>
                                    <p className="count"> {service.count} </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            }



        </main>
    );
}
