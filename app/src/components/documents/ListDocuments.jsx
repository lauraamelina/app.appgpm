import React, { useEffect, useState } from 'react';
import TableDocuments from './TableDocuments';

export default function ListDocuments({ documents, updateDocuments }) {
    const [search, setSearch] = useState('')
    const [state, setState] = useState('')
    const [filtered, setFiltered] = useState(documents)
    const [currentPage, setCurrentPage] = useState(1);
    const [documentsPerPage] = useState(9);
    const indexOfLastDocuments = currentPage * documentsPerPage;
    const indexOfFirstDocuments = indexOfLastDocuments - documentsPerPage;
    const currentDocuments = filtered.slice(indexOfFirstDocuments, indexOfLastDocuments);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const paginateNext = () => {
        if (currentPage < filtered?.length / documentsPerPage) {
            paginate(currentPage + 1);
        }
    }
    const paginatePrev = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    }

    useEffect(() => {
        let filter = documents.filter(document => {
          return document?.user?.name?.toLowerCase().includes(search.toLowerCase())
        });
      
        if (state !== '') {
          filter = filter.filter(document => document.verificado === parseInt(state));
        }
      
        setFiltered(filter);
      
      }, [search, state, documents]);

    useEffect(() => {
        setCurrentPage(1)
    }, [filtered])

    return (
        <div className='container listDocuments'>
            <div className='row'>
                <div className='col-md-12 header'>
                    <div className="state">
                        <label htmlFor="state">Estado </label>
                        <select className='form-control' name="state" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="1">Verificado</option>
                            <option value="0">No verificado</option>
                        </select>
                    </div>
                    <div className="search">
                        <label htmlFor="search">Buscar por usuario</label>
                        <input className='form-control' type="text" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                {currentDocuments.length !== 0 &&
                    <TableDocuments documents={currentDocuments} updateDocuments={updateDocuments}/>
                }

                {currentDocuments.length === 0 &&
                    <div className='not-exist'>
                        <h2>No existen documentos con esos parámetros</h2>
                    </div>
                }
            </div>
            {currentDocuments.length !== 0 &&
                <>
                    <p>Página {currentPage} de {Math.ceil(filtered?.length / documentsPerPage)}</p>
                    {filtered?.length > documentsPerPage && (
                        <div className="pagination">
                            <button onClick={paginatePrev} className="btn btn-primary">Anterior</button>
                            <button onClick={paginateNext} className="btn btn-primary">Siguiente</button>
                        </div>
                    )}
                </>
            }
        </div>





    )
}