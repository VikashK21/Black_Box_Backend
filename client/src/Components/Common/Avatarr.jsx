import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Avatarr = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logoutUser } = React.useContext(AuthContext);
  const name = localStorage.getItem("name");
  // console.log(user.img_thumbnail.secure_url);
  const pro = localStorage.getItem("propic");
  const prop = pro ? pro.length > 0 ? JSON.parse(pro) : "" : "";
  const propic = prop.secure_url;
  

  return (
    <React.Fragment>
      <Box sx={{ alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {name ? (
              prop ? (
                <Avatar src={propic} />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {name[0].toUpperCase()}
                </Avatar>
              )
            ) : (
              <Avatar />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        className="d-flex justify-content-center flex-column"
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 15,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/profile" className="text-dark">
          <MenuItem>
            {name ? (
              prop ? (
                <Avatar src={propic} />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {name[0].toUpperCase()}
                </Avatar>
              )
            ) : (
              <Avatar />
            )}
            Profile
          </MenuItem>
        </Link>
        <MenuItem>
          {name ? (
            prop ? (
              <Avatar src={propic} />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>
                {name[0].toUpperCase()}
              </Avatar>
            )
          ) : (
            <Avatar />
          )}
          My classes
        </MenuItem>
        <Divider />
        {name ? (
          <MenuItem
            onClick={() => {
              logoutUser();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default Avatarr;
