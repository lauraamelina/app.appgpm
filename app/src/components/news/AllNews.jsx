import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CardNewById from './CardNewById';

export default function AllNews({ news }) {
    const [filtered, setFiltered] = useState([])
    const [dataNameProducts, setDataNameProducts] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(6);
    const indexOfLastNew = currentPage * newsPerPage;
    const indexOfFirstNew = indexOfLastNew - newsPerPage;
    const currentNews = filtered?.sort((a, b) => a.created_at - b.created_at).slice(indexOfFirstNew, indexOfLastNew);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function filterNews() {
        if (search) {
            const filter = news.filter((item) => {
                return item?.nombre_producto?.nombre === search
            })
            setFiltered(filter)
        } else {
            setFiltered(news)
        }
    }

    useEffect(() => {
        const dataNameProducts = news.map((item) => {
            return {
                title: item?.nombre_producto?.nombre,
            }
        }).filter((value, index, self) => self.findIndex((item) => item.title === value.title) === index)

        setDataNameProducts(dataNameProducts)
        setFiltered(news)
    }, [news])

    useEffect(() => {
        filterNews()
        setCurrentPage(1)
        //eslint-disable-next-line
    }, [search])

    const nextPaginate = () => {
        if (currentPage < filtered?.length / newsPerPage) {
            paginate(currentPage + 1);
        }
    }
    const previousPaginate = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    }

    return (
        <div className='row allNews'>
            <div className='col-md-12'>
                <div>
                    <Link to={'/dashboard/news/new'} className='btn btn-primary'>Agregar nuevo artículo</Link>
                </div>
                <div className='form-group'>
                    <label htmlFor="search" className='visually-hidden'>Buscar por producto</label>
                    <select className='form-control' name="search" id="search" onChange={(e) => { setSearch(e.target.value) }} value={search}>
                        <option value="">Seleccione un producto</option>
                        {dataNameProducts?.length > 0 && dataNameProducts?.map((item, index) => {
                            return (
                                <option key={index} value={item?.title}>{item?.title}</option>
                            )
                        })}
                    </select>
                </div>

            </div>
            {currentNews?.length > 0 && currentNews?.map((item, index) => {
                return (
                    <CardNewById key={index} item={item}/>
                )
            })}
            <p>Página {currentPage} de {Math.ceil(filtered?.length / newsPerPage)}</p>

            {filtered?.length > newsPerPage && (
                <div className="pagination">
                    <button onClick={previousPaginate} className="btn btn-primary">Anterior</button>
                    <button onClick={nextPaginate} className="btn btn-primary">Siguiente</button>
                </div>
            )}

        </div>
    )
}