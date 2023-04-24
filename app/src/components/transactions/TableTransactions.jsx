import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as AuthService from '../../services/auth.service'

export default function TableTransactions({ transactions }) {
    console.log(transactions)
    const [searchYear, setSearchYear] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [filtered, setFiltered] = useState(transactions);
    const user = AuthService.getUserId();

    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filtered?.sort((a, b) => a.created_at - b.created_at).slice(indexOfFirstTransaction, indexOfLastTransaction);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function getYears() {
        const years = [];
        transactions?.forEach((transaction) => {
            const date = new Date(transaction?.created_at);
            const year = date.getFullYear();
            if (!years.includes(year)) {
                years.push(year);
            }
        });
        return years;
    }

    function getProducts() {
        const products = [];
        transactions?.forEach((transaction) => {
            const product = transaction?.nombre_producto?.nombre;
            if (!products.includes(product)) {
                products.push(product);
            }
        });
        return products;
    }

    function formatedDate(date) {
        const dateFormated = new Date(date);
        const day = dateFormated.getDate();
        const month = dateFormated.getMonth() + 1;
        const year = dateFormated.getFullYear();
        return `${day}/${month}/${year}`
    }

    useEffect(() => {
        transactions?.forEach((transaction) => {
            if (transaction?.vendedor_id === user) {
                transaction.type = "Venta";
            }
            else if (transaction?.comprador_id === user) {
                transaction.type = "Compra";
            }
        });
        setFiltered(transactions);

    }, [transactions]);

    useEffect(() => {
        search();
        setCurrentPage(1);
        //eslint-disable-next-line
    }, [searchYear, searchProduct]);

    function search() {
        const year = searchYear;
        const product = searchProduct;
        if (year !== "" && product !== "") {
            const filteredTransactions = transactions?.filter((transaction) => {
                const date = new Date(transaction?.created_at);
                const yearTransaction = date.getFullYear();
                const productTransaction = transaction?.nombre_producto?.nombre;
                return yearTransaction === parseInt(year) && productTransaction === product;
            });

            setFiltered(filteredTransactions);
            setCurrentPage(1);
        }
        else if (year !== "" && product === "") {
            const filteredTransactions = transactions?.filter((transaction) => {
                const date = new Date(transaction?.created_at);
                const yearTransaction = date.getFullYear();
                return yearTransaction === parseInt(year);
            });
            setFiltered(filteredTransactions);
            setCurrentPage(1);
        }
        else if (year === "" && product !== "") {
            const filteredTransactions = transactions?.filter((transaction) => {
                const productTransaction = transaction?.nombre_producto?.nombre;
                return productTransaction === product;
            });
            setFiltered(filteredTransactions);
            setCurrentPage(1);
        }
        else {
            setFiltered(transactions);
            setCurrentPage(1);
        }
    }

    function prevPaginate() {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    }

    function nextPaginate() {
        if (currentPage < Math.ceil(filtered?.length / transactionsPerPage)) {
            paginate(currentPage + 1);
        }
    }


    return (
        <section className='table-transactions'>
            <div className="header">
                <div>
                    <label htmlFor='searchYear'>Buscar por año</label>
                    <select className='form-control' name="searchYear" id="searchYear" onChange={(e) => setSearchYear(e.target.value)}>
                        <option value="">Todos</option>
                        {getYears()?.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor='searchProduct'>Buscar por producto</label>
                    <select className='form-control' name="searchProduct" id="searchProduct" onChange={(e) => setSearchProduct(e.target.value)}>
                        <option value="">Todos</option>
                        {getProducts()?.map((product) => (
                            <option key={product} value={product}>{product}</option>
                        ))}
                    </select>

                </div>
            </div>

            {filtered?.length > 0 && (
                <>
                    <table className='table  table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Vendedor</th>
                                <th>Comprador</th>
                                <th>Producto</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTransactions?.map((transaction) => (
                                <tr key={transaction?.id}>
                                    <td>{transaction?.id}</td>
                                    {transaction?.type === "Venta" ? (
                                        <td className="green"><span>{transaction?.type}</span></td>
                                    ) : (
                                        <td className="red"><span>{transaction?.type}</span></td>
                                    )}
                                    <td>{transaction?.seller?.email}</td>
                                    <td>{transaction?.buyer?.email}</td>
                                    <td>{transaction?.nombre_producto?.nombre}</td>
                                    <td>{formatedDate(transaction?.created_at)}</td>
                                    {transaction?.type === "Venta" ? (
                                         <td className="green"><span>{transaction?.valor_total}</span></td>
                                    ) : (
                                        <td className="red"><span>{transaction?.valor_total}</span></td>
                                    )}
                                    <td>
                                        <Link to={`/dashboard/transactions/${transaction?.id}`} className='btn btn-primary'>Ver</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Pagina {currentPage} de {Math.ceil(filtered?.length / transactionsPerPage)}</p>

                    {filtered?.length > transactionsPerPage && (
                        <div className="pagination">
                            <button className='btn btn-primary' onClick={prevPaginate}>Anterior</button>
                            <button className='btn btn-primary' onClick={nextPaginate}>Siguiente</button>
                        </div>
                    )}
                </>
            )}

            {filtered?.length === 0 && (
                <p className='not'>No hay transacciones</p>
            )}
        </section>
    )
}