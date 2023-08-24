"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import StyledTableRow from "@/components/TableRow";
import { useForm } from "react-hook-form";
import { IHookFormValidation } from "@/interfaces/ICommon";
import { getRawStorageByUserId, getStorageById } from "@/services/api";
import { getLocalStorageItem } from "@/helpers/localstorage";
import { LOCALUSER } from "@/helpers/constants";
import { AxiosResponse } from "axios";
import { IGetRawStorage } from "@/interfaces/IStorage";
import "@/app/globals.css";

const Layout = React.lazy(() => import("@/pages/Cart/layout"));

/*
 *
 *Customized Toggle Switch
 *
 *
 */

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: `rgba(21, 59, 68, 1)`,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(21, 59, 68, 0.3)",
    boxSizing: "border-box",
  },
}));

const Cart: React.FunctionComponent = () => {
  // UseForm Component initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // State for barcode feature enable
  const [barToggle, setBarToggle] = useState<boolean>(false);

  // State for edit table row index selection
  const [editRow, setEditRow] = useState<number | null>(null);

  // state for handling itemname in add cart form
  const [selectedItem, setSelectedItem] = useState<IGetRawStorage | null>(null);

  // state for maintaining the datas in summary table
  const [summary, setSummary] = useState<Array<IGetRawStorage>>([]);

  // Storage available stocks
  const [storageDatas, setStorageDatas] = useState<Array<IGetRawStorage>>();

  // Quantity Selection
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");

  // barcode feature enable and disable function
  const handleBarCodeToggle: () => void = () => {
    setBarToggle(!barToggle);
  };

  // Saving the select field value in the state
  const handleItemName: (value: string) => void = async (value: string) => {
    await getStorageById(value)
      .then((res: AxiosResponse<IGetRawStorage>) => {
        setSelectedItem(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // To enable edit feature and data of the selected row in summary table
  const handleEditSummaryProducts: (index: number, data: IGetRawStorage) => void = (index: number, data: IGetRawStorage) => {
    setEditRow(index);
    setSelectedItem(data);
    setSelectedQuantity(`${data.quantity}`);
  };

  // Saving the data from the add cart form (create/edit)
  const handleItemsAdd: (data: IHookFormValidation) => void = (data: IHookFormValidation) => {
    const { itemQuantity } = data;
    if (selectedItem) {
      const mainData: IGetRawStorage = { ...selectedItem, quantity: parseInt(itemQuantity) };
      if (editRow === null) {
        setSummary((prev) => [...prev, mainData]);
      } else {
        const tempArray: Array<IGetRawStorage> = summary;
        tempArray[editRow - 1] = mainData;
        setSummary(tempArray);
        setEditRow(null);
      }
    }
    setSelectedItem(null);
    setSelectedQuantity("");
    reset();
  };

  //For delete the saved products in the table
  const handleDeleteSummaryIndex: (index: number) => void = (index: number) => {
    const tempArray: Array<IGetRawStorage> = summary;
    tempArray.splice(index, 1);
    setSummary(tempArray);
  };

  // Fetching the Storage Data
  useEffect(() => {
    try {
      const userId: string | null = getLocalStorageItem(LOCALUSER);
      if (userId) {
        getRawStorageByUserId(userId)
          .then((res: AxiosResponse<Array<IGetRawStorage>>) => {
            if (res.status === 200) {
              setStorageDatas(res.data);
            } else {
              console.error("No User");
            }
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
      <h3 className="text-dark mb-4 mt-0 fw-bold">Cart</h3>
      {/*
       *
       *
       * Bar Code Feature Enable
       *
       *
       * */}
      <div className="d-flex gap-3 align-items-center my-2">
        <label htmlFor="toggleBar" className={`m-0 fs-6 fw-semibold ${barToggle ? "text-dark" : "text-secondary"}`}>
          Bar Code Mode
        </label>
        <AntSwitch
          id="toggleBar"
          checked={barToggle}
          onChange={() => {
            handleBarCodeToggle();
          }}
        />
      </div>
      {/*
       *
       *
       * Form Labels
       *
       *
       * */}
      <Grid container lg={12} md={12} sm={12} spacing={2} className="w-100">
        <Grid item={true} lg={4} md={12} sm={12}>
          <label htmlFor="itemname" className={`my-1 fw-normal fs-6 ${errors["itemName"]?.message === "" ? "text-danger" : ""}`}>
            Item Name
          </label>
        </Grid>
        <Grid item={true} lg={3} md={12} sm={12}>
          <label htmlFor="itemQuantity" className={`my-1 fw-normal fs-6 ${errors["itemQuantity"]?.message === "" ? "text-danger" : ""}`}>
            Quantity
          </label>
        </Grid>
        <Grid item={true} lg={3} md={12} sm={12}>
          <label htmlFor="itemPrice" className="my-1 fw-normal fs-6">
            Item Price
          </label>
        </Grid>
        <Grid item={true} lg={2} md={12} sm={12} />
      </Grid>
      {/*
       *
       *
       * Form Inputs
       *
       *
       * */}
      <form onSubmit={handleSubmit(handleItemsAdd)}>
        <Grid container lg={12} md={12} sm={12} spacing={2} className="w-100">
          <Grid item={true} lg={4} md={12} sm={12}>
            <select
              id="itemName"
              disabled={barToggle || editRow !== null}
              value={selectedItem ? selectedItem._id : "NULL"}
              className={errors["itemName"]?.message === "" ? "border border-danger border-2" : ""}
              {...register("itemName", {
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleItemName(e.target.value);
                },
                required: editRow !== null ? false : true,
              })}
            >
              <optgroup>
                <option disabled value={"NULL"}>
                  {storageDatas && storageDatas.length > 0 ? "Eg:Tomato" : "No Stocks Avialable"}
                </option>
                {storageDatas &&
                  storageDatas.length > 0 &&
                  storageDatas.map((items: IGetRawStorage, index: number) => {
                    return (
                      <option key={index} value={items._id}>
                        {`${items.item_name} - ${items.item_type}`}
                      </option>
                    );
                  })}
              </optgroup>
            </select>
          </Grid>
          <Grid item={true} lg={3} md={12} sm={12}>
            <input
              type="number"
              className={errors["itemQuantity"]?.message === "" ? "border border-danger border-2" : ""}
              placeholder="Eg: 1"
              value={selectedQuantity}
              id="itemQuantity"
              disabled={barToggle || selectedItem === null}
              {...register("itemQuantity", {
                required: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedQuantity(`${e.target.value}`);
                },
              })}
            />
          </Grid>
          <Grid item={true} lg={3} md={12} sm={12}>
            <input type="number" disabled={true} value={selectedItem ? selectedItem.price_per_unit : 0} placeholder="Auto Generated" id="itemPrice" />
          </Grid>
          <Grid item={true} lg={2} md={12} sm={12}>
            {editRow === null ? (
              <button type="submit" className="btn btn-dark w-100" disabled={barToggle}>
                Add
              </button>
            ) : (
              <button type="submit" className="btn btn-dark w-100" disabled={barToggle}>
                Edit
              </button>
            )}
          </Grid>
        </Grid>
      </form>
      <h5 className="my-4 mt-5">Summary</h5>
      {/*
       *
       *
       * Summary of Products Entered in form above table view
       *
       *
       * */}
      <TableContainer className="rounded-2">
        <Table>
          <TableHead component={"thead"}>
            <StyledTableRow style={{ background: "rgba(21, 59, 68, 0.7)" }}>
              <td className="fs-6 fw-semibold text-white my-0 p-3">S.No</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Product Name</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Quantity</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Metrics</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Actual Price / Metric</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Total</td>
              <td className="fs-6 fw-semibold text-white my-0 py-3">Action</td>
            </StyledTableRow>
          </TableHead>
          {summary.length > 0 && (
            <TableBody>
              {summary.map((items: IGetRawStorage, index: number) => {
                console.log(items, "sdasd");
                const editEnabled = index + 1 === editRow;
                return (
                  <StyledTableRow key={index} className={`border border-secondary ${editEnabled ? "border-2" : "border-0"}`}>
                    <td className={`fs-6 fw-semibold my-0 p-3`}>{index + 1}</td>
                    <td className={`fs-6 fw-semibold my-0 py-3`}>{items.item_name}</td>
                    <td className={`fs-6 fw-semibold my-0 py-3`}>{items.quantity}</td>
                    <td className={`fs-6 fw-semibold my-0 py-3`}>{items.units_in_measure}</td>
                    <td className={`fs-6 fw-semibold my-0 py-3`}>{items.price_per_unit}</td>
                    <td className={`fs-6 fw-semibold my-0 py-3`}>{items.quantity * items.price_per_unit}</td>
                    <td className="my-0 py-3">
                      <div className="d-flex gap-4">
                        {!editEnabled && (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            color="#5f69d4"
                            size={"1x"}
                            role="button"
                            onClick={() => {
                              handleEditSummaryProducts(index + 1, items);
                            }}
                          />
                        )}
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          color="#cf6c5f"
                          size={"1x"}
                          role="button"
                          onClick={() => {
                            handleDeleteSummaryIndex(index);
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
      <button className="btn btn-dark px-5 my-3">Pay: 0</button>
    </Layout>
  );
};

export default Cart;
