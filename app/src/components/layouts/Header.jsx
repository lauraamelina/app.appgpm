import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SellIcon from '@mui/icons-material/Sell';
import StoreIcon from '@mui/icons-material/Store';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import * as AuthService from '../../services/auth.service'


const Topbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(AuthService.getUser() || null)

  useEffect(() => {
    setUser(AuthService.getUser() || null)
  }, [])

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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const settings = [
    { name: 'Mi perfil', link: `/dashboard/users/profile/${user?.id}` },
    { name: 'Editar perfil', link: '/dashboard/users/profile/edit' },
    { name: 'Cambiar contraseña', link: '/dashboard/account' },
    { name: 'Cerrar sesión', link: '/logout' }
  ]

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

          <IconButton style={{ color: "white" }}>
            <SellIcon />
          </IconButton>
          <IconButton style={{ color: "white" }}>
            <StoreIcon />
          </IconButton>
          <IconButton style={{ color: "white" }}>
            <NotificationsIcon />
          </IconButton>

          <Box marginTop={'.5em'} marginLeft={'1em'} sx={{ flexGrow: 0 }}>
            <Tooltip title="Mi cuenta">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={`${user?.name}`} src={`https://api.appgpm.com/files/img/${user?.avatar}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link to={setting.link}>
                    <Typography variant="body2" sx={{ color: '#3A3A3A' }} fontFamily={'Nunito, sans-serif '}>
                      {setting.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Box>
      </Box>
    </header>
  );
};

export default Topbar;
