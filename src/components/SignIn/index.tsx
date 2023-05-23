import React, { SyntheticEvent, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { isEmail } from "utils/validations";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sellerSigninStart } from "redux/reducers/seller";

import "./style.css";
import { loginStart } from "redux/reducers/user";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErr] = useState({
    email: {
      err: false,
      msg: "",
    },
    password: {
      err: false,
      msg: "",
    },
  });
  const [seller, setSeller] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let msg: string = "",
      err: boolean = false;

    let email = e.target.value;

    if (!isEmail(email)) {
      err = true;
      msg = "Please enter a valid email address";
    } else {
      err = false;
      setSeller({ ...seller, email });
    }

    setErr((prevState) => ({
      ...prevState,
      email: {
        err,
        msg,
      },
    }));
  };

  const loginseller = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!seller.email || !seller.password) {
      alert("Please enter both email and password");
    } else {
      // dispatch(sellerSigninStart({ sellerData: seller, navigate}));

      console.log('seller',seller)
      let userDataCredential = {emailOrPhone:seller.email,password:seller.password}
      dispatch(loginStart( {userDataCredential, navigate}));  
    } 
  };

  return (
    <Grid direction="column" container alignItems="center">
      <Grid item>
        <Typography className={"heading"} component="h1" variant="h5">
          Seller Sign-In
        </Typography>
      </Grid>
      <Grid item>
        <section className="auth-section">
          <div className="container">
            <div className="auth-form-wrap">
              <form onSubmit={loginseller}>
                <div className="form-group">
                  <label>Email</label>
                  <TextField
                    error={error.email.err}
                    className={"mui-text-field"}
                    placeholder="Enter your email"
                    color="primary"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoComplete="off"
                    id="email"
                    name="email"
                    helperText={error.email.msg}
                    onChange={validateEmail}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <OutlinedInput
                    className={"mui-text-field"}
                    placeholder="Enter your password"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    color="primary"
                    fullWidth
                    name="password"
                    onChange={(e) => {
                      setErr({ ...error, password: { err: false, msg: "" } });
                      setSeller({ ...seller, password: e.target.value });
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          edge="end"
                        >
                          {showPassword ? (
                            <span className="password-visibility">Hide</span>
                          ) : (
                            <span className="password-visibility">Show</span>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </div>
                <div id="recaptcha-container" />
                <div className="auth-btn-wrap align-items-center justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  {/* <div className="forget-wrap">
                    <Link className="btn btn-primary forgot-pwd">
                      Forgot Password
                    </Link>
                  </div> */}
                </div>
              </form>
            </div>
            <p>
              By continuing, you agree to <Link>Resell's Conditions</Link> of
              Use and Privacy Notice
            </p>
          </div>
        </section>
      </Grid>
    </Grid>
  );
};

export default SignIn;
