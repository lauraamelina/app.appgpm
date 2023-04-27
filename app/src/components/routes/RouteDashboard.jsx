import React, {useEffect} from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// SERVICES
import * as AuthService from "../../services/auth.service"

// LAYOUT
import Header from "../layouts/Header";
import SideBar from "../layouts/SideBar";
import Footer from "../layouts/Footer";

//PAGES
import Dashboard from "../../pages/PageDashboard"
import PageServices from "../../pages/PageServices"

//ROUTES
import RouteProducts from "./RouteProducts"
import RouteTransactions from "./RouteTransactions"
import RouteOperations from "./RouteOperations";
import RouteDemands from './RouteDemands'
import RouteUsers from "./RouteUsers";
import RouteNews from "./RouteNews";


function RouteDashboard() {
    let navigate = useNavigate()
    const user = AuthService.getUser();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <>
            <SideBar />
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/operations/*" element={<RouteOperations />} />
                <Route path="/transactions/*" element={<RouteTransactions />} />
                <Route path="/products/*" element={<RouteProducts />} />
                <Route path="/demands/*" element={<RouteDemands />} />
                <Route path="/users/*" element={<RouteUsers />} />
                <Route path="/news/*" element={<RouteNews />} />
                <Route path="/services/list" element={<PageServices />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
            <Footer />
        </>
    )
}

export default RouteDashboard