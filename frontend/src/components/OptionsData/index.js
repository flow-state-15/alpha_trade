import "./OptionsData.css";
import OptionsFilter from "./OptionsFilter";
import StrikeMapCard from "./StrikeMapCard";
import { csrfFetch } from "../../store/csrf";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";

export default function OptionsData({ user }) {
  const [data, setData] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    (async () => {
      if (user.lastViewedSym) {
        const reqData = {
          symbol: user.lastViewedSym,
        };
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
          await setData(returnData);
        }
      } else {
        setError(["please select a symbol"]);
      }
    })();
    setError([]);
  }, [user]);

  useEffect(() => {
    console.log("DATA: ", data);
  }, [data]);

  const getOptionsChain = async () => {
    if (user.lastViewedSym) {
      const reqData = {
        symbol: user.lastViewedSym,
      };
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
        await setData(returnData);
      }
    } else {
      setError(["please select a symbol"]);
    }
  };
  console.log("data useState, data:", data);
  // console.log("data strike array, data.callExpDateMap:", Object.values(data.callExpDateMap));

  //   const getData = () => {
  //     console.log(getOptionsChain)
  //     dispatch(getOptionsChain({ symbol: user.lastViewedSym }));
  //   };

  return (
    <div className="options-data-wrap">
      {error.length && error.map((err) => <h3 key={err}>{err}</h3>)}
      {data ? (
        <Container className="data-underlying-data-wrap">
          <Row>
            <Col>
              <Row>
                <Col className="opt-data-col">
                  <h1>{data.underlying.description}</h1>
                </Col>
              </Row>
              <Row className="data-underlying-col-header">
                <Col className="opt-data-col">total volume</Col>
                <Col className="opt-data-col">52wkHigh</Col>
                <Col className="opt-data-col">52wkLow</Col>
                <Col className="opt-data-col">last price</Col>
                <Col className="opt-data-col">ask</Col>
                <Col className="opt-data-col">bid</Col>
                <Col className="opt-data-col">% change</Col>
                <Col className="opt-data-col">net change</Col>
              </Row>
              <Row>
                <Col className="opt-data-col">{data.underlying.totalVolume}</Col>
                <Col className="opt-data-col">{data.underlying.fiftyTwoWeekHigh}</Col>
                <Col className="opt-data-col">{data.underlying.fiftyTwoWeekLow}</Col>
                <Col className="opt-data-col">{data.underlying.last}</Col>
                <Col className="opt-data-col">{data.underlying.ask}</Col>
                <Col className="opt-data-col">{data.underlying.bid}</Col>
                <Col className="opt-data-col">{data.underlying.percentChange}</Col>
                <Col className="opt-data-col">{data.underlying.change}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : null}
      <h1 style={{ padding: "1rem;" }}>Option Chain</h1>
      {data
        ? Object.keys(data.callExpDateMap).map((strike) => (
            <StrikeMapCard
              calls={data.callExpDateMap[strike]}
              puts={data.putExpDateMap[strike]}
              exp={strike}
            />
          ))
        : null}
    </div>
  );
}
