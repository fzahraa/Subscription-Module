import React from "react";
import logo from "../../images/logo.png";
// Logout
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// Logout Drop Down.
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { logoutUser } from "../../features_ar/user/userSlice";

const NavbarProfileCreation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(logoutUser());
    history.push("/ar");
  };

  return (
    <div className="nav__parent">
      <div className="nav__container">
        <Link className="navbar__link" to="/ar">
          <img className="navbar__logo" src={logo} alt="Logo" />
        </Link>
        <Tooltip title={<h2>إعدادت الحساب</h2>}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 47, height: 47 }}></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={onLogout} sx={{direction: "ltr"}}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            تسجيل خروج
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default NavbarProfileCreation;