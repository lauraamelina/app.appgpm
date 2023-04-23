import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNewDemand from "../../pages/demands/PageNewDemand"
import PageDemandById from "../../pages/demands/PageDemandById"


function RouteDemands() {
    return (
        <>
            <Routes>
                <Route path='/:id' element={<PageDemandById />} />
                <Route path="/new" element={<PageNewDemand/>}/>

            </Routes>
        </>


    )
}

export default RouteDemands