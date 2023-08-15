const BACKENDURL = "http://localhost:2100";

const LOCALUSER = "intro";

const REGEX = {
  MOBILE: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  PINCODE: /^[0-9]{6,6}$/,
  NUMBER: /^[0-9]/,
  YEAR: /^[0-9]{4,4}$/,
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  PHONE_NUMBER: /^[0-9]*$/,
  AADHAAR: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
  EMAIL: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
};

const Measures = ["Kg", "Mg", "Nos", "L", "Ml"];

export { REGEX, Measures, BACKENDURL, LOCALUSER };
