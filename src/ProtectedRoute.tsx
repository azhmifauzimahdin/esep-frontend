import { FC, useEffect, useState } from "react";
import { LoadingScreen } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import httpRequest from "./services/api";
import axios from "axios";

export const Authorization: FC = () => {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    try {
      await httpRequest.get("/authorization");
      setRender(true);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.code === 401) {
          navigate("/unauthorized");
        }
      }
    }
  };

  if (!render) {
    return <LoadingScreen />;
  }

  return <Outlet />;
};
