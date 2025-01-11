import { AxiosResponse } from "axios";
import { PatientRequest, PatientsResponse } from "../types/patient";
import httpRequest from "./api";

export const addPatient = async (
  Request: PatientRequest
): Promise<AxiosResponse<PatientsResponse>> => {
  return await httpRequest.post("/patients", Request);
};

export const updateStatusPatient = async (
  id: string
): Promise<AxiosResponse<PatientsResponse>> => {
  return await httpRequest.put(`/patients/finished/${id}`);
};

export const fetchPatients = async (): Promise<
  AxiosResponse<PatientsResponse>
> => {
  return await httpRequest.get("/patients");
};

export const fetchPatientsToday = async (): Promise<
  AxiosResponse<PatientsResponse>
> => {
  return await httpRequest.get("/patients/today");
};

export const fetchPatientsPending = async (): Promise<
  AxiosResponse<PatientsResponse>
> => {
  return await httpRequest.get("/patients/pending");
};
