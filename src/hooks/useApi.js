import { useCallback, useContext } from "react";
import { useError } from "./useError";
import { AuthContext } from "../context/authContext";

export const fetchApi = async (method, options, token) => {
  if (token) {
    if (!options.headers) options.headers = {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(process.env.REACT_APP_API_URL + method, options);
  const data = await response.json();
  return [response, data];
};

export const useApi = () => {
  const authState = useContext(AuthContext);
  const throwError = useError();

  const execute = async (method, options) => {
    const [res, data] = await fetchApi(method, options, authState.accessToken);

    if (!res.ok && res.status === 401)
      throwError({ text: data.detail, status: res.status });

    return [res, data];
  };

  return useCallback(execute, []);
};
