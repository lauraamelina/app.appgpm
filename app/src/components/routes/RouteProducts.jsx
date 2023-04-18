import React from "react";
import { Routes, Route } from "react-router-dom";
import PageProductsByUser from "../../pages/products/PageProductsByUser"
import PageProductById from "../../pages/products/PageProductById"
import PageNew from "../../pages/products/PageNewProduct"


function RouteProducts() {
    return (
        <>
            <Routes>
                <Route path="/list" element={<PageProductsByUser />} />
                <Route path='/:id' element={<PageProductById />} />
                <Route path="/new" element={<PageNew/>}/>
            </Routes>
        </>


    )
}

export default RouteProducts