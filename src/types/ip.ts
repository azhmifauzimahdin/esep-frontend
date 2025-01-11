export interface IPResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    IP_Address: string;
  };
}
