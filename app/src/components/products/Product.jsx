import React from 'react';
import Img from '../../assets/img/img_generica.png'
import Swal from 'sweetalert2'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';

export default function ProductUser({ product, isUserProduct, deleteProduct }) {
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

    function detailsProduct() {
        Swal.fire({
            html:
                `
                <div>
                    <h3 style="font-size: 1em; font-weight: bolder; margin-bottom: .8em; font-family: 'Nunito', sans-serif !important;">Más información del producto</h3>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;"
                        <div style="width: 49% !important;">
                            <ul style="font-size: .7em; font-family: 'Nunito', sans-serif !important; text-align:left;"> 
                                <li> <strong>Blanqueados: </strong>${product?.blanqueados}</li>
                                <li> <strong>Granos decolorados: </strong>${product?.granos_decolorados}</li>
                                <li> <strong>Granos partidos: </strong>${product?.granos_partidos}</li>
                                <li> <strong>Insectos vivos: </strong>${product?.insectos_vivos}</li>
                                <li> <strong>Mercadería: </strong>${product?.mercaderia}</li>
                                <li> <strong>Puerto: </strong>${product?.puerto}</li>

                            </ul>
                            <ul style="font-size: .7em; font-family: 'Nunito', sans-serif !important; text-align:left;">
                                <li> <strong>Daños totales: </strong>${product?.dano_totales}</li>
                                <li> <strong>Granos fuera de tipo: </strong>${product?.granos_fuera_tipo}</li>
                                <li> <strong>Humedad: </strong>${product?.humedad}</li>
                                <li> <strong>Materiales extraños: </strong>${product?.materias_extranos}</li>
                                <li> <strong>Plazo de carga: </strong>${product?.plazo_carga}</li>
                                <li> <strong>Clasificación: </strong>${product?.clasificacion}</li>
                            </ul>
                        </div>
                    </div>
                </div>
             `,
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: false,
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
            showConfirmButton: false,

        })

    }

    function handleDelete() {
        Swal.fire({
            title: '¿Estás seguro de eliminar este producto?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(product?.id)
            }
        })
    }


    return (
        <section className='container productId'>
            <div>
                <div className="product">
                    <h2>{product?.nombre_producto?.nombre}</h2>
                    <ul>
                        <li> <span>Vendedor: </span>{product?.seller?.slug}</li>
                        <li> <span>Tipo de producto: </span>{getTypes()}</li>
                        <li> <span>Año de Producción: </span>{product?.ano_produccion}</li>
                        <li> <span>Volumen: </span>{product?.volumen}</li>
                        <li> <span>País de Origen: </span>{product?.country?.nombre}</li>
                        <li> <span>Incoterms: </span>{product?.incoterm?.nombre}</li>
                    </ul>
                </div>

                <div className="buttons">
                    {isUserProduct && (<>
                        <button onClick={detailsProduct} className="btn btn-success mb-2">Más información del producto</button>
                        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
                    </>)}

                    {!isUserProduct && (<>
                        <button className="btn btn-primary mb-2">Comprar producto</button>
                        <button onClick={detailsProduct} className="btn btn-success mb-2">Más información del producto</button>
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