import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

export default function Nav() {
  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <img
          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Material_Design_Logo.svg/1024px-Google_Material_Design_Logo.svg.png"}
          height={50}
        />
      </Toolbar>
    </AppBar>
  );
}
