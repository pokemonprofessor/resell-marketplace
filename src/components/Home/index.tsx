import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './style.css';
import { List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  return (
    <Grid direction='column' container alignItems='center' justifyContent={"center"}>
      <Grid item>
        <div className="container">
          <div className="auth-form-wrap-home">
            <Card sx={{ minWidth: 1000 }}>

              <CardContent>
                <Typography sx={{ fontSize: 30 }} color="#0f5b9e">
                  Are you ready to join
                  the Resell Marketplace
                  seller community?
                </Typography>
                <br /><br />
                <Typography sx={{ fontSize: 20 }} color="InfoText">
                  Remember these helpful tips before you start to fill out your application:
                </Typography><br />

                <Typography sx={{ fontSize: 17 }} color="InfoText">
                  1. Your progress will not be saved if you close this browser tab.<br />
                  <List>2. Please have this required information available when completing the application:

                    <ListItem><ChevronRightIcon/>US Business Tax ID (SSN not accepted)</ListItem>
                    <ListItem><ChevronRightIcon/>W9 or W8 and EIN Verification Letter from the Department of Treasury that verifies your US business address or place of physical operations</ListItem>
                    <ListItem><ChevronRightIcon/>Address or place of physical operations</ListItem>
                    <ListItem><ChevronRightIcon/>Your Business address</ListItem>
                    <ListItem><ChevronRightIcon/>Planned integration method for your product catalog (bulk upload, API, solution provider)</ListItem>
                    <ListItem><ChevronRightIcon/>Primary product categories, catalog size and related information (e.g. total SKUs you will be selling on paysfer.com initially with verified UPC information, and used vs. refurbished etc.)</ListItem>
                  </List>
                </Typography>
              </CardContent>
              <CardActions>
                <Button id="requestToSell" onClick={() => navigate('/seller/onboarding/application-start')} size="large">Request To Sell</Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default Home;
