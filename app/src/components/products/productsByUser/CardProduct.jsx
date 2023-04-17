import React from "react";
import { Link } from 'react-router-dom'
import Img from '../../../assets/img/img_generica.png'

export default function CardProduct({ product }) {

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

    function getImage() {
        let image = product?.image?.imagen
        if (image) {
            return `https://api.appgpm.com/files/products/${image}`
        } else {
            return Img
        }
    }

    return (
        <Link to={`/dashboard/products/${product?.id}`}>
            <div className="product">
                <img src={getImage()} alt={product?.nombre_producto?.nombre} />
                <h2>{product?.nombre_producto?.nombre}</h2>
                <ul>
                    <li> <span>Tipo de producto: </span>{getTypes()}</li>
                    <li> <span>Año de Producción: </span>{product?.ano_produccion}</li>
                    <li> <span>Volumen: </span>{product?.volumen}</li>
                </ul>
                <p className="precio"> {product?.precio} USD/TN</p>
            </div>
        </Link>
    )

}