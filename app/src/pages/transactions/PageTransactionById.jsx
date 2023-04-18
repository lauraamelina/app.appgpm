import React, { useState, useEffect } from "react";
import * as TransactionsService from '../../services/transactions.service'
import { useParams } from "react-router-dom";
import TransactionById from '../../components/transactions/TransactionById'
import BtnTransactions from "../../components/transactions/BtnsTransactions";


export default function PageTransactionById() {
    const { id } = useParams();
    const [transaction, setTransaction] = useState({});

    useEffect(() => {
        TransactionsService.getTransactionById(id)
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, []);

    return (
        <main>
            <h1 className="visually-hidden">Transacción</h1>

            {transaction !== {} &&
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <TransactionById transaction={transaction} />
                        </div>
                        <div className="col-md-2">
                            <BtnTransactions />
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}