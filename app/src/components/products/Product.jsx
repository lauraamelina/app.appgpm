import React from 'react';
import Img from '../../assets/img/img_generica.png'


export default function ProductUser({ product, isUserProduct }) {
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

    function getImage(image) {
        if (image) {
            return `https://api.appgpm.com/files/products/${image}`
        } else {
            return Img
        }
    }

    return (
        <section className='container productId'>
            <div>
                <div className="product">
                    <h2>{product?.nombre_producto?.nombre}</h2>
                    <ul>
                        <li> <span>Vendedor: </span>{product?.vendedor_id}</li>
                        <li> <span>Tipo de producto: </span>{getTypes()}</li>
                        <li> <span>Año de Producción: </span>{product?.ano_produccion}</li>
                        <li> <span>Volumen: </span>{product?.volumen}</li>
                        <li> <span>País de Origen: </span>{product?.country?.nombre}</li>
                        <li> <span>Incoterms: </span>{product?.incoterm?.nombre}</li>
                    </ul>
                </div>

                <div className="buttons">
                    {isUserProduct && (<>
                        <button className="btn btn-success mb-2">Más información del producto</button>
                        <button className="btn btn-danger">Eliminar</button>
                    </>)}

                    {!isUserProduct && (<>
                        <button className="btn btn-primary mb-2">Comprar producto</button>
                        <button className="btn btn-success mb-2">Más información del producto</button>
                        <button className="btn btn-secondary">Chatear con el vendedor</button>
                    </>)}
                </div>
            </div>

            <div className="images">
                <p className="precio"> {product?.precio} USD/TN</p>
                <img src={getImage(product?.image?.imagen)} alt={product?.nombre_producto?.nombre} />
                <div className="images_list">
                    {product?.images?.map((image, index) => {
                        return (
                            <img key={index} src={getImage(image?.imagen)} alt={product?.nombre_producto?.nombre} />
                        )
                    })}
                </div>
            </div>


        </section>
    )
}