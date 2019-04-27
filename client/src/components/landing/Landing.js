import React from 'react';
import { ReactComponent as Chart } from './chart.svg';

const Landing = () => (
  <>
    <div className="content">
      <div className="landing-body">
        <div className="landing-img">
          <Chart />
        </div>
        <div className="landing-text">
          <p className="body-text">Get into the habit of saving money effective for the things you love.</p>
          <p className="body-text">This app will help you manage your revenue and expenses more effectively.</p>
        </div>
      </div>
    </div>
  </>
);

export default Landing;