"use client";

import "bootstrap/dist/css/bootstrap.css";
import { useRouter, withRouter } from "next/router";
import { FormEvent, SyntheticEvent, useState } from "react";

const Login = () => {
  const navigate = useRouter();
  const [getOtp, setOtp] = useState<boolean>(false);

  const handleMobileNumberSubmit: Function = (e: FormEvent<SyntheticEvent>) => {
    e.preventDefault();
    console.log(e.target);
    setOtp(true);
  };

  const handleOtpSubmit: Function = (e: FormEvent<SyntheticEvent>) => {
    e.preventDefault();
    console.log(e);
    navigate.push({
      pathname: "/Cart",
    });
  };

  return (
    <div className="d-flex justify-content-center w-100 h-100">
      <div className="m-auto">
        <h6 className="text-uppercase fw-bold text-dark">{navigate.query.user}</h6>
        {getOtp ? (
          <form
            onSubmit={(e) => {
              handleOtpSubmit(e);
            }}
          >
            <label htmlFor="getOtp">OTP</label>
            <input type="number" id="getOtp" name="getOtp" placeholder="Mobile Number" className="form-control" required />
            <button type="submit" className="btn btn-small btn-dark w-100">
              Get OTP
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              handleMobileNumberSubmit(e);
            }}
          >
            <label htmlFor="userNumber">Mobile Number</label>
            <input type="number" id="userNumber" name="userNumber" placeholder="Mobile Number" className="form-control" required />
            <button type="submit" className="btn btn-small btn-dark w-100">
              Get OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default withRouter(Login);
