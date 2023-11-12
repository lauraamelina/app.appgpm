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
import AdsClickIcon from '@mui/icons-material/AdsClick';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessIcon from '@mui/icons-material/Business';

import * as AuthService from '../../services/auth.service';

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "white",
        alignItems: 'center',
        flexDirection: 'column', 
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isCollapsed && (
            <Typography variant="caption">
              {title}
            </Typography>
          )}
          {!isCollapsed &&
            <Typography variant="body1">
              {title}
            </Typography>
          }
        </div>
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
              isCollapsed={isCollapsed}
            />
            <Item
              title="Market"
              to="/dashboard/operations/buy"
              icon={<ShoppingBagIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Mis productos"
              to="/dashboard/products/list"
              icon={<RocketLaunchIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Transacciones"
              to="/dashboard/transactions/list"
              icon={<PaidIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            <Item
              title="Servicios"
              to="/dashboard/services/list"
              icon={<DiamondIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Noticias"
              to="/dashboard/news/list"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            {isAdmin && (
              <>
                <Item
                  title="Usuarios"
                  to="/dashboard/users/list"
                  icon={<PeopleIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />
                <Item
                  title="Campañas"
                  to="/dashboard/campaigns/list"
                  icon={<CampaignIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />

                <Item
                  title="Lista de anuncios"
                  to="/dashboard/campaigns/ads/list"
                  icon={<AdsClickIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />

                <Item
                  title="Documentos"
                  to="/dashboard/documents/list"
                  icon={<VerifiedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
                />

                <Item
                  title="Empresas"
                  to="/dashboard/enterprises/list"
                  icon={<BusinessIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  isCollapsed={isCollapsed}
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