import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as AuthService from '../../services/auth.service'
import * as AdsService from '../../services/ads.service'
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import CardsAds from '../../components/ads/CardsAds'

export default function PageListAds() {
    let navigate = useNavigate()
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        if (user?.rol === 1) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user])

    useEffect(() => {
        if (isAdmin === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No tienes permisos para acceder a esta sección',
                showConfirmButton: true,
                confirmButtonText: 'Volver al inicio',
                confirmButtonColor: '#145388',
            }).then(() => {
                navigate('/dashboard');
            })
        }
        //eslint-disable-next-line
    }, [isAdmin])

    useEffect(() => {
        if (isAdmin) {
            setIsLoaded(true)
            AdsService.getAds()
                .then(response => {
                    setAds(response.data);
                    setIsLoaded(false);
                })
        } else {
            return
        }
        //eslint-disable-next-line
    }, [])

    function updateAds() {
        setIsLoaded(true)
        AdsService.getAds()
            .then(response => {
                setAds(response.data);
                setIsLoaded(false);
            })
    }


    return (
        <main className="campaigns">
            <div className="header">
                <h1>Lista de anuncios</h1>
                <Link className="btn btn-primary">Agregar nuevo anuncio</Link>
            </div>

            {!isLoaded && ads.length === 0 &&
                <div className="not-exist">
                    <p>No hay anuncios</p>
                </div>
            }

            {isLoaded &&
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            }

            {!isLoaded && ads.length > 0 &&
                <CardsAds ads={ads} updateAds={updateAds} />
            }
        </main>
    )
}