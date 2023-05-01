import React, { } from "react";
import { Routes, Route } from "react-router-dom";

import PageChats from '../../pages/chats/PageChats.jsx'


function RouteDashboard() {
    return (
        <Routes>
            <Route path="/" element={<PageChats />} />
        </Routes>
    )
}

export default RouteDashboard