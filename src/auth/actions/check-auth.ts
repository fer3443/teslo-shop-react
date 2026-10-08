import { tesloApi } from "@/api/testlo-api";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token-teslo')
  if (!token) throw new Error('No token found');
  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    localStorage.setItem('token-teslo', data?.token);
    return data;
  } catch (error) {
    localStorage.removeItem('token-teslo')
    throw new Error('token expired or not valid')
  }
}