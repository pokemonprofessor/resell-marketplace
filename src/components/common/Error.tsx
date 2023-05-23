import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import './style.css';

const Error = (props: any) => {
  const [msg, setMsg] = useState(props.msg ? props.msg : 'Page not Found');
  const [statusCode, setStatusCode] = useState(props.statusCode ? props.statusCode : 404);
  
  return (
    <Grid direction='column' container alignItems='center' justifyContent={"center"}>
      <Grid item>
        <div className="container">
          <div className="auth-form-wrap-home">
            <Card sx={{ minWidth: 1000 }}>
              <CardContent>
                <Typography alignItems={'center'} alignContent='center' sx={{ fontSize: 30 }} color="#0f5b9e">
                  {statusCode}
                </Typography>
                <Typography sx={{ fontSize: 30 }} color="#0f5b9e">
                  {msg}
                </Typography>               
              </CardContent>
            </Card>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Error;
