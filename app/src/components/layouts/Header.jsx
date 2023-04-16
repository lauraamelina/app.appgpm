import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
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
          <IconButton style={{color: "white"}}>
            <p style={styleP} >ES</p>
          </IconButton>
        </Box>
          {/* LOGO */}
          <Box display="flex"alignItems="center">
              <Link to={"/dashboard"}>
                  <img src={logo} alt="logo" width="200px" className="ms-5"/>
              </Link>
          </Box>

        {/* ICONS */}
        <Box display="flex">
          <IconButton style={{color: "white"}}>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton style={{color: "white"}}>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton style={{color: "white"}}>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </header>
  );
};

export default Topbar;
