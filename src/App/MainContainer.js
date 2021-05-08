import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/authContext"; // TODO: index.js imports for ../context
import { LoadingContext } from "../context/loadingContext";
import { useLoading } from "../hooks/useLoading";
import { fetchApi } from "../hooks/useApi";
import { Layout } from "antd";

import createPersistedState from "use-persisted-state";

const localStorageTokenKey = "accessToken";
const useUserTokenState = createPersistedState(localStorageTokenKey);

function AuthContextProvider({ children }) {
  const { isLoading, setIsLoading } = useLoading();

  const [accessToken, setAccessToken] = useUserTokenState(
    localStorage.getItem(localStorageTokenKey)
  );

  const [authState, setAuthState] = useState({
    accessToken,
    setAccessToken,
    user: null,
  });

  useEffect(() => {
    if (accessToken === null && !isLoading) {
      setAuthState((state) => ({ ...state, accessToken: null, user: null }));
      return;
    }

    setIsLoading(true);

    fetchApi("users/@me", { method: "GET" }, accessToken).then(
      ([res, data]) => {
        setAuthState((state) => ({
          ...state,
          accessToken,
          user: res.ok ? data : null,
        }));
        setIsLoading(false);
      }
    );
  }, [accessToken]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export default function MainContainer({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <AuthContextProvider>
            <Layout>{children}</Layout>
          </AuthContextProvider>
        </LoadingContext.Provider>
      </div>
    </BrowserRouter>
  );
}
