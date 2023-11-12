import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SellIcon from '@mui/icons-material/Sell';
import StoreIcon from '@mui/icons-material/Store';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import * as AuthService from '../../services/auth.service'
import * as NotificationsService from '../../services/notification.service'
import * as SocketService from '../../services/socket.service'


const Topbar = () => {
  let navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [user, setUser] = useState(AuthService.getUser() || null)
  const [notifications, setNotifications] = useState([]);
  const [views, setViews] = useState(0)

  useEffect(() => {
    setUser(AuthService.getUser() || null)

    NotificationsService.getNotifications()
      .then(res => {
        setNotifications(res.data)
        setViews(res.views)
      })
  }, [])

  useEffect(() => {
    const subscription = SocketService.listen('notification-event').subscribe((data) => {
      setNotifications(data.notifications);
      setViews(data.views);
    });

    return () => subscription.unsubscribe();
  }, []);


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
  const handleCloseNotifications = () => {
    setAnchorElNotification(false);

    SocketService.emit('view-notification', { user_id: user?.id });
    setViews(0)
  }

  const handleOpenNotifications = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const settings = [
    { name: 'Mi perfil', link: `/dashboard/users/profile/${user?.id}` },
    { name: 'Editar perfil', link: '/dashboard/users/profile/edit' },
    { name: 'Cambiar contraseña', link: '/dashboard/users/password' },
  ]

  const onLogout = () => {
    AuthService.logout();
    navigate('/login');
  }

  const typeNotifications = {
    1: "Te han comprado el producto.",
    2: "Tiene una solicitud para finalizar la transacción.",
    3: "Añadida una nueva secuencia en la transacción.",
    4: "Se ha subido un nuevo archivo a la transacción.",
    5: "La operación se ha cerrado con éxito.",
    6: "La operación ha sido calificada con éxito.",
    7: "Han rechazado el final de la operación.",
    8: "Se ha subido un archivo para su validación.",
    9: "Le han hecho una oferta en la operación."
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
          <IconButton onClick={() => navigate('/dashboard/operations/bids')} style={{ color: "white" }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SellIcon />
              <Typography variant="caption"> Vender</Typography>
            </Box>
          </IconButton>
          <IconButton onClick={() => navigate('/dashboard/operations/buy')} style={{ color: "white" }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <StoreIcon />
              <Typography variant="caption"> Comprar</Typography>
            </Box>
          </IconButton>
          <Box p={0} >
            <Tooltip title="Notificaciones">
              <IconButton onClick={handleOpenNotifications} style={{ color: "white" }} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Badge badgeContent={views !== 0 ? views : ''} color="success">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbarNotifications"
              anchorEl={anchorElNotification}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotification)}
              onClose={handleCloseNotifications}
            >
              {notifications ? notifications?.map((notification, index) => (
                <Link to={`/dashboard/transactions/${notification.transaction_id}`} key={index} >
                  <MenuItem onClick={handleCloseNotifications}>
                    <Typography variant="body2" sx={{ color: '#3A3A3A' }} fontFamily={'Nunito, sans-serif '}>
                      {typeNotifications[notification.type]} <br />
                      <span className="text-muted">Transacción {notification.transaction_id}</span>
                    </Typography>
                  </MenuItem>
                </Link>
              ))
                :
                <MenuItem onClick={handleCloseNotifications}>
                  <Typography variant="body2" sx={{ color: '#3A3A3A' }} fontFamily={'Nunito, sans-serif '}>
                    No tienes notificaciones
                  </Typography>
                </MenuItem>

              }
            </Menu>
          </Box>

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

              <MenuItem onClick={handleCloseUserMenu}>
                <Link onClick={onLogout}>
                  <Typography variant="body2" sx={{ color: '#3A3A3A' }} fontFamily={'Nunito, sans-serif '}>
                    Cerrar sesión
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

        </Box>
      </Box>
    </header>
  );
};

export default Topbar;
