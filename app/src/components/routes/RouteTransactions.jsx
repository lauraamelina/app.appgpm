import React from "react";
import { Routes, Route } from "react-router-dom";
import PageTransactionList from "../../pages/transactions/PageTransactionList";
import PageTransactionById from "../../pages/transactions/PageTransactionById";

function RouteTransactions() {
    return (
        <>
            <Routes>
                <Route path="/list" element={<PageTransactionList />} />
                <Route path='/:id' element={<PageTransactionById />} />
            </Routes>
        </>

    )
}

export default RouteTransactions