import * as React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { clearToken } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const pages = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Blog", path: "/blogs" },
  { name: "About Us", path: "/about-us" },
];
const settings = ["Profile", "Logout"];

function CustomerHeader({ appBarRef }) {
  const location = useLocation(); // Get current route
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    if (dispatch(clearToken())) {
      toast.success("Logout Successful!");
    } else {
      toast.error("Logout Failed!");
    }
  };

  const handleMenuClick = (setting) => {
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;

      case "Logout":
        handleLogout();
        break;

      default:
        break;
      }
      handleCloseUserMenu();
  };

  return (
    <AppBar
      ref={appBarRef}
      position="fixed"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
      }}
    >
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "black" }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Lora",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "var(--primary-text-color)",
              textDecoration: "none",
            }}
          >
            Beauty{" "}
            <span style={{ color: "var(--primary-color)" }}>Product</span>
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="var(--primary-text-color)"
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
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.path}
                    sx={{
                      textDecoration: "none",
                      color:
                        location.pathname === page.path
                          ? "var(--primary-color)"
                          : "black",
                      fontFamily: "Lora",
                      ":hover": {
                        color: "var(--primary-color)",
                      },
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  textAlign: "center",
                  my: 2,
                  color:
                    location.pathname === page.path
                      ? "var(--primary-color)"
                      : "var(--primary-text-color)",
                  display: "block",
                  fontFamily: "Lora",
                  fontWeight: location.pathname === page.path ? 700 : 400,
                  borderBottom:
                    location.pathname === page.path
                      ? "2px solid var(--primary-color)"
                      : "none",
                  ":hover": {
                    color: "var(--primary-color)",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Notification & Shopping Cart */}
          <Box sx={{ flexGrow: 0, marginRight: "2rem", display: "flex" }}>
            <Button sx={{ color: "white" }}>
              <Badge
                badgeContent={100}
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--primary-color)",
                  },
                }}
              >
                <NotificationsActiveIcon sx={{ color: "black" }} />
              </Badge>
            </Button>

            <Button sx={{ color: "white" }}>
              <Badge
                badgeContent={10}
                max={99}
                color="warning"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--primary-color)",
                  },
                }}
              >
                <ShoppingCartIcon sx={{ color: "black" }} />
              </Badge>
            </Button>
          </Box>

          {/* User Menu */}
          <Box>
            {accessToken ? (
              // If logged in, show the User Menu
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="/static/images/avatar/2.jpg"
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
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleMenuClick(setting)}
                    >
                      <Typography
                        textAlign="center"
                        sx={{ fontFamily: "Lora" }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              // If not logged in, show the Login button
              <Box>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "var(--primary-color)",
                    fontWeight: "bold",
                    fontFamily: "Lora",
                    padding: "0.8rem",
                  }}
                >
                  LOG IN
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomerHeader;
