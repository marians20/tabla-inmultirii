import React from 'react';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LoginIcon from '@mui/icons-material/Login';
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { layoutActions } from "../../store";
import objectUtils from "../../lib/object-utils";
import useAuth from '../../hooks/use-auth';

import classes from './application-bar.module.css';

const pages = [
  { name: "Test", route: "/" },
];
const userSettings = [
  { name: "Profile", route: "/profile" },
  { name: "Account", route: "/account" },
  { name: "Dashboard", route: "/dashboard" },
  { name: "Logout", route: "/logout" },
];

export default function ApplicationBar({title, titleRoute}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isSidebarEnabled = useSelector(state => state.layout.isSidebarEnabled);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateToMenuItem = (route) => {
    setAnchorElNav(null);
    navigate(route);
  };

  const navigateToUserMenuItem = (route) => {
    handleCloseUserMenu();
    navigate(route);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();

  const menuClickHandler = () => {
    dispatch(layoutActions.toggleSidebar());
  };

  const userStuff = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={
              !!user
                ? user.displayName
                : "Anonymous"
            }
            src={
              !!user
                ? user.photoURL
                : "/static/images/avatar/2.jpg"
            }
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userSettings.map((setting) => (
          <MenuItem
            key={objectUtils.getHash(setting)}
            onClick={() => navigateToUserMenuItem(setting.route)}
          >
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const login = (
    <Link to="/login" className={classes.link}><IconButton><LoginIcon /></IconButton></Link>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            {isSidebarEnabled && <IconButton
              edge="start"
              onClick={menuClickHandler}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to={titleRoute} className={classes.link}>{title}</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={navigateToMenuItem}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.route}
                  onClick={() => navigateToMenuItem(page.route)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to={titleRoute} className={classes.link}>{title}</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.route}
                onClick={() => navigateToMenuItem(page.route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {!!user ? userStuff : login}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
