import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// SERVICES
import * as AuthService from "../../services/auth.service"

// LAYOUT
import Header from "../layouts/Header";
import SideBar from "../layouts/SideBar";
import Footer from "../layouts/Footer";
import ChatsModal from "../chats/ChatsModal";

//PAGES
import Dashboard from "../../pages/PageDashboard"

//ROUTES
import RouteProducts from "./RouteProducts"
import RouteTransactions from "./RouteTransactions"
import RouteOperations from "./RouteOperations";
import RouteDemands from './RouteDemands'
import RouteUsers from "./RouteUsers";
import RouteNews from "./RouteNews";
import RouteServices from './RouteServices'
import RouteChat from './RouteChat'
import RouteCampaigns from "./RouteCampaigns";
import RouteDocuments from "./RouteDocuments";
import RouteEnterprises from './RouteEnterprises'
import RoutePrices from './RoutePrices'


function RouteDashboard() {
    let navigate = useNavigate()
    const user = AuthService.getUser();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else if (user) {
            if (user?.email_verified_at === null) {
                navigate('/verification')
            } else {
                navigate('/dashboard')
            }
        }
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <SideBar />
            <Header />
            <ChatsModal />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/operations/*" element={<RouteOperations />} />
                <Route path="/transactions/*" element={<RouteTransactions />} />
                <Route path="/products/*" element={<RouteProducts />} />
                <Route path="/demands/*" element={<RouteDemands />} />
                <Route path="/users/*" element={<RouteUsers />} />
                <Route path="/news/*" element={<RouteNews />} />
                <Route path="/services/*" element={<RouteServices />} />
                <Route path="/chats/*" element={<RouteChat />} />
                <Route path="/campaigns/*" element={<RouteCampaigns />} />
                <Route path="/documents/*" element={<RouteDocuments />} />
                <Route path="/enterprises/*" element={<RouteEnterprises />} />
                <Route path="/prices/*" element={<RoutePrices />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
            <Footer />
        </>
    )
}

export default RouteDashboard