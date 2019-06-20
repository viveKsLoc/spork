import React, { useContext } from "react";
import { AppBar, Toolbar, Avatar } from "@material-ui/core";
import Context from "./components/Context";

export default function Nav() {
  const ctx = useContext(Context);

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <img
          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Material_Design_Logo.svg/1024px-Google_Material_Design_Logo.svg.png"}
          height={45}
        />
        <div style={{ flexGrow: 1 }} />
        <Avatar src={ctx.auth.pic} />
      </Toolbar>
    </AppBar>
  );
}
