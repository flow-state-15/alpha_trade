import "./UserPage.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { createChart } from 'lightweight-charts';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import TechnicalAnalysis from 'react-tradingview-technical-analysis';

export default function UserPage() {

  return (
    <div className="userpage-container">
      <h1>TESTING</h1>
      <div className="tradingview-chart-container">
        <TradingViewWidget
            symbol="NASDAQ:GOOG"
            theme={Themes.DARK}
            // styles={{width:"100%"}}
            hide-side-toolbar={false}
        />
      </div >
      <div className="tradingview-chart-container">
        {/* <TechnicalAnalysis
            symbol={'AAPL'}
            colorTheme={TechnicalAnalysis.THEMES.DARK}
        /> */}
      </div>
    </div>
  );
}
