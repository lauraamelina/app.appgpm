import React, { useState, useEffect } from "react";
import * as TransactionsService from '../../services/transactions.service'
import { Link, useParams } from "react-router-dom";
import TransactionById from '../../components/transactions/TransactionById'
import TransactionDemandById from '../../components/transactions/TransactionDemandById'
import ContentTransaction from "../../components/transactions/ContentTransaction";
import { CircularProgress } from "@mui/material";


export default function PageTransactionById() {
    const { id } = useParams();
    const [transaction, setTransaction] = useState({});
    const [isDemand, setIsDemand] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        TransactionsService.getTransactionById(id)
            .then((response) => {
                setLoading(false);
                if (response.status === 200) {
                    setTransaction(response.data);
                    if (response.data.demand_id) {
                        setIsDemand(true);
                    } else {
                        setIsDemand(false);
                    }
                } else {
                    setTransaction(null);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
        // eslint-disable-next-line
    }, []);

    return (
        <main>
            <h1 className="visually-hidden">Transacción</h1>

            {loading && (
                <div className="d-flex justify-content-center">
                    <CircularProgress />
                </div>
            )}

            {!loading && transaction !== null &&
                <>
                    <div>
                        {isDemand ? <TransactionDemandById transaction={transaction} /> : <TransactionById transaction={transaction} />}
                    </div>
                    <div>
                        <ContentTransaction transaction={transaction} />
                    </div>
                </>
            }

            {!loading && transaction === null &&
                <div className="not-exist">
                    <p>No hay existe transacción con ese ID</p>
                    <Link to="/dashboard/transactions/list" className="btn btn-primary">Volver a mis transacciones</Link>
                </div>
            }

        </main>
    )
}