import React from 'react';
import { Link } from 'react-router-dom';
import * as AdsService from '../../services/ads.service'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import Swal from 'sweetalert2'
import ImgGenerica from '../../../src/assets/img/img_generica.png'

export default function CardAd({ ad, updateAds }) {

    function getImage(image) {
        if (image) {
            return `https://api.appgpm.com/files/banners/${image}`
        } else {
            return ImgGenerica
        }
    }

    function formatedDate(date) {
        let dateFormated = new Date(date);
        return dateFormated.toLocaleDateString()
    }

    function approveAd(id) {
        const is_approved = ad?.is_approved
        Swal.fire({
            title: '¿Estás seguro?',
            text: `${is_approved ? 'Desaprobarás' : 'Aprobarás'} el anuncio ${ad.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Sí, ${is_approved ? 'desaprobar' : 'aprobar'}`,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                AdsService.approveAd(id)
                    .then(response => {
                        Swal.fire({
                            title: `${is_approved ? 'Desaprobado' : 'Aprobado'}`,
                            text: `El anuncio ${ad.name} ha sido ${is_approved ? 'desaprobado' : 'aprobado'}`,
                            icon: 'success',
                            confirmButtonColor: '#145388',
                        })
                        updateAds()

                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo realizar la acción',
                            icon: 'error',
                            confirmButtonColor: '#145388',
                        })
                    })
            }
        })
    }

    function deleteAd(idCampaign, idAd) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Eliminarás el anuncio ${ad.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Sí, eliminar`,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                AdsService.deleteAd(idCampaign, idAd)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                title: `Eliminado`,
                                text: `El anuncio ${ad.name} ha sido eliminado`,
                                icon: 'success',
                                confirmButtonColor: '#145388',
                            })
                            updateAds()
                        } else {
                            Swal.fire({
                                title: 'Error',
                                text: 'No se pudo realizar la acción',
                                icon: 'error',
                                confirmButtonColor: '#145388',
                            })
                        }
                    })
            }
        })
    }

    return (
        <div className="card">
            <img src={getImage(ad?.banner?.filename)} alt={ad.name} />
            <div className='px-3 pt-2'>
                <h2>{ad.name}</h2>
                <p> <span className='visually-hidden'>Descripción:</span> {ad.description}</p>
                <div className="icons mb-3">
                    <p><span className='visually-hidden'>Fecha de creación:</span> <CalendarMonthIcon /> {formatedDate(ad.created_at)}</p>
                    <p><span className='visually-hidden'>Estado:</span> {ad.is_approved ? <CheckCircleIcon color='success' /> : <UnpublishedIcon color='error' />} {ad.is_approved ? 'Aprobado' : 'No aprobado'}</p>
                </div>
                <div className="icons mb-0">
                    <p><span className='visually-hidden'>Clicks:</span> <AdsClickIcon /> {ad.clicks}</p>
                    <p><span className='visually-hidden'>Vistas:</span> <VisibilityIcon /> {ad.views}</p>
                </div>

                <div className="buttons">
                    <Link to={`/dashboard/campaigns/${ad.campaign_id}/ads/${ad.id}`} className="btn btn-primary">Ver</Link>
                    {ad.is_approved ?
                        <button className="btn btn-danger" onClick={() => approveAd(ad.id)}>{ad.is_approved ? 'Desaprobar' : 'Aprobar'}</button>
                        :
                        <>
                            <button className="btn btn-success" onClick={() => approveAd(ad.id)}>Aprobar</button>
                            <button className="btn btn-danger" onClick={() => deleteAd(ad.campaign_id, ad.id)}>Eliminar</button>
                        </>

                    }

                </div>

            </div>
        </div>
    )
}