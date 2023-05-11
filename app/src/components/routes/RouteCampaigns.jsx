import React, { } from "react";
import { Routes, Route } from "react-router-dom";

import PageListCampaigns from "../../pages/campaigns/PageListCampaigns";
import PageListAds from "../../pages/ads/PageListAds";
import PageAdsById from '../../pages/ads/PageAdsById'
import PageNewAd from "../../pages/ads/PageNewAd";

function RouteCampaigns() {
    return (
        <Routes>
            <Route path="/list" element={<PageListCampaigns />} /> 
            <Route path="/ads/list" element={<PageListAds />} /> 
            <Route path="/ads/new" element={<PageNewAd />} /> 
            <Route path="/:idCampaign/ads/:idAd" element={<PageAdsById />} /> 
        </Routes>
    )
}

export default RouteCampaigns