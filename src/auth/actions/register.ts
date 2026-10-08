import { tesloApi } from "@/api/testlo-api";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerActions = async ( email:string, password:string, fullName:string ): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName
    });
    return data;
  } catch (error) {
    throw error
  }
}