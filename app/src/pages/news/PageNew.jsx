import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import * as ProductService from '../../services/products.service'
import * as NewsService from '../../services/news.service'
import NewForm from "../../components/news/NewForm";
import Swal from "sweetalert2";


export default function PageNew() {
    let navigate = useNavigate()
    const [dataProductsName, setDataProductsName] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        ProductService.getProductsName()
            .then((res) => {
                setLoading(false)
                setDataProductsName(res.data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    const onSubmit = (data) => {
        setLoading(true)
        NewsService.createNew(data)
            .then((res) => {
                setLoading(false)
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Noticia publicada',
                        text: 'La noticia se publicó correctamente',
                        confirmButtonColor: '#145388'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate(`/dashboard/news/${res?.data?.id}`)
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrió un error al publicar la noticia',
                        confirmButtonColor: '#145388'
                    })
                }
            })

    }

    return (
        <main className="container">
            <h1>Agregar nueva noticia</h1>
            <NewForm dataProductsName={dataProductsName} loading={loading} onSubmit={onSubmit} />

        </main>
    );
}