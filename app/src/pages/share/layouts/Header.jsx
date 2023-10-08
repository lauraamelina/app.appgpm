import React from "react";
import { Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import LoginIcon from '@mui/icons-material/Login';

const Topbar = () => {
    let navigate = useNavigate();

    const styles = {
        backgroundColor: "#43454d",
        color: "white",
        height: "90px",
    }

    const styleP = {
        backgroundColor: "white",
        color: '#3A3A3A',
        borderRadius: "10px",
        padding: ".5em 1em",
        fontSize: "12px",
        marginBottom: "0px"

    }

    return (
        <header>
            <Box display="flex" justifyContent="space-around" p={2} style={styles}>
                <Box display="flex">
                    <IconButton style={{ color: "white" }}>
                        <p style={styleP} >ES</p>
                    </IconButton>
                </Box>
                {/* LOGO */}
                <Box display="flex" alignItems="center">
                    <Link to={"/dashboard"}>
                        <img src={logo} alt="logo" width="200px" className="ms-5" />
                    </Link>
                </Box>

                {/* ICONS */}
                <Box display="flex">
                    <IconButton onClick={() => navigate('/login')} style={{ color: "white" }} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <LoginIcon />
                    </IconButton>
                </Box>
            </Box>
        </header>
    );
};

export default Topbar;
