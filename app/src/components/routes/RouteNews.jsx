import React, { } from "react";
import { Routes, Route } from "react-router-dom";

import PageNews from "../../pages/news/PageNews"
import PageNewById from '../../pages/news/PageNewById'
import PageNew from '../../pages/news/PageNew'


function RouteDashboard() {
    return (
        <Routes>
            <Route path="/list" element={<PageNews />} />
            <Route path="/:id" element={<PageNewById />} />
            <Route path="/new" element={<PageNew />} />
        </Routes>
    )
}

export default RouteDashboard