import { Patient } from "../../types/patient";
import {
  DELPATIENT,
  MERGEPATIENT,
  SETPATIENT,
  UPDATESTATUSPATIENT,
} from "../types/patient";

export const setPatient = (data: Patient[]) => {
  return {
    type: SETPATIENT,
    payload: data,
  };
};

export const mergePatient = (data: Patient[]) => {
  return {
    type: MERGEPATIENT,
    payload: data,
  };
};
export const updateStatusPatient = (id: string) => {
  return {
    type: UPDATESTATUSPATIENT,
    payload: id,
  };
};

export const delPatient = (id: string) => {
  return {
    type: DELPATIENT,
    payload: id,
  };
};
