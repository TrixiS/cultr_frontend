import { useCallback, useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";

export const useLoading = (loading) => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(loading ?? false);
  }, [setIsLoading]);

  return {
    isLoading,
    setIsLoading: useCallback((value) => setIsLoading(value), [setIsLoading]),
  };
};
