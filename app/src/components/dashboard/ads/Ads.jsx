import React, { useEffect, useState } from 'react';
import * as AdsService from '../../../services/ads.service'

export default function Ads() {
    const [ads, setAds] = useState([])
    const [adsLoaded, setAdsLoaded] = useState(false)

    function getImage (image) {
        return `https://api.appgpm.com/files/banners/${image}`
    }

    useEffect(() => {
        setAdsLoaded(true)
        AdsService.getAds()
            .then((data) => {
                setAds(data.data)
                setAdsLoaded(false)
            })

    }, [])

    return (
        <div>
            <h2>Anuncios</h2>
            {adsLoaded ? <p>Cargando...</p> : ads.map((ad, index) => {
                return (
                    <div className='ad mb-3' key={index}>
                        <h3 className='visually-hidden'>{ad.name}</h3>
                        <p className='visually-hidden'>{ad.description}</p>
                        <img className='rounded' src={getImage(ad?.banner?.filename)} alt={ad.description} />
                    </div>
                )
            })}
        </div>
    )
}