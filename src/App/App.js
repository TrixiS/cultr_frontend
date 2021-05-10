import { Switch, Route } from "react-router-dom";
import MainContainer from "./MainContainer";
import Header from "./Header";
import Content from "./Content";

import PrivateRoute from "./PrivateRoute";
import { LoginPage, LogoutPage, RegisterPage } from "../AuthPages/";
import { HomePage } from "../HomePage/";
import { UrlsPage } from "../UrlsPage/";
import { ProfilePage } from "../ProfilePage/";

import "./css/App.css";
import "antd/dist/antd.css";

// TODO: logo
// TODO: handle 403 api error

export default function App() {
  console.log(process.env.REACT_APP_API_URL);

  return (
    <MainContainer>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/urls" component={UrlsPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
        </Switch>
      </Content>
    </MainContainer>
  );
}
