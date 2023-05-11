import React, { } from "react";
import { Routes, Route } from "react-router-dom";

import PageListCampaigns from "../../pages/campaigns/PageListCampaigns";

function RouteCampaigns() {
    return (
        <Routes>
            <Route path="/list" element={<PageListCampaigns />} />
        </Routes>
    )
}

export default RouteCampaigns