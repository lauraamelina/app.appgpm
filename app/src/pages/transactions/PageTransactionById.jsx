import React, { useState, useEffect } from "react";
import * as TransactionsService from '../../services/transactions.service'
import { useParams } from "react-router-dom";
import TransactionById from '../../components/transactions/TransactionById'
import TransactionDemandById from '../../components/transactions/TransactionDemandById'
import BtnTransactions from "../../components/transactions/BtnsTransactions";


export default function PageTransactionById() {

    const { id } = useParams();
    const [transaction, setTransaction] = useState({});
    const [isDemand, setIsDemand] = useState(false);

    useEffect(() => {
        TransactionsService.getTransactionById(id)
            .then((response) => {
                setTransaction(response.data);
                if (response.data.demand_id) {
                    setIsDemand(true);
                } else {
                    setIsDemand(false);
                }
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
                <>
                    <div>
                        {isDemand ? <TransactionDemandById transaction={transaction} /> : <TransactionById transaction={transaction} />}
                    </div>
                    <div>
                        <BtnTransactions />
                    </div>
                </>

            }
        </main>
    )
}