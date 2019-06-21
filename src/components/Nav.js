import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Avatar, IconButton, Tooltip, Menu, MenuItem, Checkbox } from "@material-ui/core";
import Context from "./Context";
import { People } from "@material-ui/icons";
import { withRouter, Link } from "react-router-dom";

function Nav({ history }) {
  const ctx = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(path) {
    history.push(path);
    setAnchorEl(null);
  }

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar className="Toolbar">
        <Link to="/login">
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Material_Design_Logo.svg/1024px-Google_Material_Design_Logo.svg.png"
            }
            height={45}
          />
        </Link>
        <div style={{ flexGrow: 1 }} />
        {ctx.auth.id ? (
          <>
            <Tooltip title="Users">
              <IconButton component={Link} to="/">
                <People style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Avatar src={ctx.auth.pic} onClick={e => setAnchorEl(e.currentTarget)} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} className="nav-menu" onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => handleClick("/profile")}>Profile</MenuItem>
              <MenuItem>
                Make profile public
                <Checkbox color="secondary" checked style={{ marginLeft: 10 }} />
              </MenuItem>
              <MenuItem onClick={() => handleClick("/login")}>Logout</MenuItem>
            </Menu>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Nav);
