import React from "react";
import Nav from "./components/Nav";
import CoverPicture from "./components/CoverPicture";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import { ContextProvider } from "./components/Context";
import { CssBaseline } from "@material-ui/core";
import Login from "./components/Login";
import Users from "./components/Users";
import Form from "./components/Form";
import ViewServerData from "./components/ViewServerData";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ContextProvider>s
        <div className="App">
          <Nav />
          <CoverPicture />
          <main>
            <Switch>
              <Route path="/users" component={Users} />
              <Route path="/login" component={Login} />
              <Route path="/read" component={ViewServerData} />
              <Route path="/create" component={Form} />
              <Route path="/" component={Main} />
            </Switch>
          </main>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
