import React from "react";
import CardProduct from './CardProduct'

export default function CardProducts({ products }) {
    return (
        <div className="row">
            {products?.data?.map((product) => (
                <div className="col-md-3 col-2" key={product?.id}>
                    <CardProduct product={product} />
                </div>
            ))}
        </div>
    );
}