import React, {useState} from "react";
import CardProduct from './CardProduct'

export default function CardProducts({ products }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products?.sort((a, b) => a.id - b.id).slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPaginate = () => {
        if (currentPage < products?.total / productsPerPage) {
            paginate(currentPage + 1);
        }
    }

    const prevPaginate = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    }
    return (
        <div className="row">
            {currentProducts?.map((product) => (
                <div className="col-md-3 col-2" key={product?.id}>
                    <CardProduct product={product} />
                </div>
            ))}

            {products?.total > productsPerPage && (
                <div className="pagination">
                    <button className='btn btn-primary' onClick={prevPaginate}>Anterior</button>
                    <button className='btn btn-primary' onClick={nextPaginate}>Siguiente</button>
                </div>
            )} 

        </div>
    );
}