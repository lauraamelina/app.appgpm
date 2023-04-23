import React, { useEffect, useState } from 'react';
import CardProducts from '../products/productsByUser/CardProducts';
import Slider from '@mui/material/Slider';


export default function AllProducts({ products }) {
    const [filtered, setFiltered] = useState([])
    const [dataCountries, setDataCountries] = useState([])
    const [dataProducts, setDataProducts] = useState([])
    const [dataTypes, setDataTypes] = useState([])
    const [valuePrice, setValuePrice] = useState([0, 0]);
    const [valueCountry, setValueCountry] = useState("");
    const [valueProduct, setValueProduct] = useState("");
    const [valueType, setValueType] = useState("");

    useEffect(() => {
        const prices = products?.map((product) => product?.precio)
        const countries = products?.map((product) => product?.country.nombre)
        const productsName = products?.map((product) => product?.nombre_producto?.nombre)
        const types = products?.map((product) => product?.tipo1)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        setValuePrice([minPrice, maxPrice])
        setDataCountries(countries)
        setDataProducts(productsName)
        setDataTypes(types)
    }, [products])

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            if (product.precio < valuePrice[0] || product.precio > valuePrice[1]) {
                return false;
            }
            if (valueCountry && product.country.nombre !== valueCountry) {
                return false;
            }
            if (valueProduct && product.nombre_producto.nombre !== valueProduct) {
                return false;
            }
            if (valueType && product.tipo1 !== valueType) {
                return false;
            }
            return true;
        });
        setFiltered(filteredProducts);
    }, [products, valuePrice, valueCountry, valueProduct, valueType]);




    return (
        <section className='container allProducts'>
            {products && products.length > 0 &&
                <div className="row header">
                    <div className="col-md-3">
                        <label htmlFor="price">Precio</label>
                        <Slider
                            id="price"
                            getAriaLabel={() => 'Rango de precios'}
                            value={valuePrice}
                            onChange={e => setValuePrice(e.target.value)}
                            valueLabelDisplay="auto"
                            max={valuePrice[1] + 100}
                            min={0}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="country">Pais de origen</label>
                        <select className="form-control" id="country" value={valueCountry} onChange={e => setValueCountry(e.target.value)}>
                            <option value="">Todos</option>
                            {dataCountries?.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="product">Producto</label>
                        <select className="form-control" id="product" value={valueProduct} onChange={e => setValueProduct(e.target.value)}>
                            <option value="">Todos</option>
                            {dataProducts?.map((product, index) => (
                                <option key={index} value={product}>{product}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="type">Tipo de producto</label>
                        <select className="form-control" id="type" value={valueType} onChange={e => setValueType(e.target.value)}>
                            <option value="">Todos</option>
                            {dataTypes?.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            }

            {filtered.length === 0 ?
                <div className="not-exist">
                    <p>No hay productos que coincidan con los filtros seleccionados</p>
                </div>
                :
                <CardProducts products={filtered} />
            }
        </section>
    )

}