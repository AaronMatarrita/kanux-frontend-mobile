import { httpClient } from "@services/http";
import { getDeviceId } from "@lib/device";
import { TalentProfile } from "../types/session.types";

export interface PreRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  userType: "talent";
  deviceId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceId?: string;
}

export interface PreRegisterResponse {
  success: boolean;
  user: string;
  token: string;
  sessionId: string;
  nextStep: "REGISTER_TALENT";
}

export interface UserProfile {
  id?: string;
  [key: string]: unknown;
}

export type LoginResponse = {
  token: string;
  sessionId: string;
  user: {
    id: string;
    email: string;
    userType: "talent";
    profile: TalentProfile;
  };
};

export const authService = {
  preRegister: async (
    data: PreRegisterRequest,
  ): Promise<PreRegisterResponse> => {
    const deviceId = await getDeviceId();
    const res = await httpClient.post<PreRegisterResponse>(
      "/auth/pre-register",
      { ...data, deviceId },
    );
    return res.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const deviceId = await getDeviceId();
    const res = await httpClient.post<LoginResponse>("/auth/login", {
      ...data,
      deviceId,
    });
    return res.data;
  },
};
