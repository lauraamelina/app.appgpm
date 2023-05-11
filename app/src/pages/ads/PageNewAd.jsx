import React, {useEffect, useState} from "react";
import * as CampaignService from '../../services/campaigns.service'
import * as AdsService from '../../services/ads.service'
import FormNewAd from "../../components/ads/FormNewAd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PageNewAd () {
    let navigate = useNavigate()
    const [dataCampaign, setDataCampaign] = useState([])

    useEffect(() => {
        CampaignService.getCampaigns()
            .then(response => {
                setDataCampaign(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    function onSubmit(campaign_id, formData) {
        AdsService.createAd(campaign_id, formData)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Anuncio creado!',
                        text: 'El anuncio se ha creado correctamente',
                        confirmButtonColor: '#145388',
                    })
                    navigate('/dashboard/campaigns/ads/list')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, intenta nuevamente',
                        confirmButtonColor: '#145388',
                    })
                }
            })
    }


    return (
        <main className="newAd">
            <h1>Crear anuncio</h1>
            <FormNewAd dataCampaign={dataCampaign} onSubmit={onSubmit}/>

        </main>
    )
}