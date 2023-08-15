"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import { IGetStorageData, IGetStorageWareHouseData } from "@/interfaces/IStorage";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { IHookFormValidation } from "@/interfaces/ICommon";
import { getStorageById } from "@/services/api";
import { AxiosResponse } from "axios";
import { getLocalStorageItem } from "@/helpers/localstorage";
import { LOCALUSER } from "@/helpers/constants";

const Layout = React.lazy(() => import("@/pages/Storage/layout"));

const Storage: React.FunctionComponent = () => {
  // Next Router Initialization
  const router = useRouter();

  // MUI Theme Initialization
  const theme: Theme = useTheme();

  // MobileScreen Initialization
  const isMobileScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  // UseForm Component Initialization
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IHookFormValidation>();

  // state for create item modal
  const [openCreate, setCreate] = useState<boolean>(false);

  // state for filter input
  const [filterText, setFilterText] = useState<string | null>(null);

  const [storageDataById, setStorageDataById] = useState<Array<IGetStorageData>>();

  // funtion for open/close create item modal
  const handleCreateModal: () => void = () => {
    setCreate(!openCreate);
  };

  // saving the textfrom filter input to state
  const handleFilterInputText: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // navigation function to navigate to sub items page
  const handleNavigation: (path: string, state: Array<IGetStorageWareHouseData>) => void = (path: string, state: Array<IGetStorageWareHouseData>) => {
    router.push({
      pathname: `/Storage/${path}`,
    });
  };

  // creating main item using useform
  const handleCreateItem: (data: IHookFormValidation) => void = (data: IHookFormValidation) => {
    console.log(data);
    reset();
    handleCreateModal();
  };

  useEffect(() => {
    try {
      const id: string | null = getLocalStorageItem(LOCALUSER);
      if (id) {
        getStorageById(id)
          .then((res: AxiosResponse<Array<IGetStorageData>>) => {
            setStorageDataById(res.data);
          })
          .catch((err) => {
            return err;
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Layout>
      <h6 className="font-black-30-bolder mt-4 mb-5">Storage</h6>
      {/*
       *
       *
       *Create Item modal
       *
       *
       * */}
      <Modal open={openCreate}>
        <Box component={"div"} className="bg-white p-4 pt-3 rounded-3 app-modal" width={isMobileScreen ? "340px" : "40%"}>
          <h6 className="font-black-22-bold mb-4 mt-2">Create Item</h6>
          <form onSubmit={handleSubmit(handleCreateItem)}>
            <div className="w-100 my-3">
              <input className="form-control my-1" type="file" {...register("thumbnail", { required: "Thumbnail is required" })} />
              {errors["thumbnail"] && <p className="form-error">{errors["thumbnail"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="Main Item" type="text" {...register("mainItem", { required: "MainItem is required" })} />
              {errors["mainItem"] && <p className="form-error">{errors["mainItem"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="Sub Item" type="text" {...register("subItem", { required: "SubItem is required" })} />
              {errors["subItem"] && <p className="form-error">{errors["subItem"].message}</p>}
            </div>
            <button className="btn btn-medium btn-dark w-100">Create</button>
          </form>
        </Box>
      </Modal>
      {/*
       *
       *
       * Search content and create modal button
       *
       *
       * */}
      <div className="my-2 mb-4">
        <Grid container lg={12} md={12} sm={12} spacing={2}>
          <Grid item lg={10} md={10} sm={12}>
            <input type="text" placeholder="Search For Items..." className="form-control" onChange={handleFilterInputText} />
          </Grid>
          <Grid item lg={2} md={2} sm={12}>
            <button className="btn btn-dark btn-medium w-100" onClick={handleCreateModal}>
              Create Item
            </button>
          </Grid>
        </Grid>
      </div>
      {/*
       *
       *
       * Items in Grid
       *
       *
       * */}
      <Grid container lg={12} md={12} sm={12} xs={12} spacing={"16px"}>
        {storageDataById &&
          storageDataById.length > 0 &&
          storageDataById.map((items: IGetStorageData, index: number) => {
            return (
              <Grid item={true} key={index} lg={3} md={4} sm={6} xs={12}>
                <div
                  role="button"
                  style={{ backgroundImage: `url(fruits.jpg)` }}
                  className="w-100 text-center rounded-2 storage-items-car-bg"
                  onClick={() => {
                    handleNavigation(items.item_type, items.warehouse);
                  }}
                >
                  <Box component={"div"} bgcolor={"rgba(0, 0, 0, 0.6)"} className="py-4 rounded-2">
                    <h6 className="font-black-14-bold my-1 py-0 text-white">{items.item_type}</h6>
                    <h6 id="number-animate" className="font-black-38-bolder my-1 py-0 text-white">
                      {items.warehouse.length}
                    </h6>
                  </Box>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </Layout>
  );
};

export default Storage;
