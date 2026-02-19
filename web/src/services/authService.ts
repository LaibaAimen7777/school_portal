import { api } from "./api";
import { LoginPayload, LoginResponse } from "@/types/auth";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  console.log("response in authservice.ts in web", response.data);
  return response.data;
};
