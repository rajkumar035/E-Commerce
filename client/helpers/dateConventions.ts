import dayjs from "dayjs";

const dateConventions: (date: string, conventionType: "YY" | "YYYY" | "M" | "MM" | "MMM" | "MMMM" | "D" | "DD" | "d" | "dd" | "ddd" | "dddd" | "H" | "HH" | "h" | "hh" | "m" | "mm" | "s" | "sss" | "SSS" | "a") => void = (
  date: string,
  conventionType: "YY" | "YYYY" | "M" | "MM" | "MMM" | "MMMM" | "D" | "DD" | "d" | "dd" | "ddd" | "dddd" | "H" | "HH" | "h" | "hh" | "m" | "mm" | "s" | "sss" | "SSS" | "a"
) => {
  return dayjs(date).format(conventionType);
};

export { dateConventions };
