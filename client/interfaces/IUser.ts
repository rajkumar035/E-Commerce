interface IUserOtp {
  phoneNumber: string;
  role: "CONSUMER" | "PROVIDER";
}

interface IUserOtpValidate {
  phoneNumber: string;
  otp: string;
  jwt: string;
}

export type { IUserOtp, IUserOtpValidate };
