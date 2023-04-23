import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Img from '../../../assets/img/img_generica.png'

export default function CardProduct({ product }) {
    const [link, setLink] = useState('')
    const [img, setImg] = useState('')

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
            setLink(`/dashboard/products/${product?.id}`)
            setImg(`https://api.appgpm.com/files/products/${product?.image?.imagen}`)
        } else if (product?.image) {
            setLink(`/dashboard/demands/${product?.id}`)
            setImg(`https://api.appgpm.com/files/demands/${product?.image}`)
        } else {
            setImg(Img)
        }

    }, [product])

    return (
        <Link to={link}>
            <div className="product">
                <img src={img} alt={product?.nombre_producto?.nombre} />
                <h2>{product?.nombre_producto?.nombre}</h2>
                <ul>
                    {product?.user?.email && <li> <span>Publicado por: </span>{product?.user?.email}</li>}
                    <li> <span>Tipo de producto: </span>{getTypes()}</li>
                    {product?.ano_produccion && <li> <span>Año de Producción: </span>{product?.ano_produccion}</li>}
                    <li> <span>Volumen: </span>{product?.volumen}</li>
                </ul>
                <p className="precio"> {product?.precio} USD/TN</p>
            </div>
        </Link>
    )

}