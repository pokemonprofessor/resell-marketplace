import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { stripeOnboardingStart } from "redux/reducers/bankOnboarding";
import Error from "components/common/Error";
import { RootState } from "redux/store";
import { CircularProgress } from "@mui/material";

const AddBankingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state }: any = useLocation();

  const stripeOnBoard = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let _sellerData = {
      ...state,
    };

    dispatch(stripeOnboardingStart({ _sellerData, navigate }));
  };

  const isLoading = useSelector(
    (state: RootState) => state.onboarding.isLoading
  );

  return (
    <>
      {state === null ? (
        <Error
          msg={"You are not allowed to access this URL"}
          statusCode={404}
        />
      ) : (
        <Grid
          direction="column"
          container
          alignItems="center"
          justifyContent={"center"}
        >
          <Grid item>
            <div className="container">
              <div className="auth-form-wrap-home">
                <Card sx={{ minWidth: 1000 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 30 }} color="#0f5b9e">
                      In order to start your journey as a seller at Resell
                      Marketplace, please complete this step.
                    </Typography>
                    <br />
                    <br />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      onClick={stripeOnBoard}
                      disabled={isLoading ? true : false}
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <>ONBOARD ON STRIPE</>
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AddBankingDetails;
