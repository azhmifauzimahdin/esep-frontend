import { FC, ReactNode, useEffect, useState } from "react";
import { IoChevronBack, IoRadioButtonOff } from "react-icons/io5";
import { Link } from "react-router-dom";

export interface OptionNavlink {
  to: string;
  label: string;
  active: boolean;
}

interface InputProps {
  to?: string;
  options: OptionNavlink[];
  children: ReactNode;
  onClick?: any;
  className?: string;
  active?: boolean;
}

const NavLinkDropdown: FC<InputProps> = (props) => {
  const { children, options, onClick, className, active } = props;
  const [toggle, setToogle] = useState<boolean>(
    options.some((data: OptionNavlink) => data.active === true)
  );

  useEffect(() => {
    const result = options.some((data: OptionNavlink) => data.active === true);
    setToogle(result);
  }, [options]);

  return (
    <div>
      <div
        onClick={() => {
          setToogle(!toggle);
          onClick();
        }}
        className={`text-slate-700 cursor-pointer py-1.5 px-4 flex items-center gap-3 p-2 rounded-lg group ${
          active
            ? "bg-gradient-to-r text-white from-greens to-greene hover:from-greene hover:to-greens"
            : ""
        } ${
          toggle
            ? "bg-gradient-to-r from-slate-200 to-slate-100 hover:from-slate-100 hover:to-slate-200"
            : "hover:text-greenx hover:bg-slate-200"
        } relative ${className}`}
      >
        {children}
        <IoChevronBack
          className={`absolute text-slate-500 right-2 transition-all delay-100 ${
            toggle ? "-rotate-90" : ""
          }`}
        />
      </div>
      <ul
        className={`font-medium space-y-1 flex-col overflow-hidden transition-all duration-700 mt-1 ${
          toggle ? "max-h-screen" : "max-h-0"
        }`}
      >
        {options
          ? options.map((data: OptionNavlink, index) => (
              <Link
                key={index}
                to={data.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                  data.active
                    ? "bg-gradient-to-r text-white from-greens to-greene hover:from-greene hover:to-greens"
                    : "hover:text-greenx hover:bg-slate-200"
                }`}
              >
                <IoRadioButtonOff className="text-lg" /> {data.label}
              </Link>
            ))
          : null}
      </ul>
    </div>
  );
};

export default NavLinkDropdown;
