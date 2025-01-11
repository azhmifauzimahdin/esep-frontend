import { AxiosResponse } from "axios";
import { IPResponse } from "../types/ip";
import httpRequest from "./api";

export const fetchIp = async (): Promise<AxiosResponse<IPResponse>> => {
  return await httpRequest.get("/ip-check");
};
