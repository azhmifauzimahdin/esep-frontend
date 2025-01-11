import { FC, MouseEvent, ReactNode } from "react";
import ReactLoading from "react-loading";
import Skeleton from "react-loading-skeleton";

interface InputProps {
  type: "button" | "submit";
  color: "primary" | "default" | "warning" | "danger" | "secondary";
  children: ReactNode;
  className?: string;
  disable?: boolean;
  width?: "full";
  size?: "sm" | "md";
  loading?: boolean;
  loadingRender?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<InputProps> = (props) => {
  const {
    type,
    color,
    children,
    className,
    disable,
    width,
    size = "md",
    loading,
    loadingRender,
    onClick,
  } = props;
  const classColor =
    color === "primary"
      ? "bg-gradient-to-r from-greens to-greene hover:from-greene hover:to-greens"
      : color === "default"
      ? "bg-gradient-to-r from-blues to-bluee hover:from-bluee hover:to-blues"
      : color === "warning"
      ? "bg-gradient-to-r from-yellows to-yellowe hover:from-yellowe hover:to-yellows"
      : color === "danger"
      ? "bg-red-700 hover:bg-red-800"
      : color === "secondary"
      ? "bg-gradient-to-r from-grays to-graye hover:from-graye hover:to-grays"
      : "";
  const classSize =
    size === "sm"
      ? "px-2.5 py-1.5 me-1"
      : size === "md"
      ? "px-5 py-2.5 me-2 mb-3 "
      : "";
  return (
    <>
      {loadingRender ? (
        <div>
          {width ? (
            <Skeleton height={36} borderRadius={8} />
          ) : (
            <Skeleton height={36} width={100} borderRadius={8} />
          )}
        </div>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={loading || disable}
          className={`relative text-white shadow font-medium rounded-lg disabled:from-slate-200 disabled:to-slate-200 ${
            loading ? "disabled:text-slate-200" : ""
          } ${classColor} ${classSize} ${
            width ? "w-full" : ""
          } transition-all duration-500 ease-in-out ${className}`}
        >
          {children}
          {loading ? (
            <ReactLoading
              type="bubbles"
              color="#2E8B57"
              className="absolute inset-0 m-auto large-box"
            />
          ) : null}
        </button>
      )}
    </>
  );
};

export default Button;
