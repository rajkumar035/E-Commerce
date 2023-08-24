"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import { ICreateStorage, IGetStorageData, IGetStorageWareHouseData } from "@/interfaces/IStorage";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { IHookFormValidation } from "@/interfaces/ICommon";
import { createStorageById, getStorageByUserId } from "@/services/api";
import { AxiosResponse } from "axios";
import { getLocalStorageItem } from "@/helpers/localstorage";
import { LOCALUSER, Measures } from "@/helpers/constants";
import Loader from "@/components/AppLoader";

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

  // state for loaders
  const [loaders, setLoaders] = useState<boolean>(false);

  // userid from storage
  const [userId, setUserId] = useState<string>("");

  // Main Data of storage
  const [storageDataById, setStorageDataById] = useState<Array<IGetStorageData>>();

  // For refetching data on data posting
  const [refetchData, setRefetchData] = useState<number>(0);

  // File to base64 string from form upload
  const [fileBase64, setFileBase64] = useState<string>("");

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
    setLoaders(true);
    router.push({
      pathname: `/Storage/${path}`,
    });
  };

  // Converting a file to base64
  const getBase64: (file: File) => void = (file: File) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFileBase64(reader.result as string);
    };
  };

  // Fetching storage data based on userID
  useEffect(() => {
    const id: string | null = getLocalStorageItem(LOCALUSER);
    try {
      if (id) {
        setLoaders(true);
        setUserId(id);
        getStorageByUserId(id)
          .then((res: AxiosResponse<Array<IGetStorageData>>) => {
            setStorageDataById(res.data);
            setLoaders(false);
          })
          .catch((err) => {
            return err;
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [refetchData]);

  // creating main item using useform
  const handleCreateItem: (data: IHookFormValidation) => void = (data: IHookFormValidation) => {
    const { mainItem, subItem, measurer, price, quantity } = data;
    const createStoragePayload: ICreateStorage = {
      item_img: `${fileBase64}`,
      user_id: userId,
      item_type: mainItem,
      item_name: subItem,
      quantity: quantity ? quantity : "0",
      units_in_measure: measurer,
      price_per_unit: price,
    };
    setLoaders(true);
    createStorageById(createStoragePayload)
      .then((res) => {
        if (res.status === 200) {
          setLoaders(false);
          setRefetchData(refetchData + 1);
          reset();
          handleCreateModal();
        }
        alert(`${res.data.Message}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout>
      {loaders && <Loader />}
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
              <input
                className="form-control my-1"
                type="file"
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file: FileList | null = e.target.files;
                    if (file !== null) {
                      getBase64(file[0]);
                    }
                  },
                })}
              />
              {errors["thumbnail"] && <p className="form-error">{errors["thumbnail"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="Main Item" type="text" multiple={false} accept="image/*" {...register("mainItem", { required: "MainItem is required" })} />
              {errors["mainItem"] && <p className="form-error">{errors["mainItem"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="Sub Item" type="text" {...register("subItem", { required: "SubItem is required" })} />
              {errors["subItem"] && <p className="form-error">{errors["subItem"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <select defaultValue={"Kg"} className="form-select my-1" {...register("measurer", { required: "Measurer is required" })}>
                <optgroup>
                  {Measures.map((items: string, index: number) => {
                    return (
                      <option value={items} key={index}>
                        {items}
                      </option>
                    );
                  })}
                </optgroup>
              </select>
              {errors["measurer"] && <p className="form-error">{errors["measurer"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="Price" type="number" {...register("price", { required: "Price per unit is required" })} />
              {errors["price"] && <p className="form-error">{errors["price"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="quantity" type="number" {...register("quantity")} />
            </div>
            <div className={`d-flex ${isMobileScreen ? "flex-wrap" : "flex-nowrap"} gap-3 w-100`}>
              <button
                className="btn btn-medium btn-outline-dark w-100"
                onClick={() => {
                  handleCreateModal();
                }}
              >
                Cancel
              </button>
              <button className="btn btn-medium btn-dark w-100">Create</button>
            </div>
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
                  style={{
                    backgroundImage: `url(${items.item_img})`,
                  }}
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
