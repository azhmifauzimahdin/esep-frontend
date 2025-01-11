import { SETSUCCESSMESSAGE } from "../types/successMessage";

export const setSuccessMessage = (data: string) => {
  return {
    type: SETSUCCESSMESSAGE,
    payload: data,
  };
};
