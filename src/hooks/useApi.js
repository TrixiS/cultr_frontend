import { useState, useCallback } from "react";
import { useError } from "./useError";

export const fetchApi = async (method, options, token) => {
  if (!options.headers) options.headers = {};
  options.headers.Authorization = `Bearer ${token}`;
  const response = await fetch(process.env.REACT_APP_API_URL + method, options);
  const data = await response.json();
  return [response, data];
};

// TODO!!!: create senseful useApi hook
// TODO: useError in hook
// TODO: authContext

export const useApi = () => {
  // TODO: const accessToken = useContext(AuthContext);
  const throwError = useError();
};

// export const useApi = (token) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const execute = async (...params) => {
//     setIsLoading(true);

//     try {
//       const [res, data] = await fetchApi(...params, token);
//       if (res.ok) setData(data);
//       else setError(res.status);
//     } catch (e) {
//       setError(e);
//     }

//     setIsLoading(false);
//   };

//   return { isLoading, error, data, execute: useCallback(execute, []) };
// };
