import { BACKENDURL } from "@/helpers/constants";
import { ICreateStorage, IGetRawStorage, IGetStorageData } from "@/interfaces/IStorage";
import { IUserOtp, IUserOtpValidate } from "@/interfaces/IUser";
import axios, { AxiosInstance, AxiosResponse } from "axios";

/*
*
*
Creating an instance of axios for application
*
*
*/

const ApplicationHttpInstance: AxiosInstance = axios.create({
  baseURL: BACKENDURL,
});

/*
*
*
User Section API's
*
*
*/

// Post Body to get OTP (POST)

export const logiUserByOtp: (body: IUserOtp) => Promise<AxiosResponse> = async (body: IUserOtp) => {
  const getUserOtp = await ApplicationHttpInstance.post("/api/login", body);
  return getUserOtp;
};

// Post OTP to login (POST)

export const verifyLoginOtp: (body: IUserOtpValidate) => Promise<AxiosResponse> = async (body: IUserOtpValidate) => {
  const getValidate = await ApplicationHttpInstance.post("/api/verifyOtp", body);
  return getValidate;
};

/*
*
*
Storage Section API's
*
*
*/

// Get Storage By user ID (GET)

export const getStorageByUserId: (userId: string) => Promise<AxiosResponse<Array<IGetStorageData>>> = async (userId: string) => {
  const getData = await ApplicationHttpInstance.get<Array<IGetStorageData>>(`/api/getwarehousebyuser/${userId}`);
  return getData;
};

// Get Storage By User ID and Item Name (GET)

export const getStorageByIdandItemName: (userId: string, itemName: string) => Promise<AxiosResponse<IGetStorageData>> = async (userId: string, itemName: string) => {
  const getData = await ApplicationHttpInstance.get<IGetStorageData>(`/api/getwarehousebyuser/${itemName}/${userId}`);
  return getData;
};

// Get Raw Storage By User ID (GET)

export const getRawStorageByUserId: (userId: string) => Promise<AxiosResponse<Array<IGetRawStorage>>> = async (userId: string) => {
  const getStorage = await ApplicationHttpInstance.get<Array<IGetRawStorage>>(`/api/getallstorage/${userId}`);
  return getStorage;
};

// Post Storage By User ID (POST)

export const createStorageById: (payload: ICreateStorage) => Promise<AxiosResponse> = async (payload: ICreateStorage) => {
  const isCreated = await ApplicationHttpInstance.post("api/createwarehouse", payload);
  return isCreated;
};

// Get Storage By ID Only (GET)

export const getStorageById: (storageId: string) => Promise<AxiosResponse<IGetRawStorage>> = async (storageId: string) => {
  const getStorageById = await ApplicationHttpInstance.get(`api/getStorageById/${storageId}`);
  return getStorageById;
};
