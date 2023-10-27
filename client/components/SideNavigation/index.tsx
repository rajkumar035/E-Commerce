"use client";

import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IReactNode } from "@/interfaces/ICommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons/faWarehouse";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faUserGear } from "@fortawesome/free-solid-svg-icons/faUserGear";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import Link from "next/link";
import { clearLocalStorageItem } from "@/helpers/localstorage";
import { logoutUser } from "@/services/rest";
import getCookie from "@/helpers/cookieParser";

const drawerWidth = 240;

const useStyles = makeStyles({
  mainDrawer: {
    "& .MuiDrawer-paper": {
      backgroundColor: "rgba(21, 59, 68, 1)",
      borderRight: "none",
    },
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "18px",
    letterSpacing: "0.07em",
    fontWeight: "normal",
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideNavigation: React.FunctionComponent<IReactNode> = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const isAdmin = getCookie("type") === "ADMIN";

  const handleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    const userid = getCookie("cred");
    logoutUser(userid).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <>
      <Box display={"flex"}>
        <Drawer variant="permanent" open={open} className={classes.mainDrawer}>
          <Box component={"div"} className={`${open ? "d-flex justify-content-end" : "text-center"}`}>
            <IconButton className="pt-4 px-4 pb-0" onClick={handleDrawer}>
              {open ? <FontAwesomeIcon icon={faAngleDoubleLeft} fontSize={"20px"} color="rgba(255, 255, 255, 0.8)" /> : <FontAwesomeIcon icon={faAngleDoubleRight} fontSize={"20px"} color="rgba(255, 255, 255, 0.8)" />}
            </IconButton>
          </Box>
          <List sx={{ background: "rgba(21, 59, 68, 1)" }} className="mt-3">
            <Link className="m-0 p-0 text-decoration-none" href="/Cart">
              <ListItemButton className="p-3 px-4">
                <ListItemIcon>
                  <FontAwesomeIcon icon={faCartShopping} fontSize={"20px"} color="rgba(255, 255, 255, 0.8)" />
                </ListItemIcon>
                <ListItemText className={classes.tabText}>Cart</ListItemText>
              </ListItemButton>
            </Link>
            <Link className="m-0 p-0 text-decoration-none" href="/Storage">
              <ListItemButton className="p-3 px-4">
                <ListItemIcon>
                  <FontAwesomeIcon icon={faWarehouse} fontSize={"20px"} color="rgba(255, 255, 255, 0.8)" />
                </ListItemIcon>
                <ListItemText className={classes.tabText}>Storage</ListItemText>
              </ListItemButton>
            </Link>
            {isAdmin && (
              <Link className="m-0 p-0 text-decoration-none" href="/Workers">
                <ListItemButton className="p-3 px-4">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faUserGear} fontSize={"20px"} color="rgba(255, 255, 255, 0.8)" />
                  </ListItemIcon>
                  <ListItemText className={classes.tabText}>Workers</ListItemText>
                </ListItemButton>
              </Link>
            )}
          </List>
        </Drawer>
        <Box component="main" className="px-5" minHeight={"100vh"} maxHeight={"max-content"} flexGrow={1}>
          <div className="d-flex justify-content-end gap-2 mx-1 mt-3 mb-0">
            {isAdmin && (
              <Link className="m-0 p-0 text-decoration-none" href="/Profile">
                <FontAwesomeIcon icon={faUser} color="rgba(0, 0, 0, 1)" className="border border-2 shadow-sm rounded-circle p-3" role="button" />
              </Link>
            )}
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="border border-2 shadow-sm rounded-circle p-3"
              role="button"
              onClick={() => {
                logout();
              }}
            />
          </div>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SideNavigation;
