"use client";

import React, { useEffect, useState } from "react";
import "@/app/global.css";
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
import { ICartStorageManagement, IGetRawStorage, IGetRawStorageByIDApollo, IGetRawStorageByUserIDApollo } from "@/interfaces/IStorage";
import { OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { GET_RAW_STORAGE_BY_ID_FOR_CART, GET_RAW_STORAGE_FOR_CART } from "@/services/queries";
import getCookie from "@/helpers/cookieParser";

/*
 *
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

  const user_id = getCookie("cred");

  // State for barcode feature enable
  const [barToggle, setBarToggle] = useState<boolean>(false);

  // State for edit table row index selection
  const [editRow, setEditRow] = useState<number | null>(null);

  // state for handling itemname in add cart form
  const [selectedItem, setSelectedItem] = useState<IGetRawStorage | null>(null);

  // Quantity Selection
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");

  // state for maintaining the datas in summary table
  const [summary, setSummary] = useState<Array<IGetRawStorage>>([]);

  //state for selecting the item id
  const [storageId, setStorageId] = useState<string | null>(null);

  // Storage available stocks
  const [storageDatas, setStorageDatas] = useState<ICartStorageManagement>({
    actualStorage: [],
    usedStorage: [],
  });

  /*
   *
   *
   * GraphQl  Queries
   *
   *
   */

  // For getting All storage by userid
  const { data }: QueryResult<IGetRawStorageByUserIDApollo<IGetRawStorage>, OperationVariables> = useQuery(GET_RAW_STORAGE_FOR_CART, { variables: { user_id: user_id }, pollInterval: 300000 });

  // For getting storage by storageid (onChange)
  const { refetch: storageRefetch }: QueryResult<IGetRawStorageByIDApollo<IGetRawStorage>, OperationVariables> = useQuery(GET_RAW_STORAGE_BY_ID_FOR_CART, { skip: true });

  useEffect(() => {
    setStorageDatas({
      actualStorage: data?.StorageByUserId ? data?.StorageByUserId : [],
      usedStorage: data?.StorageByUserId ? data?.StorageByUserId : [],
    });
  }, [data]);

  // barcode feature enable and disable function
  const handleBarCodeToggle: () => void = () => {
    setBarToggle(!barToggle);
  };

  // Saving the select field value in the state
  const handleItemName: (value: string) => void = async (value: string) => {
    setStorageId(value);
    const data = await storageRefetch({ id: value });
    setSelectedItem(data.data.Storage);
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
      //Storage Update
      const tempCartStorage = storageDatas.usedStorage;
      const newUsedStorage: Array<IGetRawStorage> = tempCartStorage.filter((items, index) => {
        return items._id !== selectedItem._id;
      });
      setStorageDatas({
        actualStorage: storageDatas && storageDatas.actualStorage,
        usedStorage: newUsedStorage,
      });
      //Adding the items in the cart table
      const mainData: IGetRawStorage = { ...selectedItem, quantity: parseInt(itemQuantity) };
      if (editRow === null) {
        // To add the item in cart
        setSummary((prev) => [...prev, mainData]);
      } else {
        //For edit method
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
  const handleDeleteSummaryIndex: (index: number, items: IGetRawStorage) => void = (index: number, items: IGetRawStorage) => {
    // Deleting the individual selected item from cart table
    const tempArray: Array<IGetRawStorage> = summary;
    tempArray.splice(index, 1);
    setSummary(tempArray);

    //Storage Update
    const tempCartStorage = storageDatas.actualStorage;
    const deletedStorage = tempCartStorage.filter((store) => {
      return store._id === items._id;
    });
    if (deletedStorage) {
      const newUsedStorage: Array<IGetRawStorage> = [...storageDatas.usedStorage, deletedStorage[0]];
      setStorageDatas({
        actualStorage: storageDatas.actualStorage,
        usedStorage: newUsedStorage,
      });
    }
  };

  //For Calculating the cart itmes total price
  const handleCartItemsPriceCalc: () => number = () => {
    let total: number = 0;
    for (let i = 0; i < summary.length; i++) {
      total = total + summary[i].quantity * summary[i].price_per_unit;
    }
    return total;
  };

  return (
    <>
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
                  {storageDatas.actualStorage && storageDatas.actualStorage.length > 0 ? "Eg:Tomato" : "No Stocks Avialable"}
                </option>
                {storageDatas.usedStorage &&
                  storageDatas.usedStorage.length > 0 &&
                  storageDatas.usedStorage.map((items: IGetRawStorage, index: number) => {
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
                            handleDeleteSummaryIndex(index, items);
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
      <button className="btn btn-dark px-5 my-3">Pay: {handleCartItemsPriceCalc()}</button>
    </>
  );
};

export default Cart;
