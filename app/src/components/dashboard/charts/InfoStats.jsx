import React, { useEffect, useState } from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LayersIcon from '@mui/icons-material/Layers';


export default function InfoStats({ items }) {
    const [users, setUsers] = useState(0)
    const [products, setProducts] = useState(0)
    const [nameProducts, setNameProducts] = useState(0)

    useEffect(() => {
        if (items?.data) {
            setUsers(items?.data[0]?.value)
            setProducts(items?.data[1]?.value)
            setNameProducts(items?.data[2]?.value)
        } else {
            setUsers(0)
            setProducts(0)
            setNameProducts(0)
        }
    }, [items])

    return (
        <section className="infoStats">
            <div className="row">
                <div className="col-md-4 col-12">
                    <div>
                        <PeopleAltIcon />
                        <h3 className="h5">Usuarios</h3>
                        <p>{users}</p>

                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <div>
                        <LayersIcon />
                        <h3 className="h5">Productos</h3>
                        <p>{products}</p>
                    </div>

                </div>
                <div className="col-md-4 col-12">
                    <div>
                        <LayersIcon />
                        <h3 className="h5">Nombre de Productos</h3>
                        <p>{nameProducts}</p>
                    </div>

                </div>
            </div>
        </section>
    );
}