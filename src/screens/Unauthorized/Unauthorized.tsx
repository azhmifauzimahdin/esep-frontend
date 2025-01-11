import { FC, useEffect, useState } from "react";
import { Img } from "../../components";
import { Unauthorized as UnauthorizedImg } from "../../assets";
import Skeleton from "react-loading-skeleton";
import { IPService } from "../../services";

const Unauthorized: FC = () => {
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchIp = async () => {
      setLoading(true);
      try {
        const response = await IPService.fetchIp();
        setIp(response.data.data.IP_Address);
      } catch (error) {
        console.log("Failed to retrieve IP address : ", error);
      }
      setLoading(false);
    };
    fetchIp();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Img
          src={UnauthorizedImg}
          alt="Unauthorized"
          className="w-56 mx-auto"
        />
        <h1 className="text-lg font-medium text-greenx text-center">
          Komputer Tidak Memiliki Akses
        </h1>
        {loading ? (
          <div className="flex justify-center">
            <Skeleton width={100} />
          </div>
        ) : (
          <h1 className="text-center text-slate-400">{ip}</h1>
        )}
      </div>
    </div>
  );
};

export default Unauthorized;
