"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import { IGetStorageData, IGetStorageWareHouseData } from "@/interfaces/IStorage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableRow from "@mui/material/TableRow";
import { Theme, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { IHookFormValidation } from "@/interfaces/ICommon";
import { useRouter } from "next/router";
import StyledTableRow from "@/components/TableRow";
import { LOCALUSER, Measures } from "@/helpers/constants";
import { getStorageByIdandItemName } from "@/services/api";
import { getLocalStorageItem } from "@/helpers/localstorage";
import { AxiosResponse } from "axios";

const Layout = React.lazy(() => import("@/pages/Storage/[ItemName]/layout"));

const SubStorageItems: React.FunctionComponent = () => {
  // MUI Theme Initialization
  const theme: Theme = useTheme();

  // Mobilescreen Initialization
  const isMobileScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  // components UseForms Initialization
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IHookFormValidation>();

  // Router's location data fetching
  const { query } = useRouter();
  const itemName = query.ItemName;

  // State for create sub item modal
  const [openCreate, setCreate] = useState<boolean>(false);

  // State for filter text
  const [filterText, setFilterText] = useState<string | null>(null);

  //maintaining main data in state
  const [subItems, setSubItems] = useState<IGetStorageData>();

  // open/close of create sub item modal
  const handleCreateModal: () => void = () => {
    setCreate(!openCreate);
  };

  // setting the text for input to state for filter
  const handleFilterInputText: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // Form submission of create sub items
  const handleCreateSubItem: (data: IHookFormValidation) => void = (data: IHookFormValidation) => {
    console.log(data);
    reset();
    handleCreateModal();
  };

  // Fetching Storage data by Userid and itemname
  useEffect(() => {
    try {
      const id: string | null = getLocalStorageItem(LOCALUSER);
      if (id && itemName) {
        getStorageByIdandItemName(id, itemName as string)
          .then((res: AxiosResponse<IGetStorageData>) => {
            setSubItems(res.data);
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
      <h3 className="text-dark mt-4 mb-5 fw-bold">{itemName}</h3>
      {/*
       *
       *
       *Create Sub Item modal
       *
       *
       * */}
      <Modal open={openCreate}>
        <Box component={"div"} className="bg-white p-4 pt-3 rounded-3 app-modal" width={isMobileScreen ? "340px" : "40%"}>
          <h6 className="fs-4 fw-bold mb-4 mt-2">Create SubItem</h6>
          <form onSubmit={handleSubmit(handleCreateSubItem)}>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="Sub Item" type="text" {...register("subItem", { required: "SubItem is required" })} />
              {errors["subItem"] && <p className="form-error">{errors["subItem"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="price" type="number" {...register("price", { required: "SubItem is required" })} />
              {errors["price"] && <p className="form-error">{errors["price"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <select className="form-select my-1" defaultValue={"null"} {...register("measurer", { required: "SubItem is required" })}>
                <optgroup>
                  <option value={"null"} disabled>
                    Select the Measurer
                  </option>
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
            <button className="btn btn-medium btn-dark w-100">Create</button>
          </form>
        </Box>
      </Modal>
      {/*
       *
       *
       * Summary about the item
       *
       *
       * */}
      <div className="w-100 d-flex flex-wrap justify-content-between align-items-center p-4 rounded-3 shadow-sm" style={{ background: "rgba(21, 59, 68, 0.2)" }}>
        <div>
          <h6 className="fs-6 fw-bold">Total Items</h6>
          <h6 className="fs-6 fw-semibold m-0">{subItems?.warehouse.length}</h6>
        </div>
        <div>
          <h6 className="fs-6 fw-bold">Total Worth</h6>
          <h6 className="fs-6 fw-semibold m-0">Rs. 45000</h6>
        </div>
        <div>
          <h6 className="fs-6 fw-bold">Intake</h6>
          <h6 className="fs-6 fw-semibold m-0">Rs. 30000</h6>
        </div>
        <div>
          <h6 className="fs-6 fw-bold">Sold Out</h6>
          <h6 className="fs-6 fw-semibold m-0">Rs. 40000</h6>
        </div>
      </div>
      {/*
       *
       *
       * Search content and create modal button
       *
       *
       * */}
      <div className="my-4">
        <Grid container lg={12} md={12} sm={12} spacing={2}>
          <Grid item lg={10} md={10} sm={12}>
            <input type="text" placeholder="Search For Items..." className="form-control" onChange={handleFilterInputText} />
          </Grid>
          <Grid item lg={2} md={2} sm={12}>
            <button className="btn btn-dark btn-medium w-100" onClick={handleCreateModal}>
              Create Sub Item
            </button>
          </Grid>
        </Grid>
      </div>
      {/*
       *
       *
       * SubItems
       *
       *
       * */}
      <TableContainer className="rounded-2">
        <Table>
          <TableHead component={"thead"}>
            <TableRow style={{ background: "rgba(21, 59, 68, 0.7)" }}>
              <td className="fs-6 fw-semibold text-white my-0 p-3">S.No</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Item Name</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Rate</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Measurer</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Available</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Last Updated</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Stock Worth</td>
            </TableRow>
          </TableHead>
          {subItems && subItems.warehouse.length > 0 && (
            <TableBody>
              {subItems.warehouse.map((items: IGetStorageWareHouseData, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    <td className="fs-6 fw-semibold my-0 p-3">{index + 1}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.items_name}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.price_per_unit}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.units_in_measure}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.quanity}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.last_update}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{`Rs.${parseInt(items.quanity) * parseInt(items.price_per_unit)}`}</td>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default SubStorageItems;
