import React from "react";
import { Routes, Route} from "react-router-dom";
import PageShareProduct from "../../pages/share/PageShareProduct";

function RouteShare() {
    return (
        <Routes>
            <Route path="/product/:id" element={<PageShareProduct />} />
        </Routes>
    )
}

export default RouteShare