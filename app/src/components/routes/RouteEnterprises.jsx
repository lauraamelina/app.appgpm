import React from "react";
import { Routes, Route } from "react-router-dom";
import PageListEnterprises from "../../pages/enterprises/PageListEnterprises"
import PageNewEnterprises from "../../pages/enterprises/PageNewEnterprises";


function RouteDocuments() {
    return (
        <>
            <Routes>
                <Route path="/list" element={<PageListEnterprises />} />
                <Route path="/new" element={<PageNewEnterprises />} />
            </Routes>
        </>
    )
}

export default RouteDocuments