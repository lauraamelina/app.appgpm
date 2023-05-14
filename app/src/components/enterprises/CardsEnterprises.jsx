import React, { useState } from 'react'
import CardEnterprise from './CardEnterprise';


export default function CardsEnterprises({ enterprises, updateEnterprises }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [enterprisesPerPage] = useState(6);
    const indexOfLastEnterprise = currentPage * enterprisesPerPage;
    const indexOfFirstEnterprise = indexOfLastEnterprise - enterprisesPerPage;
    const currentEnterprises = enterprises.slice(indexOfFirstEnterprise, indexOfLastEnterprise);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    function prevPage() {
        if (currentPage > 1) {
            paginate(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(enterprises.length / enterprisesPerPage)) {
            paginate(currentPage + 1)
        }
    }

    return (
        <div className="listUser container">
            <div className="row">
                {currentEnterprises.map(enterprise => {
                    return (
                        <div className="col-12 col-md-4" key={enterprise.id}>
                            <CardEnterprise enterprise={enterprise} updateEnterprises={updateEnterprises} />
                        </div>
                    )
                })}
            </div>

            <p>Página {currentPage} de {Math.ceil(enterprises?.length / enterprisesPerPage)}</p>
            {enterprises?.length > enterprisesPerPage && (
                <div className="pagination">
                    <button onClick={prevPage} className="btn btn-primary">Anterior</button>
                    <button onClick={nextPage} className="btn btn-primary">Siguiente</button>
                </div>
            )}
        </div>
    )







}