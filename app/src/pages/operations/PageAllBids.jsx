import React, { useState, useEffect } from "react";
import * as DemandsService from '../../services/demands.service'
import CircularProgress from '@mui/material/CircularProgress';
import AllProducts from "../../components/operations/AllProducts";
import { Link } from "react-router-dom";

export default function PageAllBids() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        DemandsService.getAllDemands()
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
    }, [])

    return (
        <main className="container">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="mb-0">Market Bids</h1>
                <Link to="/dashboard/demands/new" className="btn btn-primary">Agregar nuevo Bid</Link>
            </div>
            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }

            {!loading && products !== [] && (
                <AllProducts products={products} />
            )}

            {!loading && products.length === 0 && (
                <div className="not-exist">
                    <p>No hay bids</p>
                    <Link to="/dashboard/demands/new" className="btn btn-primary">Agregar nuevo bid</Link>
                </div>
            )}

        </main>
    )
}