import { SETLOADING } from "../types/loading";

export const setLoading = (data: boolean) => {
  return {
    type: SETLOADING,
    payload: data,
  };
};
