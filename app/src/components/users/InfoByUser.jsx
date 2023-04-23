import React, { useState, useEffect } from "react";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';

export default function InfoByUser({ user }) {
    const [isUserVerified, setIsUserVerified] = useState(user?.verificado === 1 ? true : false)

    useEffect(() => {
        setIsUserVerified(user?.verificado === 1 ? true : false)
    }, [user])

    function getImage() {
        if (user?.avatar) {
            return (
                `https://api.appgpm.com/files/img/${user?.avatar}`
            )
        }
    }
    return (
        <div className="card">
            <div className="img">
                <img src={getImage()} alt="user" />
            </div>

            <div className="info">
                <h2>{user?.name} {isUserVerified ? <VerifiedUserIcon /> : <GppBadIcon />}</h2>
                <p><strong>Email: </strong> {user?.email}</p>
                <p><strong>Ubicación: </strong> {user?.country?.nombre}</p>
            </div>



        </div>
    )
}