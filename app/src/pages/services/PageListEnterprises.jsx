import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as ServicesServices from '../../services/services.service'
import { CircularProgress } from "@mui/material";
import TableEnterprises from '../../components/services/TableEnterprises'

export default function PageListEnterprises() {
    const { id } = useParams()
    const [enterprises, setEnterprises] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        ServicesServices.getEnterprises(id)
            .then((response) => {
                setLoading(false)
                setEnterprises(response.data)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }, [id])

    return (
        <main>
            <h1>Lista de Empresas</h1>
            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }

            {!loading &&  enterprises.length !== 0  &&
                <TableEnterprises enterprises={enterprises} />
            }


            {!loading && enterprises.length === 0 &&
                <div className="not-exist">
                    <h2>No hay empresas</h2>
                    <Link className="btn btn-primary mt-2" to={'/dashboard/services/list'}>Volver</Link>
                </div>
            }

        </main>

    )

}