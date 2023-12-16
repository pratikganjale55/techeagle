import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/images/cartLogo.jpg";
import profile from "../../assets/images/profile.jpg";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const [userOpen, setUser] = useState(false);
  const handleLogout = () => {
    const logout = localStorage.removeItem("authDetails");
    navigate("/");
  };
  const handleNavigate = () => {
    if (authDetails.role == "manager") {
      navigate("/manager");
    } else {
      navigate("/customer");
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <Box>
              <img src={logo} width="50" height="60" />
            </Box>
            <div onClick={handleNavigate} style={{ cursor: "pointer" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    color: "black",
                    fontWeight: "bold",
                  },
                }}
              >
                TechEagle
              </Typography>
            </div>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {authDetails.role !== "manager" && (
                <IconButton size="large" aria-label="show 4 new mails">
                  <Link to="/cards">
                    <AddShoppingCartIcon />
                  </Link>
                </IconButton>
              )}

              <IconButton
                size="large"
                aria-label="logout"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
              <IconButton size="large" edge="end" onClick={() => setUser(true)}>
                <Avatar
                  alt="Remy Sharp"
                  src={profile}
                  sx={{ width: 50, height: 50 }}
                />
              </IconButton>
            </Box>
            {/* // popover of user // */}

            <Popover
              open={userOpen}
              // anchorEl={anchorEl}
              onClose={() => setUser(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                marginTop: '5%', 
                marginRight: '10px', 
              }}
            >
              <Typography sx={{ padding: 2 }}>
                <strong>Name:</strong> {authDetails.userName}
              </Typography>
              <Typography sx={{ padding: 2 }}>
                <strong>Role:</strong> {authDetails.role} 
              </Typography>
            </Popover>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
