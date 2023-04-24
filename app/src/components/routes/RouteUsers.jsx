import React from "react";
import { Routes, Route } from "react-router-dom";
import PageProfileUsers from "../../pages/users/PageProfileUsers";
import PageEditProfile from "../../pages/users/PageEditProfile";

function RouteUsers() {
    return (
        <>
            <Routes>
                <Route path='/profile/:id' element={<PageProfileUsers />} />
                <Route path='/profile/edit' element={<PageEditProfile />} />
            </Routes>
        </>
    )
}

export default RouteUsers