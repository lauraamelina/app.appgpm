import React, { useEffect, useState } from 'react'
import CardAd from './CardAd';


export default function CardsAds({ ads, updateAds }) {
    const [adsFiltered, setAdsFiltered] = useState(ads);
    const [search, setSearch] = useState('')
    const [state, setState] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage] = useState(6);
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = adsFiltered.slice(indexOfFirstAd, indexOfLastAd);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    function prevPage() {
        if (currentPage > 1) {
            paginate(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(ads.length / adsPerPage)) {
            paginate(currentPage + 1)
        }
    }

    useEffect(() => {
        let adsFiltered = ads.filter(ad => {
            return ad.name.toLowerCase().includes(search.toLowerCase()) || ad.description.toLowerCase().includes(search.toLowerCase())
        })

        if (state === 'approved') {
            adsFiltered = adsFiltered.filter(ad => {
                return ad.is_approved === 1
            })
        } else if (state === 'not-approved') {
            adsFiltered = adsFiltered.filter(ad => {
                return ad.is_approved === 0
            })
        } 

        setAdsFiltered(adsFiltered)
        setCurrentPage(1)
        // eslint-disable-next-line
    }, [search, state])


    return (
        <div className="cardsAds container">
            <div className="row">
                <div className="col-12 header">
                    <div className="input-group me-md-3">
                        <input id="search" type="text" className="form-control" placeholder="Buscar por nombre o descripción" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <select id='state' className="form-select" onChange={(e) => setState(e.target.value)}>
                            <option value="">Seleccionar estado</option>
                            <option value="approved">Aprobados</option>
                            <option value="not-approved">No aprobados</option>
                        </select>
                    </div>
                </div>
                {currentAds.map(ad => {
                    return (
                        <div className="col-12 col-md-4" key={ad.id}>
                            <CardAd ad={ad} updateAds={updateAds} />
                        </div>
                    )
                })}
            </div>

            <p>Página {currentPage} de {Math.ceil(adsFiltered?.length / adsPerPage)}</p>
            {adsFiltered?.length > adsPerPage && (
                <div className="pagination">
                    <button onClick={prevPage} className="btn btn-primary">Anterior</button>
                    <button onClick={nextPage} className="btn btn-primary">Siguiente</button>
                </div>
            )}
        </div>
    )







}