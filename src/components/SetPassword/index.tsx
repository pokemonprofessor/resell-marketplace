import React, { SyntheticEvent, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link
} from '@mui/material';

import './style.css';
import { useDispatch } from "react-redux";
import { setSellerPasswordStart } from "redux/reducers/seller";
import jwtPayload from "utils/jwtPayload";
import { useNavigate, useParams } from "react-router-dom";
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import TokenExpired from './tokenExpired'

const SetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  let sellerData = jwtPayload(params.token)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false)
  const [error, setErr] = useState({
    email: {
      err: false,
      msg: ''
    },
    password: {
      err: false,
      msg: ''
    },
    confirmPassword: {
      err: false,
      msg: ""
    }
  });
  const [seller, setSeller] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    jwt.verify(params.token!, 'THIS IS TOP SECRET', function(err, decoded) {
      if (err) {
        if(err.name === 'TokenExpiredError')
        setIsTokenExpired(true)
      } else {
        setSeller({ ...seller, email: sellerData.email })
      }
    });
  },[params.token])

  

  const setSellerPassword = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isTokenExpired) {
      alert('Link Expired');
      return;
    }

    if (!seller.password) {
      alert('Please enter both email and password');
    } else {
      sellerData = { ...sellerData, password: seller.password, token: params.token };
      dispatch(setSellerPasswordStart({ sellerData, navigate })
      );
    }
  };

  return (
    isTokenExpired ? <TokenExpired email = {sellerData.email}/> :
    <Grid direction='column' container alignItems='center'>
      <Grid item>
        <Typography className={'heading'} component="h1" variant="h5">
          Set Your Password
        </Typography>
      </Grid>
      <Grid item>
        <section className="auth-section">
          <div className="container">
            <div className="auth-form-wrap">
              <form onSubmit={setSellerPassword}>
                <div className="form-group">
                  <label>Email</label>
                  <TextField
                    error={error.email.err}
                    className={'mui-text-field'}
                    // placeholder="Enter your email"
                    color='primary'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoComplete='off'
                    id="email"
                    name="email"
                    helperText={error.email.msg}
                    value = {sellerData?.email ? sellerData.email : 'Error Getting Email'}
                    inputProps={
                      { readOnly: true }
                    }
                    sx={{ input: { backgroundColor: '#E8E8E8', color: '#404040' } }}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <OutlinedInput
                    className={'mui-text-field'}
                    placeholder="Enter your password"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    color='primary'
                    fullWidth
                    name="password"
                    onChange={(e) => {
                      setErr({ ...error, password: { err: false, msg: "" } })
                      setSeller({ ...seller, password: e.target.value })
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => { e.preventDefault() }}
                          edge="end"
                        >
                          {showPassword ? <span className="password-visibility">Hide</span> : <span className="password-visibility">Show</span>}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />

                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <OutlinedInput
                    className={'mui-text-field'}
                    placeholder="Confirm password"
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    color='primary'
                    fullWidth
                    name="confirmPassword"
                    onChange={(e) => {
                      setErr({ ...error, confirmPassword: { err: false, msg: "" } })
                      setSeller({ ...seller, confirmPassword: e.target.value })
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          onMouseDown={(e) => { e.preventDefault() }}
                          edge="end"
                        >
                          {showConfirmPassword ? <span className="password-visibility">Hide</span> : <span className="password-visibility">Show</span>}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </div>
                <div className="auth-btn-wrap align-items-center justify-content-between">
                  <button type="submit" className="btn btn-primary">SUBMIT</button>
                </div>
              </form>
            </div>
            <p>By continuing, you agree to <Link>Resell's Conditions</Link > of Use and Privacy Notice</p>
          </div>
        </section>

      </Grid>
    </Grid >
  );
}

export default SetPassword;
