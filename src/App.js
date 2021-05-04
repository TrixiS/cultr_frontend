import "./css/App.css";
import "antd/dist/antd.css";
import React, { useState } from "react";
import createPersistedState from "use-persisted-state";
import { Layout, Menu } from "antd";
import Loading, { LoadingContext } from "./components/Loading";

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
} from "./components";

const { Header, Content, Footer } = Layout;
const localStorageTokenKey = "access_token";
const useUserTokenState = createPersistedState(localStorageTokenKey);

// TODO: footer dev
// TODO: logo

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // TODO: AuthContext
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
        <Layout>
          <Header className="header-navbar">
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
              <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                <Loading>
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
                </Loading>
              </LoadingContext.Provider>
            </div>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
