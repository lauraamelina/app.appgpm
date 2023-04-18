import React, {useState, useEffect} from "react";
import * as TransactionsService from '../../services/transactions.service'
import TransactionsListByUser from "../../components/transactions/TableTransactions";

export default function PageTransactionList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        TransactionsService.getTransactionsByUser()
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <main className="container">
            <h1>Lista de transacciones</h1>

            {transactions?.data !== [] && (
                <TransactionsListByUser transactions={transactions}/>
            )}

        </main>
    );
}