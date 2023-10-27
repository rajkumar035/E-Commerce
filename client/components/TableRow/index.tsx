import { styled } from "@mui/material";
import TableRow from "@mui/material/TableRow";

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}));

export default StyledTableRow;
