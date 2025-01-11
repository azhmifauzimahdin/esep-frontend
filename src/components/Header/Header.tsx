import { FC } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

interface header {
  title: string;
  path: string;
}
interface InputProps {
  title: string;
  data?: header[];
}
const Header: FC<InputProps> = (props) => {
  const { title, data } = props;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center mb-2">
      <div className="font-medium text-xl flex items-center gap-3 md:gap-5">
        {data && data?.length > 1 ? (
          <IoArrowBackOutline
            onClick={() => navigate(data ? data[0].path : "")}
            className=" text-greens cursor-pointer hover:text-greene"
          />
        ) : null}
        {title}
      </div>
      <div className="text-xs md:text-sm">
        <Link to="/" className="text-greenx me-1">
          Home
        </Link>
        {data?.map((item, index) => (
          <span key={index}>
            /
            <Link
              to={item.path}
              className={`mx-1 ${item.path ? "text-greenx" : ""}`}
            >
              {item.title}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header;
