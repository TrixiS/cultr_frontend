import { Switch, Route } from "react-router-dom";
import MainContainer from "./MainContainer";
import Header from "./Header";
import Content from "./Content";

import {
  HomePage,
  PrivateRoute,
  LoginPage,
  UrlsPage,
  ProfilePage,
} from "../components";

import "./css/App.css";
import "antd/dist/antd.css";

// TODO: logo
// TODO: handle 403 api error
// TODO: fix error boundary, push children if error handler returns undefined

export default function App() {
  return (
    <MainContainer>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/urls" component={UrlsPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
        </Switch>
      </Content>
    </MainContainer>
  );
}
