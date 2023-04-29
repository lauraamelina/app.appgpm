import React from "react";
import { Routes, Route} from "react-router-dom";
import PageListServices from "../../pages/services/PageListServices"
import PageListEnterprises from '../../pages/services/PageListEnterprises'


function RouteServices() {
    return (
        <Routes>
            <Route path="/list" element={<PageListServices />} />
            <Route path="/:id" element={<PageListEnterprises />} />
        </Routes>
    )
}

export default RouteServices