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
import { useEffect } from 'react';
import { resendEmail } from "redux/reducers/seller";
import { useNavigate, useParams } from "react-router-dom";

const TokenExpired = ({ email }:any) => {
  const dispatch = useDispatch();
  const params = useParams();
  const token = params.token
  const resendSellerEmail = () => {
    dispatch(resendEmail({ token }))
  }

  return (
    <Grid direction='column' container alignItems='center'>
      <Grid item>
        <Typography className={'heading'} component="h1" variant="h5">
          Link Expired
        </Typography>
      </Grid>
      <Grid item>
        <section className="auth-section">
          <div className="container">
            <div className="auth-form-wrap">

                <button type="submit" onClick={resendSellerEmail} className="btn btn-primary">Resend Email</button>
            </div>
          </div>
        </section>
      </Grid>
    </Grid >
  );
}

export default TokenExpired;
