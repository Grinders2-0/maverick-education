import AsyncStorage from "@react-native-async-storage/async-storage";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const getInfo = async () => {
    const timeout = setTimeout(() => {
      navigate("/form");
    }, 1000);

    return () => clearTimeout(timeout);
  };
  useEffect(() => {
    getInfo();
  }, []);

  return null;
};

export default memo(SplashScreen);
