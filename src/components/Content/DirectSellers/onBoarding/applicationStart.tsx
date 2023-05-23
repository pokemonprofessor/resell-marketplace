import docImg from 'assets/images/doc-img.svg';
import { useEffect } from 'react';

import { useNavigate } from "react-router-dom"

export default function ApplicationStart(props: any) {
  const navigate = useNavigate();

  return (
    <div className="request-to-sell-wrap">
      {/* <section className="application-section">
        <div className="container">
          <h4>Lorem Ipsum is simply dummy text of the printing and typesetting</h4>
          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
        </div>
      </section> */}
      {/* <section className="tips-section">
        <div className="container">
          <h4>Lorem Ipsum is simply dummy text of the printing and typesetting</h4>
          <div className="row">
            <div className="col-md-4">
              <div className="tips-card">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="tips-card">
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make. </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="tips-card">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="required-section">
        <h4>Please have this required information available when completing the application:</h4>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img alt='Document' src={docImg} className="doc-img" />
            </div>
            <div className="col-md-9">
              <ul>
                <li>US Business Tax ID (SSN not accepted)</li>
                <li>W9 or W8 and EIN Verification Letter from the Department of Treasury that verifies your US business address or place of physical operations</li>
                <li>Address or place of physical operations</li>
                <li>US Business address</li>
                <li>Planned integration method for your product catalog (bulk upload, API, solution provider)</li>
                <li>Primary product categories, catalog size and related information (e.g. total SKUs you will be selling on resell.ooo initially with verified UPC information, and used vs. refurbished etc.)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="request-btn-wrap">
        <button onClick={() => {
          props.setActiveStep(1);
          navigate('/seller/onboarding/company-registration')
        }}
          className="btn-primary start"
          id="step_two">START</button>
      </div>
    </div>

  )
}
