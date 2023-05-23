import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApplicationStart from './applicationStart';
import CompanyRegistration from './companyRegistration';
import ProductIntegration from './productIntegration';
import ShippingOperations from './shippingOperations';
import Confirmations from './confirmations';

import './style.css';

const steps = ['Application Start', 'Company Registration', 'Product & Integration', 'Shipping & Operations', 'Confirmation'];

export default function OnBoarding() {
  const location: any = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped] = useState(new Set<number>());
  const [seller, setSeller] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    city: '',
    country: '',
    jobTitle: '',
    documents: [],
    preferredTaxClassification: '',
    countryOfIncorporation: '',
    stateOfIncorporation: '',
    legalCompanyName: '',
    listedOnStockExchange: '',
    doingBusinessAs: '',
    tinNumber: '',
    dunsNumber: '',
    yearOfFoundation: '',
    legalCountry: '',
    legalState: '',
    legalCity: '',
    postCode: '',
    addressLine1: '',
    addressLine2: '',
    phoneNumber: '',
    countryCode: '',
    companyWebsiteUrl: '',
    wareHouseOutsideUS: '',
    categories: {
      "Software": false,
      "Fragrances": false,
      "Luxury Brands": false,
      "Cellphones and Accessories": false,
      "Jewellery and Watches": false
    },
    avgOnlineRevenue: '',
    highestPerformingCategory: '',
    catalogSize: '',
    percentageSKUrefurbished: "",
    percentageSKUWithInvalidUPCCodes: "",
    percentageSKUUsed: "",
    marketPlace: [],
    paysferIntegrationMode: '',
    currentShippingMethods: {
      "UPS": false,
      "FedEx": false,
      "USPS": false,
      "DHL": false,
      "FBA": false,
      "Others": false
    },
    wareHouseAddress: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    },
    briefOnFitForMarketPlace: ''
  });
  const nextStep: string = location.pathname.split('/')[3];

  useEffect(() => {
    window.scrollTo(0, 0);
    const setNextActiveStep = () => {

      switch (location.pathname.split('/')[3]) {
        case 'application-start': setActiveStep(0);
          break;
        case 'company-registration': setActiveStep(1);
          break;
        case 'product-and-integration': setActiveStep(2);
          break;
        case 'shipping-and-operations': setActiveStep(3);
          break;
        case 'confirmation': setActiveStep(4);
          break;
        default:
          break;
      }

    }
    setNextActiveStep();
  }, [nextStep, navigate, location.pathname]);



  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const getForm = () => {
    switch (activeStep) {
      case 0: return <ApplicationStart seller={seller} setSeller={setSeller} setActiveStep={setActiveStep} />;
      case 1: return <CompanyRegistration seller={seller} setSeller={setSeller} setActiveStep={setActiveStep} />;
      case 2: return <ProductIntegration seller={seller} setSeller={setSeller} setActiveStep={setActiveStep} />;
      case 3: return <ShippingOperations seller={seller} setSeller={setSeller} setActiveStep={setActiveStep} />;
      case 4: return <Confirmations seller={seller} setSeller={setSeller} setActiveStep={setActiveStep} />;
      default: console.error('invalid case');
        break;
    }
  }

  return (
    <section className="product-detils-section custom-spacer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          </div>
          <div className="col-md-12 col-lg-12">
            {getForm()}
          </div>
        </div>
      </div>
    </section>
  )
}
