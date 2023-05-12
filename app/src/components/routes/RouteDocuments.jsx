import React from "react";
import { Routes, Route } from "react-router-dom";
import PageListDocuments from "../../pages/documents/PageListDocuments"


function RouteDocuments() {
    return (
        <>
            <Routes>
                <Route path="/list" element={<PageListDocuments />} />
            </Routes>
        </>
    )
}

export default RouteDocuments