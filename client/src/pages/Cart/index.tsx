"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IProductSummary } from "@/interfaces/ICart";

const Layout = React.lazy(() => import("@/pages/Cart/layout"));

const Cart: React.FunctionComponent = () => {
  const [barToggle, setBarToggle] = useState<boolean>(false);
  const [summary, setSummary] = useState<Array<IProductSummary>>([
    {
      productName: "Tomato",
      quantity: "1",
      marketPrice: "140",
      totalBuyed: "140",
    },
  ]);

  const handleBarCodeToggle: Function = () => {
    setBarToggle(!barToggle);
  };

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  }));

  {
    /*
     *
     *Customized Toggle Switch
     *
     *
     */
  }
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

  return (
    <Layout>
      <h5 className="my-4">Product Details</h5>
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
          <label htmlFor="itemname" className="my-1 fw-normal fs-6">
            Item Name
          </label>
        </Grid>
        <Grid item={true} lg={3} md={12} sm={12}>
          <label htmlFor="itemQuantity" className="my-1 fw-normal fs-6">
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
      <Grid container lg={12} md={12} sm={12} spacing={2} className="w-100">
        <Grid item={true} lg={4} md={12} sm={12}>
          <select className="w-100 form-select" id="itemName" defaultValue={"NULL"} disabled={barToggle}>
            <optgroup>
              <option disabled value={"NULL"}>
                Eg:Tomato
              </option>
              <option value={"Dhal"}>Dhal</option>
            </optgroup>
          </select>
        </Grid>
        <Grid item={true} lg={3} md={12} sm={12}>
          <input type="number" min={1} placeholder="Eg: 1" className="form-control w-100" name="itemQuantity" id="itemQuantity" disabled={barToggle} />
        </Grid>
        <Grid item={true} lg={3} md={12} sm={12}>
          <input type="number" value={300} disabled className="form-control w-100" placeholder="Auto Generated" name="itemprice" id="itemPrice" />
        </Grid>
        <Grid item={true} lg={2} md={12} sm={12}>
          <button className="btn btn-dark w-100" disabled={barToggle}>
            Add
          </button>
        </Grid>
      </Grid>
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
              <TableCell className="text-light fw-bold">S.No</TableCell>
              <TableCell className="text-light fw-bold">Product Name</TableCell>
              <TableCell className="text-light fw-bold">Quantity</TableCell>
              <TableCell className="text-light fw-bold">Actual Price / Metric</TableCell>
              <TableCell className="text-light fw-bold">Total</TableCell>
              <TableCell className="text-light fw-bold">Action</TableCell>
            </StyledTableRow>
          </TableHead>
          {summary.length > 0 && (
            <TableBody>
              {summary.map((items: IProductSummary, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{items.productName}</TableCell>
                    <TableCell>{items.quantity}</TableCell>
                    <TableCell>{items.marketPrice}</TableCell>
                    <TableCell>{items.totalBuyed}</TableCell>
                    <TableCell>
                      <div className="d-flex gap-3">
                        <FontAwesomeIcon icon={faPenToSquare} color="#5f69d4" size={"1x"} role="link" />
                        <FontAwesomeIcon icon={faTrashCan} color="#cf6c5f" size={"1x"} role="link" />
                      </div>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <button className="btn btn-dark px-5 my-3">Pay: 140</button>
    </Layout>
  );
};

export default Cart;
