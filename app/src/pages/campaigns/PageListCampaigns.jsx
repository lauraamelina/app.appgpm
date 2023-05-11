import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthService from '../../services/auth.service'
import * as CampaignsService from '../../services/campaigns.service'
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import TableCampaigns from '../../components/campaigns/TableCampaigns'

export default function PageListCampaigns() {
    let navigate = useNavigate()
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

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
            CampaignsService.getCampaigns()
                .then(response => {
                    setCampaigns(response.data);
                    setIsLoaded(false);
                })
        } else {
            return
        }
        //eslint-disable-next-line
    }, [])

    function updateCampaigns() {
        setIsLoaded(true)
        CampaignsService.getCampaigns()
            .then(response => {
                setCampaigns(response.data);
                setIsLoaded(false);
            })
    }

    function addCampaign() {
        return () => {
            Swal.fire({
                title: `Agregar campaña`,
                confirmButtonColor: '#145388',
                html: `<div>
                            <label style="margin-left:3em"> Nombre del campaña: </label>
                            <input type="text" id="name" class="swal2-input" style="width:100%"> 
                        </div>
                        <div style="margin-top: 2em">
                            <label style="margin-left:3em"> Descripción de la campaña: </label>
                            <textarea id="description" class="swal2-input" style="width:100%"></textarea>
                        </div>`,
                focusConfirm: false,
                preConfirm: () => {
                    const name = Swal.getPopup().querySelector('#name').value
                    const description = Swal.getPopup().querySelector('#description').value
                    if (!name || !description) {
                        Swal.showValidationMessage(`Por favor ingrese todos los datos`)
                    }
                    return { name: name, description: description }
                }
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        CampaignsService.createCampaign(result.value.name, result.value.description)
                            .then(response => {
                                if (response.status === 200) {
                                    Swal.fire({
                                        title: 'Campaña agregada',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                        confirmButtonColor: '#145388',
                                    }).then((response) => {
                                        updateCampaigns()
                                    })

                                } else {
                                    Swal.fire({
                                        title: 'Error al agregar campaña',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                        confirmButtonColor: '#145388',
                                    })
                                }
                            })
                    }
                })
        }
    }


    return (
        <main className="campaigns">
            <div className="header">
                <h1>Lista de campañas</h1>
                <button className="btn btn-primary" onClick={addCampaign()}>Agregar nueva campaña</button>
            </div>

            {!isLoaded && campaigns.length === 0 &&
                <div className="not-exist">
                    <p>No hay campañas</p>
                </div>
            }

            {isLoaded &&
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            }

            {!isLoaded && campaigns.length > 0 &&
                <TableCampaigns campaigns={campaigns} updateCampaigns={updateCampaigns} />
            }
        </main>
    )
}