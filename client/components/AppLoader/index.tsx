import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AppLoader = () => {
  return (
    <Box component={"div"} height={"100vh"} bgcolor={"rgba(0, 0, 0, 0.3)"} className={"d-flex align-items-center justify-content-center Apploader-container"} data-testid="KenLoader">
      <CircularProgress sx={{ color: `rgb(21, 59, 68) !important` }} />
    </Box>
  );
};

export default AppLoader;
