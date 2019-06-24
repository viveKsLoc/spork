import React, { useContext } from "react";
import { Card, CardContent, TextField, CardActions, Button, Grid } from "@material-ui/core";
import Context from "./Context";
import frontpageImg from "../assets/sc.png";
import "./Login.css";

export default function Login({ history }) {
  const ctx = useContext(Context);

  function handleLogin() {
    ctx.dispatch({ type: "login", payload: 1 });
    history.push("/");
  }

  return (
    <div className="Login">
      <Card square style={{ maxWidth: "50vh" }}>
        <CardContent>
          <Grid container direction="column">
            <TextField label="Email" type="email" />
            <TextField label="Password" type="password" />
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Log in
          </Button>
        </CardActions>
      </Card>
      <img src={frontpageImg} alt="" className="front-page-img" />
    </div>
  );
}
