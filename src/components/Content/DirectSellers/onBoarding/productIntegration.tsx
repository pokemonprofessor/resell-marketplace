import { Checkbox, FormControl, FormGroup } from '@mui/material'
import { RadioGroup, TextField, FormControlLabel, Radio } from '@mui/material';

import React from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function ProductIntegration(props: any) {
  const navigate = useNavigate();
  const { seller, setSeller, setActiveStep } = props;

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(seller);
    setActiveStep(3);
    navigate('/seller/onboarding/shipping-and-operations');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller({
      ...seller,
      categories: {
        ...seller.categories,
        [event.target.name]: event.target.checked,
      }
    });
  };

  return (

    <div className="request-to-sell-wrap">
      <section className="request-form-section non-active">
        <div className="container">
          <div className="request-form-card">
            <div className="request-arrow-icon"></div>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <label htmlFor="">Do you sell items in these categories? Select all that apply, leave blank if none</label>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox size='small' checked={seller.categories["Software"]} onChange={handleChange} name="Software" />
                  }
                  label="Software"
                />
                <FormControlLabel
                  control={
                    <Checkbox size='small' checked={seller.categories["Fragrances"]} onChange={handleChange} name="Fragrances" />
                  }
                  label="Fragrances"
                />
                <FormControlLabel
                  control={
                    <Checkbox size='small' checked={seller.categories["Luxury Brands"]} onChange={handleChange} name="Luxury Brands" />
                  }
                  label="Luxury Brands"
                />
                <FormControlLabel
                  control={
                    <Checkbox size='small' checked={seller.categories["Cellphones and Accessories"]} onChange={handleChange} name="Cellphones and Accessories" />
                  }
                  label="Cellphones and Accessories"
                />
                <FormControlLabel
                  control={
                    <Checkbox size='small' checked={seller.categories["Jewellery and Watches"]} onChange={handleChange} name="Jewellery and Watches" />
                  }
                  label="Jwellery and Watches"
                />
              </FormGroup>
            </FormControl>
          </div>

        </div>
      </section>
      <section className="request-form-section non-active">
        <div className="container">
          <div className="request-form-card">
            <div className="request-arrow-icon"></div>
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="f_name">Average Online Revenue (in USD)</label>
                    <TextField
                      value={seller.avgOnlineRevenue}
                      className={'mui-text-field'}
                      color='primary'
                      variant="outlined"
                      fullWidth
                      id="avgOnlineRevenue"
                      name="avgOnlineRevenue"
                      onChange={(e) => setSeller({ ...seller, avgOnlineRevenue: e.target.value })}
                    />                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="f_name">Select your highest performing category, based on revenue</label>
                    <TextField
                      value={seller.highestPerformingCategory}
                      className={'mui-text-field'}
                      color='primary'
                      variant="outlined"
                      fullWidth
                      id="highestPerformingCategory"
                      name="highestPerformingCategory"
                      onChange={(e) => setSeller({ ...seller, highestPerformingCategory: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="f_name">Catalog Size</label>
                    <TextField
                      value={seller.catalogSize}
                      className={'mui-text-field'}
                      color='primary'
                      variant="outlined"
                      fullWidth
                      id="catalogSize"
                      name="catalogSize"
                      onChange={(e) => setSeller({ ...seller, catalogSize: e.target.value })}
                    />                  </div>
                </div>
                <div className="col-md-12">
                  <div className="w-100 btn-listing">
                    <label htmlFor="">What % of SKU are refurbished?</label>
                    <div className="d-flex align-items-center">
                      <RadioGroup row aria-label="preferredTaxClassification" name="row-radio-buttons-group">
                        <FormControlLabel value="0%" control={
                          <Radio
                            checked={seller.percentageSKUrefurbished === '0%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUrefurbished: e.target.value })
                            }}
                          />} label="0%" />
                        <FormControlLabel value="1-25%" control={
                          <Radio
                            checked={seller.percentageSKUrefurbished === '1-25%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUrefurbished: e.target.value })
                            }}
                          />} label="1-25%" />
                        <FormControlLabel value='26-50%' control={
                          <Radio
                            checked={seller.percentageSKUrefurbished === '26-50%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUrefurbished: e.target.value })
                            }}
                          />} label='26-50%' />
                        <FormControlLabel value="51-75%" control={
                          <Radio
                            checked={seller.percentageSKUrefurbished === '51-75%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUrefurbished: e.target.value })
                            }}
                          />} label="51-75%" />
                        <FormControlLabel value="76-100%" control={
                          <Radio
                            checked={seller.percentageSKUrefurbished === '76-100%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUrefurbished: e.target.value })
                            }}
                          />} label='76-100%' />
                      </RadioGroup>
                    </div>

                  </div>
                  <div className="w-100 btn-listing">
                    <label htmlFor="">What % of your SKUs do not have valid UPC codes?</label>
                    <div className="d-flex align-items-center">
                      <RadioGroup row aria-label="preferredTaxClassification" name="row-radio-buttons-group">
                        <FormControlLabel value="0%" control={
                          <Radio
                            checked={seller.percentageSKUWithInvalidUPCCodes === '0%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUWithInvalidUPCCodes: e.target.value })
                            }}
                          />} label="0%" />
                        <FormControlLabel value="1-25%" control={
                          <Radio
                            checked={seller.percentageSKUWithInvalidUPCCodes === '1-25%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUWithInvalidUPCCodes: e.target.value })
                            }}
                          />} label="1-25%" />
                        <FormControlLabel value='26-50%' control={
                          <Radio
                            checked={seller.percentageSKUWithInvalidUPCCodes === '26-50%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUWithInvalidUPCCodes: e.target.value })
                            }}
                          />} label='26-50%' />
                        <FormControlLabel value="51-75%" control={
                          <Radio
                            checked={seller.percentageSKUWithInvalidUPCCodes === '51-75%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUWithInvalidUPCCodes: e.target.value })
                            }}
                          />} label="51-75%" />
                        <FormControlLabel value="76-100%" control={
                          <Radio
                            checked={seller.percentageSKUWithInvalidUPCCodes === '76-100%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUWithInvalidUPCCodes: e.target.value })
                            }}
                          />} label='76-100%' />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="w-100 btn-listing">
                    <label htmlFor="">What % of SKU are used?</label>
                    <div className="d-flex align-items-center">
                      <RadioGroup row aria-label="preferredTaxClassification" name="row-radio-buttons-group">
                        <FormControlLabel value="0%" control={
                          <Radio
                            checked={seller.percentageSKUUsed === '0%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUUsed: e.target.value })
                            }}
                          />} label="0%" />
                        <FormControlLabel value="1-25%" control={
                          <Radio
                            checked={seller.percentageSKUUsed === '1-25%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUUsed: e.target.value })
                            }}
                          />} label="1-25%" />
                        <FormControlLabel value='26-50%' control={
                          <Radio
                            checked={seller.percentageSKUUsed === '26-50%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUUsed: e.target.value })
                            }}
                          />} label='26-50%' />
                        <FormControlLabel value="51-75%" control={
                          <Radio
                            checked={seller.percentageSKUUsed === '51-75%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUUsed: e.target.value })
                            }}
                          />} label="51-75%" />
                        <FormControlLabel value="76-100%" control={
                          <Radio
                            checked={seller.percentageSKUUsed === '76-100%'}
                            onChange={(e) => {
                              setSeller({ ...seller, percentageSKUUsed: e.target.value })
                            }}
                          />} label='76-100%' />
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className="request-btn-wrap">
                <div className="btn-container">
                  <button onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/seller/onboarding/company-registration')
                    setActiveStep(1)
                  }} className="btn btn-primary">Back</button>
                  <button className="btn btn-primary" id="step_four">Next</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div >
  )
}
