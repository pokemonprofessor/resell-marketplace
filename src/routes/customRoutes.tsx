import { Routes, Route } from "react-router-dom";
import routes from "./routeList";
import Header from "components/Header";
import Content from "components/Content";
import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Divider,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
  Box,
} from "@mui/material";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import snack from "components/wrapper/snack";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InventoryIcon from "@mui/icons-material/Inventory";
import { ExpandLess, ExpandMore, PostAdd } from "@mui/icons-material";
import { getSellerStart, sellerLogoutStart } from "redux/reducers/seller";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InboxIcon from '@material-ui/icons/Inbox';
import { getUserStart, logoutStart } from "redux/reducers/user";

const drawerWidth = 240;
const CustomRoutes: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productOpen, setProductOpen] = React.useState(true);
  const [sellerDashboradOpen, setSellerDashboradOpen] = React.useState(true);
  const accessToken = useSelector((state: any) => state.user.accessToken);

  useEffect (() => {
    dispatch(getUserStart());
  }, []);

  const onSignOut = () => dispatch (logoutStart());

  return (
    <>
      {!accessToken ? (
        <>
          <Header />
          <Routes >
            {routes.map(({ path, ...rest }) => {
              if (rest.routeType === "un-auth")
                return (
                  <Route path={path} key={path} element={rest.component} />
                );
            })}
          </Routes>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
              }}
            >
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  Resell Seller Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Toolbar />
              <Divider />
              <List>
                <ListItemButton onClick={() => setProductOpen(!productOpen)}>
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Product Upload" />
                  {productOpen ? <ExpandLess /> : <ExpandMore />}  
                </ListItemButton>{" "}
                <Collapse in={productOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => navigate("/bulk-upload")}
                    >
                      <ListItemIcon>
                        <PostAdd />
                      </ListItemIcon>
                      <ListItemText primary="Bulk Upload" />
                    </ListItemButton>
                  </List>
                </Collapse>
              <br/>
              <ListItemButton onClick={() => setSellerDashboradOpen(!sellerDashboradOpen)}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Seller Dashboard" />
                  {sellerDashboradOpen ? <ExpandLess /> : <ExpandMore />}  
                </ListItemButton>{" "}
                <Collapse in={sellerDashboradOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => navigate("/seller-products")}
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => navigate("/order-details")}
                    >
                      <ListItemIcon>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Orders" />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => navigate("/listing-status-update")}
                    >
                      <ListItemIcon>
                        <SyncAltIcon />
                      </ListItemIcon>
                      <ListItemText primary="update Products" />
                    </ListItemButton>
                  </List>
                </Collapse>
              <br/>

                <ListItem button key="Sign Out">
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" onClick={onSignOut} />
                </ListItem>
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
              <Toolbar />
              <Routes>
                {routes.map(({ path, ...rest }) => {
                  if (rest.routeType === "auth")
                    return (
                      <Route path={path} key={path} element={rest.component} />
                    );
                })}
              </Routes>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default CustomRoutes;
