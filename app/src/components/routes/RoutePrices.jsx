import React from "react";
import { Routes, Route } from "react-router-dom";
import PagePrices from "../../pages/prices/PagePrices"

function RoutePrices() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PagePrices />} />
            </Routes>
        </>
    )
}

export default RoutePrices