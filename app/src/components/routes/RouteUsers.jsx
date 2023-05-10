import React from "react";
import { Routes, Route } from "react-router-dom";
import PageProfileUsers from "../../pages/users/PageProfileUsers";
import PageEditProfile from "../../pages/users/PageEditProfile";
import PageEditPassword from "../../pages/users/PageEditPassword";
import PageListUsers from "../../pages/users/PageListUsers";


function RouteUsers() {
    return (
        <>
            <Routes>
                <Route path='/profile/:id' element={<PageProfileUsers />} />
                <Route path='/profile/edit' element={<PageEditProfile />} />
                <Route path='/list' element={<PageListUsers />} />
                <Route path='/password' element={<PageEditPassword />} />
            </Routes>
        </>
    )
}

export default RouteUsers