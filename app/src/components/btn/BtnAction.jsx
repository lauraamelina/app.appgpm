import React from "react";
import {useNavigate} from "react-router-dom";

function BtnAction({buttonText, route}) {
    let navigate = useNavigate();
    return (
        <button className="btn btn-primary" onClick={() => navigate(route)}>
            {buttonText}
        </button>
    );
}

export  default BtnAction;