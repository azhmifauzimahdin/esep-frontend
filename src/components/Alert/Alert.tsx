import { FC, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { setErrorMessage } from "../../redux/actions/errorMessage";
import { setSuccessMessage } from "../../redux/actions/successMessage";
import { useDispatch } from "react-redux";

interface InputProps {
  type: "danger" | "success";
  hidden: boolean;
  children: any;
  className?: string;
}
const Alert: FC<InputProps> = (props) => {
  const { type, children, hidden = true, className } = props;
  const [visible, setVisible] = useState<boolean>(!hidden);
  const dispatch = useDispatch();

  useEffect(() => {
    setVisible(!hidden);
    if (!hidden) {
      const timer = setInterval(() => {
        setVisible(false);
        dispatch(setSuccessMessage(""));
        dispatch(setErrorMessage([]));
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [hidden]);

  let color;
  switch (type) {
    case "danger":
      color = "text-red-900 bg-red-100";
      break;
    case "success":
      color = "text-green-900 bg-green-100";
  }

  return (
    <div
      className={`text-sm fixed transition-all duration-500 right-1/2 md:right-5 translate-x-1/2 md:translate-x-0 w-[84%] md:w-96 shadow rounded-lg py-3 ps-3 pe-8 z-50 ${color} 
        ${visible ? "top-5" : "-top-20"} ${className} `}
      role="alert"
    >
      <div className="overflow-hidden">
        {children}
        <FaXmark
          className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer ${
            !visible && "hidden"
          }`}
          onClick={() => setVisible(false)}
        />
      </div>
    </div>
  );
};

export default Alert;
