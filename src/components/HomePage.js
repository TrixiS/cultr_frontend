import { useEffect } from "react";
import { useLoading } from "../hooks/useLoading";
import { Alert } from "antd";

function HomePage() {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const alertMessage = `The application is still under development.
  If you want to test it, use "user" login and password.`;

  return (
    <Alert
      message="Warning"
      description={alertMessage}
      type="warning"
      showIcon
    />
  );
}

export default HomePage;
