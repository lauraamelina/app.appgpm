import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PaidIcon from '@mui/icons-material/Paid';
import DiamondIcon from '@mui/icons-material/Diamond';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import HubIcon from '@mui/icons-material/Hub';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessIcon from '@mui/icons-material/Business';

import * as AuthService from '../../services/auth.service';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "white",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      {/* si esta colapsed igual mmuestra el titulo */}
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography

          variant="body1"
          style={{
            marginLeft: "10px",
          }}
        >
          {title}
        </Typography>
      </Link>


    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleMainStyle = () => {
    const main = document.getElementsByTagName("main")[0];

    if (window.screen.width > 991) {
      if (isCollapsed) {
        main.style.marginLeft = "90px";
        main.style.transition = "margin-left 0.5s";
      }
      if (!isCollapsed) {
        main.style.marginLeft = "290px";
        main.style.transition = "margin-left 0.5s";
      }
    }

    if (window.screen.width < 991) {
      if (isCollapsed) {
        main.style.marginLeft = "80px !important";
      }
      if (!isCollapsed) {
        main.style.marginLeft = "80px !important";
      }
    }
  };

  useEffect(() => {
    handleMainStyle();
    localStorage.setItem("isCollapsed", isCollapsed);
    // eslint-disable-next-line
  }, [isCollapsed]);

  useEffect(() => {
    const main = document.getElementsByTagName("main")[0];
    if (window.screen.width > 991) {
      if (isCollapsed) {
        main.style.marginLeft = "90px";
        main.style.transition = "margin-left 0.5s";
      }
      if (!isCollapsed) {
        main.style.marginLeft = "290px";
        main.style.transition = "margin-left 0.5s";
      }
    }
    if (window.screen.width < 991) {
      if (isCollapsed) {
        main.style.marginLeft = "80px !important";
      }
      if (!isCollapsed) {
        main.style.marginLeft = "80px !important";
      }
    }

    const user = AuthService.getUser();
    if (user.rol === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsCollapsed(true);
    // eslint-disable-next-line
  }, [selected]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#757575 !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "white !important",
        },
        "& .pro-menu-item.active": {
          color: "white !important",
        },

        "@media (max-width: 960px)": {
          "& .pro-inner-item": {
            padding: "15px 10px 15px 20px !important",
          },
        },

      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={<MenuOutlinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: "white",
            }}
          >
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Tableros"
              to="/dashboard"
              icon={<AddBusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Market"
              to="/dashboard/operations/market"
              icon={<ShoppingBagIcon />}
              selected={selected}
              setSelected={setSelected}

            />
            <Item
              title="Mis productos"
              to="/dashboard/products/list"
              icon={<RocketLaunchIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Transacciones"
              to="/dashboard/transactions/list"
              icon={<PaidIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Servicios"
              to="/dashboard/services/list"
              icon={<DiamondIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Noticias"
              to="/dashboard/news/list"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {isAdmin && (
              <>
                <Item
                  title="Usuarios"
                  to="/dashboard/users/list"
                  icon={<PeopleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Campañas"
                  to="/dashboard/campaigns/list"
                  icon={<CampaignIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Lista de anuncios"
                  to="/"
                  icon={<HubIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Documentos"
                  to="/"
                  icon={<VerifiedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Empresas"
                  to="/"
                  icon={<BusinessIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

              </>



            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;