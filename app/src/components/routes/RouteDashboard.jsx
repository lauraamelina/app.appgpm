import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../layouts/Header";
import Dashboard from "../../pages/PageDashboard"
import SideBar from "../layouts/SideBar";
import PageMarket from "../../pages/PageMarket"
import PageTransaction from "../../pages/PageTransaction"
import PageProducts from "../../pages/PageProducts"
import PageNews from "../../pages/PageNews"
import PageServices from "../../pages/PageServices"
import Footer from "../layouts/Footer";





function RouteDashboard() {
    return (
        <>
            <SideBar/>
            <Header/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/operations/market" element={<PageMarket/>}/>
                <Route path="/transactions/list" element={<PageTransaction/>}/>
                <Route path="/products/list" element={<PageProducts />} />
                <Route path="/news/list" element={<PageNews />} />
                <Route path="/services/list" element={<PageServices />} />
            </Routes>
            <Footer/>
        </>


    )
}

export default RouteDashboard