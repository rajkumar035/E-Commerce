import { AUTHENTICATION_ORIGIN } from "@/helpers/constants";
import { IUserOtp, IUserOtpValidate } from "@/interfaces/IUser";
import axios, { AxiosInstance, AxiosResponse } from "axios";

/*
*
*
  Instance of axios for application
*
*
*/

const ApplicationHttpInstance: AxiosInstance = axios.create({
  baseURL: `http://localhost:2100/${AUTHENTICATION_ORIGIN}`,
  withCredentials: true,
});

// Post Body to get OTP (POST)

export const logiUserByOtp: (body: IUserOtp) => Promise<AxiosResponse> = async (body: IUserOtp) => {
  const getUserOtp = await ApplicationHttpInstance.post("/login", body);
  return getUserOtp;
};

// Post OTP to login (POST)

export const verifyLoginOtp: (body: IUserOtpValidate) => Promise<AxiosResponse> = async (body: IUserOtpValidate) => {
  const getValidate = await ApplicationHttpInstance.post("/verifyOtp", body);
  return getValidate;
};

// Create Refresh new token (GET)

export const getNewToken: (userid: string) => Promise<AxiosResponse> = async (userid: string) => {
  const newToken = await ApplicationHttpInstance.get(`/refreshToken/${userid}`);
  return newToken;
};

// Logout User (GET)

export const logoutUser: (userid: string) => Promise<AxiosResponse> = async (userid: string) => {
  const loggedOut = await ApplicationHttpInstance.get(`/logout/${userid}`);
  return loggedOut;
};
