import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Modal,
  Typography,
  ListItem,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useNavigate } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { sellerStart } from 'redux/reducers/seller';
import { useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Paper from '@mui/material/Paper';

export default function Confirmations(props: any) {
  const dispatch = useDispatch();
  const { seller, setActiveStep } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState<any>({});

  useEffect(() => {
    let sellerData = {
      firstName: seller.firstName,
      lastName: seller.lastName,
      email: seller.email,
      city: seller.city,
      country: seller.country,
      websiteUrl: seller.companyWebsiteUrl,
      jobTitle: seller.jobTitle,
      companyRegistration: {
        preferredTaxClassifiacation: seller.preferredTaxClassification,
        stateOfIncorporation: seller.stateOfIncorporation,
        countryOfIncorporation: seller.countryOfIncorporation,
        stockExchange: seller.listedOnStockExchange === 'Yes' ? true : false,
        legalCompanyName: seller.legalCompanyName,
        usTaxID: seller.tinNumber,
        DBA: seller.doingBusinessAs,
        yearOfFoundation: seller.yearOfFoundation,
        DUNS: seller.dunsNumber,
        usAdress: {
          country: seller.legalCountry,
          state: seller.legalState,
          city: seller.legalCity,
          code: seller.postCode,
          address1: seller.addressLine1,
          address2: seller.addressLine2,
          phone: `${seller.countryCode}${seller.phoneNumber}`,
          companyWebsite: seller.companyWebsiteUrl,
          officeOutsideUS: seller.wareHouseOutsideUS === 'Yes' ? true : false
        }
      },
      productIntegration: {
        itemCategory: Object.keys(seller.categories).filter(
          (item) => seller.categories[item] === true
        ),
        avgOnlineRevenue: seller.avgOnlineRevenue,
        highestPerformingCategory: seller.highestPerformingCategory,
        catalogSize: seller.catalogSize,
        '%SKUrefurbished': seller.percentageSKUrefurbished,
        '%SKUValidUPCCode': seller.percentageSKUWithInvalidUPCCodes,
        '%SKUUsed': seller.percentageSKUUsed
      },
      shippingAndOperations: {
        marketPlace: seller.marketPlace.map((item: any) => {
          let _item = {
            marketplaceName: item.marketplaceName,
            marketPlaceSellerName: item.sellerName,
            marketPlaceURL: item.url
          };
          return _item;
        }),
        // warehouseLocation: seller.wareHouseAddress,
        integrationType: seller.paysferIntegrationMode,
        shippingMethods: Object.keys(seller.currentShippingMethods).filter(
          (item) => seller.currentShippingMethods[item] === true
        ),
        briefOnFitForMarketPlace: seller.briefOnFitForMarketPlace
      }
    };
    console.log(sellerData);
    setSellerData(sellerData);
  }, [seller]);

  const onSubmit = () => {
    dispatch(sellerStart({ seller: sellerData }));
    setOpen(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4
  };

  return (
    <div className='request-to-sell-wrap'>
      <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Company Registration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {sellerData &&
            Object.keys(sellerData).length &&
            Object.keys(sellerData.companyRegistration).length &&
            Object.keys(sellerData.companyRegistration.usAdress).length ? (
              <>
                <List>
                  <ListItem>
                    <ChevronRightIcon />
                    FirstName : {sellerData.firstName ? sellerData.firstName : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    LastName : {sellerData.lastName ? sellerData.lastName : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Email : {sellerData.email ? sellerData.email : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    City : {sellerData.city ? sellerData.city : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Country : {sellerData.country ? sellerData.country : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Job Title : {sellerData.jobTitle ? sellerData.jobTitle : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Preffered Tax Location :{' '}
                    {sellerData.companyRegistration.preferredTaxClassifiacation
                      ? sellerData.companyRegistration.preferredTaxClassifiacation
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    County of Incorporation :{' '}
                    {sellerData.companyRegistration.countryOfIncorporation
                      ? sellerData.companyRegistration.countryOfIncorporation
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    State of Incorporation :{' '}
                    {sellerData.companyRegistration.stateOfIncorporation
                      ? sellerData.companyRegistration.stateOfIncorporation
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Are you a Public Company listed on a Stock Exchange? :{' '}
                    {sellerData.companyRegistration.stockExchange ? (
                      sellerData.companyRegistration.stockExchange ? (
                        <>Yes</>
                      ) : (
                        <>No</>
                      )
                    ) : (
                      ''
                    )}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Legal Company Name :{' '}
                    {sellerData.companyRegistration.legalCompanyName
                      ? sellerData.companyRegistration.legalCompanyName
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    US Tax ID (TIN) :{' '}
                    {sellerData.companyRegistration.usTaxID
                      ? sellerData.companyRegistration.usTaxID
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Doing Business As (DBA) :{' '}
                    {sellerData.companyRegistration.DBA
                      ? sellerData.companyRegistration.DBA
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Year of foundation :{' '}
                    {sellerData.companyRegistration.yearOfFoundation
                      ? sellerData.companyRegistration.yearOfFoundation
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    DUNS Number :{' '}
                    {sellerData.companyRegistration.DUNS
                      ? sellerData.companyRegistration.DUNS
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Legal Country :{' '}
                    {sellerData.companyRegistration.usAdress.country
                      ? sellerData.companyRegistration.usAdress.country
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Legal State :{' '}
                    {sellerData.companyRegistration.usAdress.state
                      ? sellerData.companyRegistration.usAdress.state
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Legal City :{' '}
                    {sellerData.companyRegistration.usAdress.city
                      ? sellerData.companyRegistration.usAdress.city
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Postal Code :{' '}
                    {sellerData.companyRegistration.usAdress.code
                      ? sellerData.companyRegistration.usAdress.code
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Address 1 :{' '}
                    {sellerData.companyRegistration.usAdress.address1
                      ? sellerData.companyRegistration.usAdress.address1
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Address 2 :{' '}
                    {sellerData.companyRegistration.usAdress.address2
                      ? sellerData.companyRegistration.usAdress.address2
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Phone Number :{' '}
                    {sellerData.companyRegistration.usAdress.phone
                      ? sellerData.companyRegistration.usAdress.phone
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Company Website :{' '}
                    {sellerData.companyRegistration.usAdress.companyWebsite
                      ? sellerData.companyRegistration.usAdress.companyWebsite
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Office Outside US :{' '}
                    {sellerData.companyRegistration.usAdress.officeOutsideUS ? (
                      sellerData.companyRegistration.usAdress.officeOutsideUS ? (
                        <>Yes</>
                      ) : (
                        <>No</>
                      )
                    ) : (
                      ''
                    )}
                  </ListItem>
                </List>
              </>
            ) : null}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Product Integration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {sellerData &&
            Object.keys(sellerData).length &&
            Object.keys(sellerData.shippingAndOperations).length ? (
              <>
                <List>
                  <ListItem>
                    <ChevronRightIcon />
                    Do you sell items in these categories? Select all that apply, leave
                    blank if none :{' '}
                    {sellerData.productIntegration.itemCategory
                      ? sellerData.productIntegration.itemCategory.join(', ')
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Average Online Revenue (in USD) :{' '}
                    {sellerData.productIntegration.avgOnlineRevenue
                      ? sellerData.productIntegration.avgOnlineRevenue
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    *Select your highest performing category, based on revenue :{' '}
                    {sellerData.productIntegration.highestPerformingCategory
                      ? sellerData.productIntegration.highestPerformingCategory
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Catolog Size :{' '}
                    {sellerData.productIntegration.catalogSize
                      ? sellerData.productIntegration.catalogSize
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    What % of SKU are refurbished? :{' '}
                    {sellerData.productIntegration['%SKUrefurbished']
                      ? sellerData.productIntegration['%SKUrefurbished']
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    *What % of your SKUs do not have valid UPC codes? :{' '}
                    {sellerData.productIntegration['%SKUValidUPCCode']
                      ? sellerData.productIntegration['%SKUValidUPCCode']
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    What % of SKU are used? :{' '}
                    {sellerData.productIntegration['%SKUUsed']
                      ? sellerData.productIntegration['%SKUUsed']
                      : ''}
                  </ListItem>
                </List>
              </>
            ) : null}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Shipping and Operations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {sellerData &&
            Object.keys(sellerData).length &&
            Object.keys(sellerData.productIntegration).length ? (
              <>
                <List>
                  <ListItem>
                    <ChevronRightIcon />
                    Specify your information for other Retail Marketplaces : <br />
                    <TableContainer component={Paper}>
                      <Table aria-label='simple table'>
                        <TableHead>
                          <TableRow>
                            <TableCell align='right'>Market Place Name</TableCell>
                            <TableCell align='right'>Seller Name</TableCell>
                            <TableCell align='right'>Website URL</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sellerData.shippingAndOperations.marketPlace.map(
                            (row: any) => (
                              <TableRow
                                key={row.marketplaceName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align='right'>{row.marketplaceName}</TableCell>
                                <TableCell align='right'>
                                  {row.marketPlaceSellerName}
                                </TableCell>
                                <TableCell align='right'>{row.marketPlaceURL}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    How are you planning to integrate with Paysfer? :{' '}
                    {sellerData.shippingAndOperations.integrationType
                      ? sellerData.shippingAndOperations.integrationType
                      : ''}
                  </ListItem>
                  <ListItem>
                    <ChevronRightIcon />
                    Current shipping methods, select all that apply :{' '}
                    {sellerData.shippingAndOperations.shippingMethods
                      ? sellerData.shippingAndOperations.shippingMethods.join(', ')
                      : ''}
                  </ListItem>
                  {/* <ListItem>
                    <ChevronRightIcon />
                    Warehouse Location :{' '}
                    {sellerData.shippingAndOperations.warehouseLocation
                      ? Object.values(
                          sellerData.shippingAndOperations.warehouseLocation
                        ).join(', ')
                      : ''}
                  </ListItem> */}
                  <ListItem>
                    <ChevronRightIcon />
                    Why would you be a good fit for Paysfer Marketplace :{' '}
                    {sellerData.shippingAndOperations.briefOnFitForMarketPlace
                      ? sellerData.shippingAndOperations.briefOnFitForMarketPlace
                      : ''}
                  </ListItem>
                </List>
              </>
            ) : null}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Modal
        open={open}
        onClose={() => {
          setOpen(true);
          setTimeout(() => {
            navigate ('/')
          }, 2000)          
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Thank You!
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }} color='InfoText'>
            The Marketplace team will review your application and in the coming days if
            you qualify, you will be hearing from us soon!
          </Typography>
        </Box>
      </Modal>
      <div className='request-btn-wrap'>
        <div className='btn-container'>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/seller/onboarding/shipping-and-operations');
              setActiveStep(2);
            }}
            className='btn btn-primary'
          >
            Back
          </button>
          <button onClick={onSubmit} className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
