import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface InputProps {
  to?: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  active?: boolean;
}

const NavLink: FC<InputProps> = (props) => {
  const { to = "", children, onClick, className, active } = props;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-slate-700 py-1.5 px-4 flex items-center gap-3 p-2 rounded-lg group ${
        active
          ? "bg-gradient-to-r text-white from-greens to-greene hover:from-greene hover:to-greens"
          : "hover:text-greenx hover:bg-slate-200"
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
