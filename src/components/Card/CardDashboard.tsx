import { FC, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

export interface DataCardDashboard {
  icon: ReactNode;
  content: ReactNode;
}

interface InputProps {
  data: DataCardDashboard[];
  loading?: boolean;
}

const CardDahboard: FC<InputProps> = (props) => {
  const { data, loading } = props;
  return (
    <>
      {data
        ? data.map((data: DataCardDashboard, index: number) => (
            <div
              key={index}
              className="flex items-center gap-5 bg-white rounded-lg p-3 shadow-sm"
            >
              {loading ? (
                <Skeleton circle={true} width={50} height={50} />
              ) : (
                data.icon
              )}
              <div className="grow">
                {loading ? (
                  <>
                    <Skeleton height={20} className="mb-1" />
                    <Skeleton />
                  </>
                ) : (
                  data.content
                )}
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default CardDahboard;
