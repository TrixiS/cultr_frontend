import React from "react";

export const AuthContext = React.createContext({
  accessToken: null,
  user: null,
});
