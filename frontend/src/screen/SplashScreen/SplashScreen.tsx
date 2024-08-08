import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/app/store";
import {
  getIsLoggedIn,
  getUserData,
  getUserTokenFromState,
} from "../../redux/action/auth/auth";

const SplashScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getInfo = async () => {
    const timeout = setTimeout(() => {
      dispatch(getUserTokenFromState());
      dispatch(getIsLoggedIn());
      dispatch(getUserData());
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
