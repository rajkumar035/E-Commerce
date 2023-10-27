"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Poppins } from "next/font/google";
import Box from "@mui/material/Box";
import { SubmitHandler, useForm } from "react-hook-form";
import { IHookFormValidation } from "@/interfaces/ICommon";
import { REGEX } from "@/helpers/constants";
import { logiUserByOtp, verifyLoginOtp } from "@/services/rest";
import { IUserOtp, IUserOtpValidate } from "@/interfaces/IUser";
import { AxiosResponse } from "axios";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

const Login = () => {
  const navigate = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<IHookFormValidation>();

  const [getOtp, setOtp] = useState<boolean>(false);
  const [otp, readOtp] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [jwt, setJwt] = useState<string>("");

  const handleMobileNumberSubmit: SubmitHandler<IHookFormValidation> = (data) => {
    const body: IUserOtp = {
      phoneNumber: data ? data.mobileNumber : "",
      role: `${"CONSUMER"}`.toUpperCase() as "CONSUMER" | "PROVIDER",
    };
    logiUserByOtp(body)
      .then((res: AxiosResponse) => {
        setPhoneNumber(data.mobileNumber);
        const otp: string = res.data.otp;
        const jwt: string = res.data.jwt;
        setJwt(jwt);
        reset();
        setOtp(true);
        alert(`OTP: ${otp}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOtpSubmit: SubmitHandler<IHookFormValidation> = (data) => {
    const body: IUserOtpValidate = {
      phoneNumber: phoneNumber,
      otp: data ? data.otp : "",
      jwt: jwt,
    };
    verifyLoginOtp(body)
      .then(() => {
        reset();
        navigate.push("/Cart");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className={inter.className}>
      <Box className="d-flex justify-content-center w-100" height={"100vh"}>
        <div className="my-auto">
          <h6 className="text-uppercase font-black-24-bold my-3">{"CONSUMER"}</h6>
          {getOtp ? (
            <Box component={"form"} onSubmit={handleSubmit(handleOtpSubmit)} width={"340px"}>
              <label htmlFor="otp">OTP</label>
              <div className="w-100 mb-2">
                <input
                  type="text"
                  id="otp"
                  maxLength={6}
                  placeholder="OTP"
                  className="mt-1 w-100 py-2 px-2 rounded-2"
                  {...register("otp", {
                    required: "OTP is required",
                    onChange: (e) => {
                      let otp: string = e.target.value;
                      readOtp(otp);
                    },
                  })}
                />
                <div className="d-flex justify-content-between w-100 my-2">
                  <h6 className="otp-caption-font">02:00</h6>
                  <h6 className="otp-caption-font">Resend OTP?</h6>
                </div>
              </div>
              <button type="submit" className="btn btn-small btn-dark w-100" disabled={otp.length !== 6}>
                Login
              </button>
            </Box>
          ) : (
            <Box component={"form"} onSubmit={handleSubmit(handleMobileNumberSubmit)} width={"340px"}>
              <label htmlFor="mobileNumber">Mobile Number</label>
              <div className="mb-3 w-100">
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  className="mt-1 w-100 py-2 px-2 rounded-2"
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                    pattern: {
                      value: REGEX.PHONE_NUMBER,
                      message: "Invalid Mobile Number",
                    },
                  })}
                />
                {errors["mobileNumber"]?.message && <h6 className="form-error my-1">{errors["mobileNumber"].message}</h6>}
              </div>
              <button type="submit" className="btn btn-small btn-dark w-100">
                Get OTP
              </button>
            </Box>
          )}
        </div>
      </Box>
    </section>
  );
};

export default Login;
