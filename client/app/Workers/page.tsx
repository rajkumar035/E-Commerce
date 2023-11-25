"use client";

import React, { useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import { ICreateStorage, IEditStorage, IGetStorageData, IGetStorageWareHouseData } from "@/interfaces/IStorage";
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
import StyledTableRow from "@/components/TableRow";
import { Measures } from "@/helpers/constants";
import { useSearchParams } from "next/navigation";
import AppLoader from "@/components/AppLoader/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import getCookie from "@/helpers/cookieParser";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ADMIN } from "@/services/queries";

const Workers: React.FunctionComponent = () => {
  // MUI Theme Initialization
  const theme: Theme = useTheme();

  const userId = getCookie("cred");

  // Mobilescreen Initialization
  const isMobileScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  // State for create sub item modal
  const [openCreate, setCreate] = useState<boolean>(false);

  // State for filter text
  const [filterText, setFilterText] = useState<string | null>(null);

  //maintaining main data in state
  const [subItems, setSubItems] = useState<IGetStorageData>();

  // Open Edit for storage
  const [editItem, setEditItem] = useState<boolean>(false);

  // Open Delete Modal for storage
  const [deleteItem, setDeleteItem] = useState<boolean>(false);

  // get storage ID on edit
  const [storageId, setStorageId] = useState<string | null>(null);

  const { data } = useQuery(GET_USER_BY_ADMIN, { variables: { admin_id: getCookie("cred") } });

  console.log(data);

  // open/close of create sub item modal
  const handleCreateModal: () => void = () => {
    setCreate(!openCreate);
  };

  // open/close edit modal
  const handleEditModal: () => void = () => {
    setEditItem(!editItem);
  };

  // open/close delete modal
  const handleDeleteModal: () => void = () => {
    setDeleteItem(!deleteItem);
  };

  // Get storage ID
  const handleEditStorageId: (id: string | null) => void = (id: string | null) => {
    setStorageId(id);
  };

  // setting the text for input to state for filter
  const handleFilterInputText: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // components UseForms Initialization
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<IHookFormValidation>();

  // Form submission to edit sub items

  const handleEditSubItem: (data: IHookFormValidation) => void = (data: IHookFormValidation) => {
    if (subItems && userId) {
      const { subItem, price, measurer, quantity } = data;
      const editStoragePayload: IEditStorage = {
        item_img: `${subItems.item_img}`,
        user_id: userId,
        item_type: `${subItems.item_type}`,
        item_name: subItem,
        quantity: quantity,
        units_in_measure: measurer,
        price_per_unit: price,
        _id: `${storageId}`,
      };
    }
  };

  // Form submission to create sub items
  const handleCreateSubItem: (data: IHookFormValidation) => void = (data: IHookFormValidation) => {
    if (subItems && userId) {
      const { subItem, price, measurer, quantity } = data;
      const createStoragePayload: ICreateStorage = {
        item_img: `${subItems.item_img}`,
        user_id: userId,
        item_type: `${subItems.item_type}`,
        item_name: subItem,
        quantity: quantity,
        units_in_measure: measurer,
        price_per_unit: price,
      };
    }
  };

  // Function to delete a storage
  const handleStorageDelete: (id: string) => void = (id: string) => {};
  return (
    <>
      {/*
       *
       *
       * Create Sub Item modal
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
              <input className="form-control my-1" placeholder="price" type="number" {...register("price", { required: "Price is required" })} />
              {errors["price"] && <p className="form-error">{errors["price"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="quantity" type="number" {...register("quantity", { required: "Quantity is required" })} />
              {errors["quantity"] && <p className="form-error">{errors["quantity"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <select className="form-select my-1" defaultValue={"null"} {...register("measurer", { required: "Measurer is required" })}>
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
            <div className={`d-flex ${isMobileScreen ? "flex-wrap" : "flex-nowrap"} gap-3 w-100`}>
              <button
                className="btn btn-medium btn-outline-dark w-100"
                onClick={() => {
                  handleCreateModal();
                  reset();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-medium btn-dark w-100">
                Create
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      {/*
       *
       *
       * Edit Sub Item modal
       *
       *
       * */}
      <Modal open={editItem}>
        <Box component={"div"} className="bg-white p-4 pt-3 rounded-3 app-modal" width={isMobileScreen ? "340px" : "40%"}>
          <h6 className="fs-4 fw-bold mb-4 mt-2">Edit SubItem</h6>
          <form onSubmit={handleSubmit(handleEditSubItem)}>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="Sub Item" type="text" disabled {...register("subItem", { required: "SubItem is required" })} />
              {errors["subItem"] && <p className="form-error">{errors["subItem"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="price" type="number" {...register("price", { required: "Price is required" })} />
              {errors["price"] && <p className="form-error">{errors["price"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <input className="form-control my-1" placeholder="quantity" type="number" {...register("quantity", { required: "Quantity is required" })} />
              {errors["quantity"] && <p className="form-error">{errors["quantity"].message}</p>}
            </div>
            <div className="w-100 my-3">
              <select className="form-select my-1" defaultValue={"null"} {...register("measurer", { required: "Measurer is required" })}>
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
            <div className={`d-flex ${isMobileScreen ? "flex-wrap" : "flex-nowrap"} gap-3 w-100`}>
              <button
                className="btn btn-medium btn-outline-dark w-100"
                onClick={() => {
                  handleEditStorageId(null);
                  handleEditModal();
                  reset();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-medium btn-dark w-100">
                Update
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      {/*
       *
       *
       * Delete Sub Item modal
       *
       *
       * */}
      <Modal open={deleteItem}>
        <Box component={"div"} className="bg-white p-4 pt-3 rounded-3 app-modal" width={isMobileScreen ? "340px" : "30%"}>
          <h6 className="pt-2">
            <strong>Are you sure you want to delete ?</strong>
          </h6>
          <div className="d-flex gap-2 justify-content-end pt-2">
            <button
              onClick={() => {
                handleDeleteModal();
                handleEditStorageId(null);
              }}
              className="btn btn-small btn-outline-dark"
            >
              Cancel
            </button>
            {storageId !== null && (
              <button
                onClick={() => {
                  handleStorageDelete(storageId);
                }}
                className="btn btn-small btn-danger"
              >
                Delete
              </button>
            )}
          </div>
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
          <h6 className="fs-6 fw-semibold m-0">{`${subItems ? subItems?.warehouse.length : "0"}`}</h6>
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
              <td className="fs-6 fw-semibold text-white my-0 py-3">Price</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Measurer</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Available</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Last Updated</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Stock Worth</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Actions</td>
            </TableRow>
          </TableHead>
          {subItems && subItems?.warehouse.length > 0 && (
            <TableBody>
              {subItems?.warehouse.map((items: IGetStorageWareHouseData, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    <td className="fs-6 fw-semibold my-0 p-3">{index + 1}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.items_name}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.price_per_unit}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.units_in_measure}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.quanity}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{items.last_update}</td>
                    <td className="fs-6 fw-semibold my-0 py-3">{`Rs.${parseInt(items.quanity) * parseInt(items.price_per_unit)}`}</td>
                    <td className="my-0 py-3">
                      <div className="d-flex gap-4">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          color="#5f69d4"
                          size={"1x"}
                          role="button"
                          onClick={() => {
                            setValue("subItem", items.items_name);
                            setValue("quantity", items.quanity);
                            setValue("price", items.price_per_unit);
                            setValue("measurer", items.units_in_measure);
                            handleEditStorageId(items._id);
                            handleEditModal();
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          color="#cf6c5f"
                          size={"1x"}
                          role="button"
                          onClick={() => {
                            handleEditStorageId(items._id);
                            handleDeleteModal();
                          }}
                        />
                      </div>
                    </td>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Workers;
