"use client";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./index.css";

const Loader: React.FunctionComponent = () => {
  return (
    <Box component={"div"} bgcolor={"rgba(0, 0, 0, 0.3)"} className={"d-flex align-items-center justify-content-center loader-container"} data-testid="KenLoader">
      <CircularProgress sx={{ color: `rgb(21, 59, 68) !important` }} />
    </Box>
  );
};

export default Loader;
