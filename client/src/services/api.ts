import { BACKENDURL } from "@/helpers/constants";
import { IGetStorageData } from "@/interfaces/IStorage";
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

/*
*
*
Storage Section API's
*
*
*/

// Get Storage By user ID (GET)

export const getStorageById: (userId: string) => Promise<AxiosResponse<Array<IGetStorageData>>> = async (userId: string) => {
  const getData = await ApplicationHttpInstance.get<Array<IGetStorageData>>(`/api/getwarehousebyuser/${userId}`);
  return getData;
};

// Get Storage By User ID and Item Name (GET)

export const getStorageByIdandItemName: (userId: string, itemName: string) => Promise<AxiosResponse<IGetStorageData>> = async (userId: string, itemName: string) => {
  const getData = await ApplicationHttpInstance.get<IGetStorageData>(`/api/getwarehousebyuser/${itemName}/${userId}`);
  return getData;
};
