import "./OptionsData.css";
import OptionsFilter from "./OptionsFilter";
import StrikeMapCard from "./StrikeMapCard";
import { csrfFetch } from "../../store/csrf";
import React, { useState, useEffect } from "react";

export default function OptionsData({ user }) {
    const [data, setData] = useState(false)
    const [error, setError] = useState([])

    useEffect(() => {
        console.log("user changed, lastViewedSym: ", user.lastViewedSym)
        setError([])
    }, [user])

    useEffect(() => {
        console.log("DATA: ", data)
    }, [data])

  const getOptionsChain = async () => {
      if(user.lastViewedSym){
          const reqData = {
              symbol: user.lastViewedSym
          }
          const response = await csrfFetch(
            `/api/portfolios/optionsChain/${reqData.symbol}/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqData),
            }
          );
          if (response.ok) {
            const returnData = await response.json();
            await setData(returnData)
          }
      } else {
          setError(["please select a symbol"])
      }
};
// console.log("data useState, data:", data);
// console.log("data strike array, data.callExpDateMap:", Object.values(data.callExpDateMap));

//   const getData = () => {
//     console.log(getOptionsChain)
//     dispatch(getOptionsChain({ symbol: user.lastViewedSym }));
//   };


  return (
    <div>
      <button onClick={getOptionsChain}>{`get options data for ${user.lastViewedSym}`}</button>
      {error.length && (
          error.map(err => <h3 key={err}>{err}</h3>)
      )}
      <OptionsFilter />
      {data ? Object.keys(data.callExpDateMap).map(strike => <StrikeMapCard calls={data.callExpDateMap[strike]} puts={data.putExpDateMap[strike]} exp={strike} />
      ) : null}
    </div>
  );
}
