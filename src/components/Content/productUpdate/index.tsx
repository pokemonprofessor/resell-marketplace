import { Autocomplete, Grid, List, ListItem, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesStart } from "redux/reducers/categories";
import { RootState } from "redux/store";
import { ExcelDownloaderTemplate } from "./excelDownloaderTemplate";
import ExcelToJson from "./uploadExcel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { taxCodesStart } from "redux/reducers/taxCodes";

import "../../../styles/common.css";
import "./style.css";

export const ProductQtyPriceUpdate = () => {
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [taxCodesList, setTaxCodes] = useState([]);
  const [categoryValue, setCategoryValue] = useState<string | null>();
  const [taxCodeValue, setTaxCodeValue] = useState<string | null>();
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    dispatch(categoriesStart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(taxCodesStart());
  }, [dispatch]);

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const taxCodes = useSelector((state: RootState) => state.taxCodes.taxCodes);

  useEffect(() => {
    let _categorylist: any = [];

    for (let i = 0; i < categories.length; i++) {
      _categorylist.push(categories[i].categoryName);
    }
    setCategoryList(_categorylist);
  }, [categories]);

  useEffect(() => {
    let _taxCodelist: any = [];

    for (let i = 0; i < taxCodes.length; i++) {
      _taxCodelist.push(`${taxCodes[i].name} || ${taxCodes[i].id}`);
    }
    setTaxCodes(_taxCodelist);
  }, [taxCodes]);

  const onBeforeDownload = () => {
    let _data = [];

    for (let i = 0; i < 1000; i++) {
      _data.push({
        "Product Id": "",
        "Sale Price": "",
        Price: "",
        Quantity: "",
        "Listing Status": "",
      });
    }

    return _data;
  };

  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item lg={6}>
          <div className="request-to-sell-wrap">
            <section className="request-form-section non-active">
              <div className="container">
                <div className="request-form-card">
                  <Grid
                    direction="column"
                    container
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        DOWNLOAD TEMPLATE
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent={"center"}
                        spacing={2}
                      >
                        <Grid item>
                          <ExcelDownloaderTemplate
                            btnName={"Download Template"}
                            fileName={"QtyPriceTemplate"}
                            onBeforeDownload={onBeforeDownload}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </section>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div className="request-to-sell-wrap">
            <section className="request-form-section non-active">
              <div className="container">
                <div className="request-form-card">
                  <Grid
                    direction="column"
                    container
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        UPLOAD PRODUCTS EXCEL FILE
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        spacing={8}
                      >
                        <Grid item>
                          <ExcelToJson />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </section>
          </div>
        </Grid>
      </Grid>
      <Grid
        direction="column"
        container
        alignItems="center"
        justifyContent={"center"}
      >
        <Grid item>
          <Paper
            sx={{
              borderRadius: 13,
              mx: "2px",
              border: `3px solid #0068ff`,
            }}
            elevation={24}
          >
            <Box sx={{ minWidth: 1000 }} p={2}>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <InfoIcon
                    sx={{ color: "red", marginRight: "10px", fontSize: "40px" }}
                  />
                  <p className="table-heading">Instructions</p>
                </div>
              </div>
              <div className="container container-margin">
                <div className="auth-form-wrap-home">
                  <Card sx={{ minWidth: 1000 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 30 }} color="#0f5b9e">
                        Follow the below steps to upload your products in our
                        product's database.
                      </Typography>
                      <br />
                      <Typography sx={{ fontSize: 20 }} color="InfoText">
                        1. Under 'DOWNLOAD PRODUCT TEMPLATE' section, Select a
                        category from the category dropdown and click on
                        'DOWNLOAD EXCEL SHEET' button. An excel sheet will get
                        downloaded on your system named 'ProductTemplate.xlsx'
                      </Typography>
                      <br />

                      <Typography sx={{ fontSize: 17 }} color="InfoText">
                        2. In the downloaded excel file, you will find three
                        sheets
                        <br />
                        <List>
                          <ListItem>
                            <ChevronRightIcon />
                            data - Template file that contains all the columns
                            you need to fill. Each column represents a property
                            of the product. Eg - title, description, price,
                            quantity etc.
                          </ListItem>
                          <ListItem>
                            <ChevronRightIcon />
                            Instructions - You can refer to this sheet in order
                            to understand the meaning of each column that needs
                            to filled.
                          </ListItem>
                          <ListItem>
                            <ChevronRightIcon />
                            Example - You can refer to this sheet in order to
                            get an idea how to fill the sheet 'data'.
                          </ListItem>
                        </List>
                      </Typography>
                      <Typography sx={{ fontSize: 20 }} color="InfoText">
                        3. Fom section 'UPLOAD PRODUCTS EXCEL FILE' click on
                        'ADD ATTACHEMENTS' and select the updated excel file.
                      </Typography>
                      <Typography sx={{ fontSize: 20 }} color="InfoText">
                        4. Finally your products will be updated in our system.
                      </Typography>
                      <br />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
