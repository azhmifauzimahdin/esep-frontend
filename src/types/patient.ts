import { Guarantor } from "./guarantor";

export interface Patient {
  id: string;
  rm: string;
  episode: string;
  name: string;
  status: number;
  guarantor: Guarantor;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PatientRequest {
  rm: string;
  episode: string;
  name: string;
  guarantor_code: string;
}

export interface PatientsResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    patients: Patient[];
  };
}
