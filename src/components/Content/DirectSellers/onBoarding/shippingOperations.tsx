import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  Modal,
  Box,
  Grid,
} from "@mui/material";
import { Checkbox, FormControl, FormGroup } from "@mui/material";
import EditableTable from "./editableTable";

export default function ShippingOperations(props: any) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { seller, setSeller, setActiveStep } = props;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(seller);
    setActiveStep(4);
    navigate("/seller/onboarding/confirmation");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller({
      ...seller,
      currentShippingMethods: {
        ...seller.currentShippingMethods,
        [event.target.name]: event.target.checked,
      },
    });
  };

  return (
    <div className="request-to-sell-wrap">
      <section className="request-form-section non-active">
        <div className="container">
          <div className="request-form-card">
            <div className="request-arrow-icon"></div>
            <form>
              <label htmlFor="">
                Specify your information for other Retail Marketplaces
              </label>
              <div className="row">
                <EditableTable seller={seller} setSeller={setSeller} />
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="request-form-section non-active">
        <div className="container">
          <div className="request-form-card">
            <div className="request-arrow-icon"></div>
            <form>
              <label className="required-field" htmlFor="">
                How are you planning to integrate with Paysfer?
              </label>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="d-flex align-items-center">
                      <RadioGroup
                        row
                        aria-label="paysferIntegrationMode"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Bulk Upload"
                          control={
                            <Radio
                              checked={
                                seller.paysferIntegrationMode ===
                                "Bulk Upload"
                              }
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  paysferIntegrationMode: e.target.value,
                                });
                              }}
                            />
                          }
                          label="Bulk Upload - for a few thousand products- via Excel sheet"
                        />
                        <FormControlLabel
                          value="API Integration"
                          control={
                            <Radio
                              checked={
                                seller.paysferIntegrationMode ===
                                "API Integration"
                              }
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  paysferIntegrationMode: e.target.value,
                                });
                              }}
                            />
                          }
                          label="API Integration - for large sellers"
                        />
                        <FormControlLabel
                          value="Simple Integration"
                          control={
                            <Radio
                              checked={
                                seller.paysferIntegrationMode ===
                                "Simple Integration"
                              }
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  paysferIntegrationMode: e.target.value,
                                });
                              }}
                            />
                          }
                          label="Simple Integration - few products"
                        />
                        <FormControlLabel
                          value="Solution Providers"
                          control={
                            <Radio
                              checked={
                                seller.paysferIntegrationMode ===
                                "Solution Providers"
                              }
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  paysferIntegrationMode: e.target.value,
                                });
                              }}
                            />
                          }
                          label="Solution Providers (Channeladvisor, Big commerce etc)"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="request-form-section non-active">
        <div className="container">
          <div className="request-form-card">
            <div className="col-md-12">
              <div className="w-100 btn-listing current-shipping">
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <label htmlFor="">
                    Current shipping methods, select all that apply
                  </label>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={seller.currentShippingMethods["UPS"]}
                          onChange={handleChange}
                          name="UPS"
                        />
                      }
                      label="UPS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={seller.currentShippingMethods["FedEx"]}
                          onChange={handleChange}
                          name="FedEx"
                        />
                      }
                      label="FedEx"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={seller.currentShippingMethods["USPS"]}
                          onChange={handleChange}
                          name="USPS"
                        />
                      }
                      label="USPS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={seller.currentShippingMethods["DHL"]}
                          onChange={handleChange}
                          name="DHL"
                        />
                      }
                      label="DHL"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={seller.currentShippingMethods["FBA"]}
                          onChange={handleChange}
                          name="FBA"
                        />
                      }
                      label="FBA"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={seller.currentShippingMethods["Others"]}
                          onChange={handleChange}
                          name="Others"
                        />
                      }
                      label="Others"
                    />
                  </FormGroup>
                </FormControl>
              </div>
            </div>
            {/* <div className="col-md-4">
              <label htmlFor="">*WareHouse Address</label>
              <div className="warehouse-address-card">
                <button onClick={() => setOpen(true)} className="btn blue-btn">+ Add Location</button>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <Box sx={style}>
                    <Grid direction={'row'} spacing={4} justifyContent="center" alignContent={"center"}>
                      <Grid item>
                        <TextField
                          placeholder='Street'
                          name='street'
                          onChange={(e) => setSeller({ ...seller, wareHouseAddress: { ...seller.wareHouseAddress, street: e.target.value } })}
                        />
                      </Grid>

                      <Grid item>
                        <TextField
                          placeholder='City'
                          name='city'
                          onChange={(e) => setSeller({ ...seller, wareHouseAddress: { ...seller.wareHouseAddress, city: e.target.value } })}
                        />
                      </Grid>

                      <Grid item>
                        <TextField
                          placeholder='State'
                          name='state'
                          onChange={(e) => setSeller({ ...seller, wareHouseAddress: { ...seller.wareHouseAddress, state: e.target.value } })}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          placeholder='Country'
                          name='country'
                          onChange={(e) => setSeller({ ...seller, wareHouseAddress: { ...seller.wareHouseAddress, country: e.target.value } })}
                        />
                      </Grid>

                      <Grid item>
                        <TextField
                          placeholder='Postal Code'
                          name='postalCode'
                          onChange={(e) => setSeller({ ...seller, wareHouseAddress: { ...seller.wareHouseAddress, postalCode: e.target.value } })}
                        />
                      </Grid>

                      <Grid item><button className="btn btn-primary" onClick={() => setOpen(false)}>Save</button></Grid>
                    </Grid>
                  </Box>
                </Modal>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <section className="request-form-section non-active">
        <div className="container">
          <div className="request-form-card">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="briefOnFitForMarketPlace">
                  Why would you be a good fit for Paysfer Marketplace?
                </label>
                <TextField
                  value={seller.briefOnFitForMarketPlace}
                  rows={5}
                  multiline
                  className={"mui-text-field"}
                  color="primary"
                  name="briefOnFitForMarketPlace"
                  variant="outlined"
                  fullWidth
                  id="briefOnFitForMarketPlace"
                  autoFocus
                  onChange={(e) =>
                    setSeller({
                      ...seller,
                      briefOnFitForMarketPlace: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="request-btn-wrap">
              <div className="btn-container">
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/seller/onboarding/product-and-integration");
                    setActiveStep(2);
                  }}
                  className="btn btn-primary"
                >
                  Back
                </button>
                <button onClick={onSubmit} className="btn btn-primary">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
