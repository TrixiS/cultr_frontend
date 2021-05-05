import { useCallback, useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";

export const useLoading = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(() => true);
  }, [setIsLoading]);

  return {
    isLoading,
    setIsLoading: useCallback((value) => setIsLoading(value), [setIsLoading]),
  };
};
