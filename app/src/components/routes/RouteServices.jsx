import React from "react";
import { Routes, Route} from "react-router-dom";
import PageAllServices from "../../pages/services/PageAllServices"
import PageNewService from '../../pages/services/PageNewService'
import PageListService from "../../pages/services/PageListServices";

function RouteServices() {
    return (
        <Routes>
            <Route path="/list" element={<PageAllServices />} />
            <Route path="/new" element={<PageNewService />} />
            <Route path="/:id" element={<PageListService />} />
        </Routes>
    )
}

export default RouteServices