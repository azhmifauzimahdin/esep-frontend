import { FC } from "react";
import ReactLoading from "react-loading";
import Img from "../Image/Img";
import { LogoRSI } from "../../assets";

const LoadingScreen: FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <ReactLoading type="bubbles" color="#2E8B57" />
      <Img src={LogoRSI} alt="Logo RSI" className="h-9 absolute bottom-8" />
    </div>
  );
};

export default LoadingScreen;
