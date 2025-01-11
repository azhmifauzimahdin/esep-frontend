import { ADDERRORMESSAGE, SETERRORMESSAGE } from "../types/errorMessage";

export const setErrorMessage = (data: string[]) => {
  return {
    type: SETERRORMESSAGE,
    payload: data,
  };
};

export const addErrorMessage = (data: string) => {
  return {
    type: ADDERRORMESSAGE,
    payload: data,
  };
};
