import {
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  Chip,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import snack from "components/wrapper/snack";
import React, { SyntheticEvent, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadDocumentsStart } from "redux/reducers/seller";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import {
  containsAlphabeticalLetters,
  isEmail,
  isPhoneNumber,
  isCompanyName,
} from "utils/validations";

import "./style.css";

export default function CompanyRegistration(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller, setSeller, setActiveStep } = props;
  const [error, setError] = useState({
    firstName: {
      err: false,
      msg: "",
    },
    lastName: {
      err: false,
      msg: "",
    },
    email: {
      err: false,
      msg: "",
    },
    confirmEmail: {
      err: false,
      msg: "",
    },
    currentShippingMethods: {
      err: false,
      msg: "",
    },
    country: {
      err: false,
      msg: "",
    },
  });

  const isEmptyFields = () => {
    let isfieldsInvalid = false;
    let validationError = false;
    let errors: any = {};

    const arr: string[] = [
      "firstName",
      "lastName",
      "email",
      "confirmEmail",
      "country",
    ];

    for (let i = 0; i < arr.length; i++) {
      if (!seller[arr[i]]) {
        errors = {
          ...errors,
          [arr[i]]: {
            err: true,
            msg: "Required",
          },
        };
      }
    }

    for (let i = 0; i < arr.length; i++) {
      let fieldsInvalid = !!errors?.[arr[i]]?.err;
      if (fieldsInvalid) {
        isfieldsInvalid = fieldsInvalid;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      let validateError = !!error?.[arr[i] as keyof typeof error]?.err;
      if (validateError) {
        validationError = validateError;
      }
    }

    setError((prevState) => ({
      ...prevState,
      ...errors,
    }));

    return { isfieldsInvalid, validationError };
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const fieldsError = isEmptyFields();

    if (fieldsError.isfieldsInvalid || fieldsError.validationError) return;

    if (seller.email !== seller.confirmEmail) {
      alert("email and confirm email should be same");
      return;
    }
    console.log(seller);
    setActiveStep(2);
    navigate("/seller/onboarding/product-and-integration");
  };

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name,
      _name: string = "",
      err: boolean = false,
      msg: string = "";

    name === "firstName" ? (_name = "first") : (_name = "last");

    if (
      !containsAlphabeticalLetters(e.target.value) ||
      e.target.value.trim() === ""
    ) {
      err = true;
      msg = `Please enter a valid ${_name} name`;
    } else {
      err = false;
    }

    setSeller({ ...seller, [name]: e.target.value });

    setError((prevState) => ({
      ...prevState,
      [name]: {
        err,
        msg,
      },
    }));
  };

  const validateLegalCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name,
      err: boolean = false,
      msg: string = "";

    if (!isCompanyName(e.target.value) || e.target.value.trim() === "") {
      err = true;
      msg = `Please enter a valid Comapny Name`;
    } else {
      err = false;
      msg = "";
    }
    setSeller({ ...seller, [name]: e.target.value });

    setError((prevState) => ({
      ...prevState,
      [name]: {
        err,
        msg,
      },
    }));
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let msg: string = "",
      err: boolean = false;

    let email = e.target.value;

    if (!isEmail(email)) {
      err = true;
      msg = "Please enter a valid email address";
    } else {
      err = false;
    }
    setSeller({ ...seller, [e.target.name]: e.target.value });

    setError((prevState) => ({
      ...prevState,
      ...(e.target.name === "email"
        ? { email: { err, msg } }
        : { confirmEmail: { err, msg } }),
    }));
  };

  const validatePhoneNumber = (value: string, data: any) => {
    let msg: string = "",
      err: boolean = false;

    let phoneNumber = value.slice(data.dialCode.length);

    if (!phoneNumber) {
      err = false;
      msg = "";
    } else if (!isPhoneNumber(phoneNumber)) {
      err = true;
      msg = "Please enter a valid phone number";
    } else {
      err = false;
    }

    setSeller({
      ...seller,
      countryCode: "+" + data.dialCode,
      phoneNumber: phoneNumber,
    });
  };

  const onUploadAttachements = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!seller.firstName || !seller.lastName || !seller.email) {
      snack.error(
        "Please fill the mandatory fields before uploading documents"
      );
    }

    if (!seller.documents.length) {
      alert("Please select documents to upload");
    } else {
      dispatch(
        uploadDocumentsStart({
          documents: seller.documents,
          firstName: seller.firstName,
          lastName: seller.lastName,
          email: seller.email,
        })
      );
    }
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const validateCountry = (val: string) => {
    let err = false,
      msg = "";

    if (!val) {
      err = true;
      msg = "Required";
    } else {
      err = false;
    }

    setSeller({ ...seller, country: val });

    setError((prevState) => ({
      ...prevState,
      country: {
        err,
        msg,
      },
    }));
  };

  return (
    <div className="request-to-sell-wrap">
      {/* <section className="request-two-about-section">
        <div className="container">
          <div className="request-two-about-card">
            <div className="request-arrow-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h4>Lorem Ipsum is simply dummy text of the printing and typesetting</h4>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
      </section> */}
      <section className="request-form-section">
        <div className="container">
          <div className="request-form-card">
            <div className="request-arrow-icon">
              <i className="fas fa-check-circle" />
            </div>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="f_name" className="required-field">
                      First Name
                    </label>
                    <TextField
                      value={seller.firstName}
                      error={error.firstName.err}
                      className={"mui-text-field"}
                      color="primary"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      id="firstName"
                      autoFocus
                      helperText={error.firstName.msg}
                      onChange={validateName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="required-field">
                      Resell Email (Provide same emailId as Resell)
                    </label>
                    <TextField
                      error={error.email.err}
                      className={"mui-text-field"}
                      color="primary"
                      name="email"
                      variant="outlined"
                      fullWidth
                      id="email"
                      autoFocus
                      helperText={error.email.msg}
                      onChange={validateEmail}
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      id="city"
                      name="city"
                      value={seller.city}
                      onChange={(e) =>
                        setSeller({ ...seller, city: e.target.value })
                      }
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="job">Job Title</label>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      id="jobTitle"
                      name="Job Title"
                      value={seller.jobTitle}
                      onChange={(e) =>
                        setSeller({ ...seller, jobTitle: e.target.value })
                      }
                    />{" "}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="l_name" className="required-field">
                      Last Name
                    </label>
                    <TextField
                      value={seller.lastName}
                      error={error.lastName.err}
                      className={"mui-text-field"}
                      color="primary"
                      name="lastName"
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      autoFocus
                      helperText={error.lastName.msg}
                      onChange={validateName}
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_email" className="required-field">
                      Confirm Email
                    </label>
                    <TextField
                      error={error.confirmEmail.err}
                      className={"mui-text-field"}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      id="email"
                      name="confirmEmail"
                      helperText={error.confirmEmail.msg}
                      onChange={validateEmail}
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="country" className="required-field">
                      Country
                    </label>
                    <CountryDropdown
                      id="country-select"
                      classes={`${
                        error.country.err
                          ? "countryErr country-dropdown css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                          : "country-dropdown css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                      }`}
                      value={seller.country}
                      labelType="short"
                      valueType="short"
                      onChange={validateCountry}
                    />
                    {error.country.err ? (
                      <div>
                        <span className={"custom-error"}>
                          {error.country.msg}
                        </span>
                      </div>
                    ) : null}
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
            <div className="request-arrow-icon"></div>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="f_name">
                      What is the preferred tax classification for your company?
                    </label>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <b>{"W-9:"}</b>{" "}
                          {
                            "Used by U.S persons (U.S.citizens or residents and business entities organized in the United States) to provide their name name, address, federal tax classification, and U.S. taxpayer identification number."
                          }
                          <br />
                          <b>{"W-8 ECI:"}</b>{" "}
                          {
                            "Used by non-U.S. persons (foreign corporations), foreign partnerships, etc.) to claim that income is effectively connected with the conduct of a trade or business within the United States."
                          }
                        </React.Fragment>
                      }
                    >
                      <InfoIcon fontSize="small" />
                    </HtmlTooltip>

                    <div className="d-flex classification-input">
                      <div className="d-flex align-items-center">
                        <RadioGroup
                          row
                          aria-label="preferredTaxClassification"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="W-9"
                            control={
                              <Radio
                                checked={
                                  seller.preferredTaxClassification === "W-9"
                                }
                                onChange={(e) => {
                                  setSeller({
                                    ...seller,
                                    preferredTaxClassification: e.target.value,
                                  });
                                }}
                              />
                            }
                            label="W-9"
                          />
                          <FormControlLabel
                            value="W-8 ECI"
                            control={
                              <Radio
                                checked={
                                  seller.preferredTaxClassification ===
                                  "W-8 ECI"
                                }
                                onChange={(e) => {
                                  setSeller({
                                    ...seller,
                                    preferredTaxClassification: e.target.value,
                                  });
                                }}
                              />
                            }
                            label="W-8 ECI"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Country of Incorporation</label>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          {
                            "Please state the country this business was initially started."
                          }
                        </React.Fragment>
                      }
                    >
                      <InfoIcon fontSize="small" />
                    </HtmlTooltip>
                    <CountryDropdown
                      classes="country-dropdown css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                      value={seller.countryOfIncorporation}
                      onChange={(val: string) =>
                        setSeller({ ...seller, countryOfIncorporation: val })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Legal Company Name</label>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          {
                            "Name of the person or entity who owns the business. For sole proprietorship, this is usually the owner's full name. For limited partnerships, LLCs, and incorporations, this is the name used when the business is first registered."
                          }
                        </React.Fragment>
                      }
                    >
                      <InfoIcon fontSize="small" />
                    </HtmlTooltip>

                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      name="legalCompanyName"
                      variant="outlined"
                      fullWidth
                      id="legalCompanyName"
                      value={seller.legalCompanyName}
                      onChange={(e) =>
                        setSeller({
                          ...seller,
                          legalCompanyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job">Doing Business As (DBA)</label>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          {
                            "If the company operates under a unique name different from the Legal Company Name. If you do not use a DBA please enter your Legal Company Name."
                          }
                        </React.Fragment>
                      }
                    >
                      <InfoIcon fontSize="small" />
                    </HtmlTooltip>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      name="doingBusinessAs"
                      variant="outlined"
                      fullWidth
                      id="doingBusinessAs"
                      value={seller.doingBusinessAs}
                      onChange={(e) =>
                        setSeller({
                          ...seller,
                          doingBusinessAs: e.target.value,
                        })
                      }
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="job">DUNS Number</label>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          {
                            "If the company operates under a unique name different from the Legal Company Name. If you do not use a DBA please enter your Legal Company Name."
                          }
                        </React.Fragment>
                      }
                    >
                      <InfoIcon fontSize="small" />
                    </HtmlTooltip>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      name="dunsNumber"
                      variant="outlined"
                      fullWidth
                      id="dunsNumber"
                      value={seller.dunsNumber}
                      onChange={(e) =>
                        setSeller({ ...seller, dunsNumber: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="l_name">
                      Select your state of incorporation
                    </label>
                    <RegionDropdown
                      classes="country-dropdown css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                      country={seller.countryOfIncorporation}
                      value={seller.stateOfIncorporation}
                      onChange={(val: string) =>
                        setSeller({ ...seller, stateOfIncorporation: val })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_email">
                      Are you a Public Company listed on a Stock Exchange?
                    </label>
                    <div className="d-flex align-items-center">
                      <RadioGroup
                        row
                        aria-label="listedOnStockExchange"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Yes"
                          control={
                            <Radio
                              checked={seller.listedOnStockExchange === "Yes"}
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  listedOnStockExchange: e.target.value,
                                });
                              }}
                            />
                          }
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={
                            <Radio
                              checked={seller.listedOnStockExchange === "No"}
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  listedOnStockExchange: e.target.value,
                                });
                              }}
                            />
                          }
                          label="No"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">US Tax ID (TIN)</label>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      name="tinNumber"
                      variant="outlined"
                      fullWidth
                      id="tinNumber"
                      value={seller.tinNumber}
                      onChange={(e) =>
                        setSeller({ ...seller, tinNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Year of foundation</label>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          {"The year this business was started."}
                        </React.Fragment>
                      }
                    >
                      <InfoIcon fontSize="small" />
                    </HtmlTooltip>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      name="yearOfFoundation"
                      variant="outlined"
                      fullWidth
                      id="yearOfFoundation"
                      value={seller.yearOfFoundation}
                      onChange={(e) =>
                        setSeller({
                          ...seller,
                          yearOfFoundation: e.target.value,
                        })
                      }
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label>
                      {" "}
                      <p>
                        Please upload these official U.S. documents for
                        application processing: <br />
                        -U.S. W9 form
                        <br />
                        -U.S. EIN (Federal Tax ID)
                      </p>
                    </label>
                    <div className="upload-btn-wrapper">
                      <div className="d-flex upload-btn-wrapper-content-wrap">
                        <div className="upload-btn-wrapper-content d-flex align-items-center">
                          <button className="btn">
                            <i className="fas fa-paperclip"></i> Add
                            Attachements{" "}
                          </button>
                          {seller.documents &&
                          seller.documents.length > 0 ? null : (
                            <p>Or drop files</p>
                          )}
                          <input
                            accept="application/pdf"
                            type="file"
                            multiple
                            name="myfile"
                            onChange={(e) => {
                              e.preventDefault();
                              setSeller({
                                ...seller,
                                documents: e.target.files,
                              });
                            }}
                          />
                          {seller.documents && seller.documents.length > 0
                            ? Object.keys(seller.documents).map(
                                (item: any, index: number) => (
                                  <Chip
                                    key={index}
                                    // onDelete={deleteAttachements}
                                    label={seller.documents[item].name}
                                  />
                                )
                              )
                            : null}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={onUploadAttachements}
                      className="btn btn-primary"
                    >
                      Upload
                    </button>
                  </div>

                  <p>
                    Earlier Uploaded Files:
                    <br /> Please choose the files then upload the documents
                    here (maximum file size per document is 5MB). <br />
                    Please upload the documents of proof mentioned above.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="request-form-section non-active">
        <div className="container">
          <div className="request-form-card">
            <div className="request-arrow-icon"></div>
            <form onSubmit={onSubmit}>
              <h5>Legal Entity Address</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">Country</label>
                    <CountryDropdown
                      classes="country-dropdown css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                      value={seller.legalCountry}
                      onChange={(val: string) =>
                        setSeller({ ...seller, legalCountry: val })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      name="legalcity"
                      variant="outlined"
                      fullWidth
                      id="city"
                      value={seller.legalCity}
                      onChange={(e) =>
                        setSeller({ ...seller, legalCity: e.target.value })
                      }
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="job">Address (Line 1)</label>
                    <TextField
                      value={seller.addressLine1}
                      className={"mui-text-field"}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      name="address1"
                      id="address1"
                      onChange={(e) =>
                        setSeller({ ...seller, addressLine1: e.target.value })
                      }
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <PhoneInput
                      specialLabel=""
                      inputStyle={{
                        width: "100%",
                        height: "3.8em",
                        border: "1px solid #CACACA !important",
                      }}
                      country={"us"}
                      onChange={validatePhoneNumber}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_email">
                      Does your business have offices or warehouses outside of
                      the US ?
                    </label>
                    <div className="d-flex align-items-center">
                      <RadioGroup
                        row
                        aria-label="wareHouseOutsideUS"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Yes"
                          control={
                            <Radio
                              checked={seller.wareHouseOutsideUS === "Yes"}
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  wareHouseOutsideUS: e.target.value,
                                });
                              }}
                            />
                          }
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={
                            <Radio
                              checked={seller.wareHouseOutsideUS === "No"}
                              onChange={(e) => {
                                setSeller({
                                  ...seller,
                                  wareHouseOutsideUS: e.target.value,
                                });
                              }}
                            />
                          }
                          label="No"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="l_name">State</label>
                    <RegionDropdown
                      classes="country-dropdown css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                      country={seller.legalCountry}
                      value={seller.legalState}
                      onChange={(val: string) =>
                        setSeller({ ...seller, legalState: val })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_email">Postal Code</label>
                    <TextField
                      className={"mui-text-field"}
                      color="primary"
                      variant="outlined"
                      type="number"
                      fullWidth
                      id="postCode"
                      name="postCode"
                      value={seller.postCode}
                      onChange={(e) =>
                        setSeller({ ...seller, postCode: e.target.value })
                      }
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="job">Address (Line 2)</label>
                    <TextField
                      value={seller.addressLine2}
                      className={"mui-text-field"}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      name="address2"
                      id="address2"
                      onChange={(e) =>
                        setSeller({ ...seller, addressLine2: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Company Website</label>
                    <TextField
                      value={seller.companyWebsiteUrl}
                      className={"mui-text-field"}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      name="companyWebsiteUrl"
                      id="companyWebsiteUrl"
                      onChange={(e) =>
                        setSeller({
                          ...seller,
                          companyWebsiteUrl: e.target.value,
                        })
                      }
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="request-btn-wrap">
                <div className="btn-container">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/seller/onboarding/application-start");
                      setActiveStep(0);
                    }}
                    className="btn btn-primary"
                  >
                    Back
                  </button>
                  <button className="btn btn-primary" id="step_three">
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
