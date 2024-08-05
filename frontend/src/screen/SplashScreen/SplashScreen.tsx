import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const getInfo = async () => {
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 1000);

    return () => clearTimeout(timeout);
  };
  useEffect(() => {
    getInfo();
  }, []);

  return null;
};

export default memo(SplashScreen);
