import React, { useState, useEffect } from "react";
import createPersistedState from "use-persisted-state";
import { Layout, Menu } from "antd";
import { LoadingContext } from "./context/loadingContext";
import { AuthContext } from "./context/authContext";
import { fetchApi } from "./hooks/useApi";
import "./css/App.css";
import "antd/dist/antd.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import {
  LoginControl,
  LoginPage,
  LogoutPage,
  PrivateRoute,
  ErrorBoundary,
  HomePage,
  UrlsPage,
  Loading,
  ProfilePage,
} from "./components";

const { Header, Content, Footer } = Layout;

const localStorageTokenKey = "accessToken";
const useUserTokenState = createPersistedState(localStorageTokenKey);

// TODO: logo

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setUserToken] = useUserTokenState(
    localStorage.getItem(localStorageTokenKey)
  );
  const [authState, setAuthState] = useState({
    accessToken: token,
    user: null,
  });

  useEffect(() => {
    if (token === null) {
      setAuthState({ accessToken: null, user: null });
      return;
    }

    fetchApi("users/@me", { method: "GET" }, token).then(([res, data]) =>
      setAuthState({ accessToken: token, user: res.ok ? data : null })
    );
  }, [token]);

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
        <AuthContext.Provider value={authState}>
          <Layout>
            <Header className="header-navbar">
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="home">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <LoginControl className="auth-button" key="login" />
                <Menu.Item key="urls" hidden={authState.user === null}>
                  <Link to="/urls">Urls</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "0 2vh" }}>
              <div className="site-layout-content">
                <Layout style={{ backgroundColor: "#fff" }}>
                  <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                    <Loading>
                      <Switch>
                        <Route path="/login">
                          <LoginPage
                            setUserToken={setUserToken}
                            referrer="/urls" // TODO: current path, try to move boundary inside private route
                          />
                        </Route>
                        <Route exact path="/logout">
                          <LogoutPage setUserToken={setUserToken} />
                        </Route>
                        <PrivateRoute exact path="/urls">
                          <ErrorBoundary onError={handleError}>
                            <UrlsPage />
                          </ErrorBoundary>
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile">
                          <ErrorBoundary onError={handleError}>
                            <ProfilePage />
                          </ErrorBoundary>
                        </PrivateRoute>
                        <Route exact path="/">
                          <HomePage />
                        </Route>
                      </Switch>
                    </Loading>
                  </LoadingContext.Provider>
                </Layout>
              </div>
            </Content>
          </Layout>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}
