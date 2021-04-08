import "./App.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import createPersistedState from "use-persisted-state";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import UrlsPage from "./components/UrlsPage";
import LogoutPage from "./components/LogoutPage";
import LoginControl from "./components/LoginControl";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const { Header, Content, Footer } = Layout;
const localStorageTokenKey = "jwtToken";
const useUserTokenState = createPersistedState(localStorageTokenKey);

// TODO: footer dev
// TODO: logo

function App() {
  const [token, setUserToken] = useUserTokenState(
    localStorage.getItem(localStorageTokenKey)
  );

  const handleError = (error) => {
    if (error.status === 401) {
      setUserToken(null);
      return <Redirect to="/login" />;
    }

    return <div>Something went wrong :(</div>;
  };

  return (
    <Router>
      <div className="App">
        <Layout className="layout">
          <Header className="header-navbar">
            {/* <div className="logo" /> */}
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item className="auth-button" key="login">
                <LoginControl userToken={token} />
              </Menu.Item>
              {token !== null && (
                <Menu.Item key="urls">
                  <Link to="/urls">Urls</Link>
                </Menu.Item>
              )}
            </Menu>
          </Header>
          <Content style={{ padding: "0 2vh" }}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/login">
                  <LoginPage setUserToken={setUserToken} referrer="/urls" />
                </Route>
                <Route exact path="/logout">
                  <LogoutPage setUserToken={setUserToken} />
                </Route>
                <PrivateRoute exact path="/urls" userToken={token}>
                  <ErrorBoundary onError={handleError}>
                    <UrlsPage userToken={token} />
                  </ErrorBoundary>
                </PrivateRoute>
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
