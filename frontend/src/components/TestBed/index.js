import { useState, useEffect } from 'react'
import { AdvancedChart } from "react-tradingview-embed";
import { TickerTape } from "react-tradingview-embed";

export default function TestBed () {
    const [count, setCount] = useState(0)

    const rerender = () => {
        setCount(prev => prev += 1)
    }



    console.log("TESTING TESTBED ENDPOINT >>>>>>>>>>>>>")

    return (
        <div className="wrap-testbed">
            <div style={{ top: '50%', left: 'auto', color: "red", backgroundColor: 'black'}}>
                WELCOME TO TESTBED
            </div>
            <div>
            <button
             type="button"
             onClick={rerender}
             >
                force-rerender
            </button>
            <div>
                rerendered {count}
            </div>
            <TickerTape widgetProps={{"theme": "dark"}} />;
            <div style={{width: "50%"}}>
            <AdvancedChart widgetProps={{"theme": "dark", symbol: 'aapl'}}  />;

            </div>
            </div>
        </div>
    )
}
