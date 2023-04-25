import React, { useState, useEffect } from "react";
import * as TransactionsService from '../../services/transactions.service'
import TransactionsListByUser from "../../components/transactions/TableTransactions";
import { CircularProgress } from "@mui/material";

export default function PageTransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        TransactionsService.getTransactionsByUser()
            .then((response) => {
                setTransactions(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <main className="container">
            <h1>Lista de transacciones</h1>

            {loading && (
                <div className="d-flex justify-content-center">
                    <CircularProgress />
                </div>
            )}

            {!loading && transactions?.data !== [] && (
                <TransactionsListByUser transactions={transactions} />
            )}

            {!loading && transactions?.data === [] && (
                <div className="not-exist">
                    <p>No hay transacciones para mostrar</p>
                </div>
            )}

        </main>
    );
}