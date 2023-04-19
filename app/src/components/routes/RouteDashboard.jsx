import React from "react";
import { Routes, Route } from "react-router-dom";

// LAYOUT
import Header from "../layouts/Header";
import SideBar from "../layouts/SideBar";
import Footer from "../layouts/Footer";

//PAGES
import Dashboard from "../../pages/PageDashboard"
import PageNews from "../../pages/PageNews"
import PageServices from "../../pages/PageServices"

//ROUTES
import RouteProducts from "./RouteProducts"
import RouteTransactions from "./RouteTransactions"
import RouteOperations from "./RouteOperations";

function RouteDashboard() {
    return (
        <>
            <SideBar/>
            <Header/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/operations/*" element={<RouteOperations/>}/>
                <Route path="/transactions/*" element={<RouteTransactions/>}/>
                <Route path="/products/*" element={<RouteProducts/>}/>
                <Route path="/news/list" element={<PageNews />} />
                <Route path="/services/list" element={<PageServices />} />
            </Routes>
            <Footer/>
        </>


    )
}

export default RouteDashboard