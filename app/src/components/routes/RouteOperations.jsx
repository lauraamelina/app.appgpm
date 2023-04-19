import React from "react";
import { Routes, Route } from "react-router-dom";
import PageAllProducts from "../../pages/operations/PageAllProducts"
import PageMarket from "../../pages/operations/PageMarket"
import PageAllBids from "../../pages/operations/PageAllBids"


function RouteOperations() {
    return (
        <>
            <Routes>
                <Route path="/market" element={<PageMarket />} />
                <Route path="/buy" element={<PageAllProducts />} />
                <Route path="/bids" element={<PageAllBids />} />
            </Routes>
        </>
    )
}

export default RouteOperations