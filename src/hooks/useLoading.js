import { useCallback, useContext, useEffect } from "react";
import { LoadingContext } from "../components/Loading";

export const useLoading = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(() => true);
  }, [setIsLoading]);

  return {
    isLoading,
    setIsLoading: useCallback((e) => setIsLoading(e), [setIsLoading]),
  };
};
