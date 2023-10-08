import React from "react";
import { Routes, Route } from "react-router-dom";
import PageTransactionList from "../../pages/transactions/PageTransactionList";
import PageTransactionById from "../../pages/transactions/PageTransactionById";
import PageTransactionCalification from "../../pages/transactions/PageTransactionCalification";

function RouteTransactions() {
    return (
        <>
            <Routes>
                <Route path="/list" element={<PageTransactionList />} />
                <Route path='/:id' element={<PageTransactionById />} />
                <Route path='/:id/calification' element={<PageTransactionCalification />} />
            </Routes>
        </>
    )
}

export default RouteTransactions