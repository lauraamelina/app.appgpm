import React from "react";
import { Routes, Route } from "react-router-dom";
import PageProfileUser from "../../pages/users/PageProfileUser";

function RouteUsers() {
    return (
        <>
            <Routes>
                <Route path='/profile/:id' element={<PageProfileUser />} />
            </Routes>
        </>
    )
}

export default RouteUsers