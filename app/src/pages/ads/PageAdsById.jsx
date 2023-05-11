import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as AdsService from '../../services/ads.service'
import { CircularProgress } from "@mui/material";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImgGenerica from '../../../src/assets/img/img_generica.png'


export default function PageAdsById() {
    let { idCampaign } = useParams();
    let { idAd } = useParams();
    const [loading, setLoading] = useState(false)
    const [ad, setAd] = useState([])

    useState(() => {
        setLoading(true)
        AdsService.getAdById(idCampaign, idAd)
            .then(response => {
                setAd(response.data);
                setLoading(false);
                console.log(response.data)
            })
        //eslint-disable-next-line
    }, [])

    function formattedDate(date) {
        let newDate = new Date(date)
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${day}/${month}/${year}`
    }

    function getImage(image) {
        if (image) {
            return `https://api.appgpm.com/files/banners/${image}`
        } else {
            return ImgGenerica
        }
    }

    return (
        <main className="adById">
            {loading &&
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            }
            {!loading && ad.length !== 0 &&
                <>
                    <h1>Anuncio: {ad.name}</h1>
                    <p className="state"> { ad.is_approved === 1 ? <span className="approved">Activo</span> : <span className="not_approved">Inactivo</span> } </p>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p> <strong>Descripción del anuncio: </strong> {ad?.description}</p>
                            <p> <strong>Fecha de creación: </strong> {formattedDate(ad?.created_at)}</p>
                            <div className="mt-5">
                                <h2>Campaña: {ad?.campaign?.name}</h2>
                                <p> <strong>Descripción de la campaña: </strong> {ad?.campaign?.description}</p>
                                <p> <strong>Fecha de creación: </strong> {formattedDate(ad?.campaign?.created_at)}</p>
                            </div>

                            <div className="d-flex justify-content-between pe-4 mb-4">
                                <p><span className='visually-hidden'>Clicks:</span> <AdsClickIcon /> {ad.clicks}</p>
                                <p><span className='visually-hidden'>Vistas:</span> <VisibilityIcon /> {ad.views}</p>
                            </div>

                            <Link to="/dashboard/campaigns/ads/list" className="btn btn-primary">Volver a anuncios</Link>
                        </div>

                        <div className="col-12 col-md-6 text-center">
                            <img src={getImage(ad?.banner?.filename)} alt={ad.name} />
                        </div>
                    </div>
                </>
            }

        </main>
    )

}