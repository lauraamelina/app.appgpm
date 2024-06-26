import React, { useState, useEffect } from 'react'
import Img from '../../assets/img/img_generica.png'
import { Link } from 'react-router-dom'

export default function CardMarketByUser({ product }) {
    const [img, setImg] = useState('')
    const [imgUser, setImgUser] = useState('')

    function formatedDate(date) {
        const dateFormated = new Date(date)
        const day = dateFormated.getDate()
        const month = dateFormated.getMonth() + 1
        const year = dateFormated.getFullYear()
        return `${day}/${month}/${year}`
    }

    function getTypes() {
        let types = [];
        if (product?.tipo1) {
            types.push(product?.tipo1)
        }
        if (product?.tipo2) {
            types.push(product?.tipo2)
        }
        if (product?.tipo3) {
            types.push(product?.tipo3)
        }
        return types.join(', ')
    }

    useEffect(() => {
        if (product?.image?.imagen) {
            setImg(`https://api.appgpm.com/files/products/${product?.image?.imagen}`)
        } 
        else {
            setImg(Img)
        }

        if (product?.seller?.avatar) {
            setImgUser(`https://api.appgpm.com/files/img/${product?.seller?.avatar}`)
        } else {
            setImgUser(Img)
        }
    }, [product])


    return (
        <Link to={`/dashboard/products/${product?.id}`}>
            <div className='card'>
                <div className="img-user">
                    <img src={imgUser} alt='Imagen del usuario' />
                </div>
                <h2>{product?.seller?.name ? product?.seller?.name : product?.user?.name }</h2>
                <p className='date'>{formatedDate(product?.created_at)}</p>

                <h3>{product?.nombre_producto?.nombre}</h3>
                <p>{getTypes()}</p>
                <div className="img-product">
                    <img src={img} alt="Imagen del producto" />
                </div>
            </div>
        </Link>
    )

}