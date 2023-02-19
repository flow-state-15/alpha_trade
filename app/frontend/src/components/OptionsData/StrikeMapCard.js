import { Container, Row, Col } from "react-grid-system";
import { useState } from "react";

export default function StrikeMapCard({ calls, puts, exp }) {
  const [toggle, setToggle] = useState(false);
  const rawDate = exp.split(":")[0];
  const daysTilExp = exp.split(":")[1];
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(rawDate);

  return (
    <div className="strike-map-card-wrap" style={{ backgroundColor: "white" }}>
      <div className="strike-date-wrap" onClick={(e) => setToggle(!toggle)}>
        <h2>{date.toLocaleDateString("en-US", options)}</h2>
        <h2>{`days til exp: ${daysTilExp}`}</h2>
      </div>
      {toggle && (
        <Container fluid>
          <Row debug>
            <Col debug>
              <Row>
                <Col className="opt-data-col">CALLS</Col>
              </Row>
              <Row className="strike-map-header-row">
                <Col>volatility</Col>
                <Col>open-i</Col>
                <Col>volume</Col>
                <Col>delta</Col>
                <Col>net</Col>
                <Col>%change</Col>
                <Col>ask</Col>
                <Col>bid</Col>
                <Col>intrinsic</Col>
              </Row>
              {Object.keys(calls).map((strike) => (
                <Row
                  className={
                    calls[strike][0].inTheMoney
                      ? "strike-itm strike-map-data-row-hover"
                      : "strike-otm strike-map-data-row-hover"
                  }
                  key={strike}
                >
                  <Col className="strike-map-item-col">
                    {calls[strike][0].volatility}
                  </Col>
                  <Col className="strike-map-item-col">
                    {calls[strike][0].openInterest}
                  </Col>
                  <Col className="strike-map-item-col">
                    {calls[strike][0].totalVolume}
                  </Col>
                  <Col className="strike-map-item-col">
                    {calls[strike][0].delta}
                  </Col>
                  <Col className="strike-map-item-col">
                    {calls[strike][0].netChange}
                  </Col>
                  <Col className="strike-map-item-col">
                    {parseFloat(calls[strike][0].percentChange).toFixed(2) +
                      "%"}
                  </Col>
                  <Col className="strike-map-item-col">
                    <div class="contract-buy-sell">{calls[strike][0].ask}</div>
                  </Col>
                  <Col className="strike-map-item-col">
                    <div class="contract-buy-sell">{calls[strike][0].bid}</div>
                  </Col>
                  <Col className="strike-map-item-col">
                    {calls[strike][0].intrinsicValue}
                  </Col>
                </Row>
              ))}
            </Col>
            <Col debug xs="content">
              <Row>
                <Col className="opt-data-col">STRIKE</Col>
              </Row>
              <br />
              {Object.keys(calls).map((strike) => (
                <Row className="strike-map-item-col" key={strike}>
                  <Col>{strike}</Col>
                </Row>
              ))}
            </Col>
            <Col debug>
              <Row>
                <Col className="opt-data-col">PUTS</Col>
              </Row>
              <Row className="strike-map-header-row">
                <Col>intrinsic</Col>
                <Col>bid</Col>
                <Col>ask</Col>
                <Col>%change</Col>
                <Col>net</Col>
                <Col>delta</Col>
                <Col>volume</Col>
                <Col>open-i</Col>
                <Col>volatility</Col>
              </Row>
              {Object.keys(puts).map((strike) => (
                <Row
                  className={
                    puts[strike][0].inTheMoney
                      ? "strike-itm strike-map-data-row-hover"
                      : "strike-otm strike-map-data-row-hover"
                  }
                  key={strike}
                >
                  <Col className="strike-map-item-col">
                    {puts[strike][0].intrinsicValue}
                  </Col>
                  <Col className="strike-map-item-col">
                    <div
                      class="contract-buy-sell"
                    >{puts[strike][0].bid}</div>
                  </Col>
                  <Col className="strike-map-item-col">
                    <div class="contract-buy-sell">{puts[strike][0].ask}</div>
                  </Col>
                  <Col className="strike-map-item-col">
                    {parseFloat(puts[strike][0].percentChange).toFixed(2) + "%"}
                  </Col>
                  <Col className="strike-map-item-col">
                    {puts[strike][0].netChange}
                  </Col>
                  <Col className="strike-map-item-col">
                    {puts[strike][0].delta}
                  </Col>
                  <Col className="strike-map-item-col">
                    {puts[strike][0].totalVolume}
                  </Col>
                  <Col className="strike-map-item-col">
                    {puts[strike][0].openInterest}
                  </Col>
                  <Col className="strike-map-item-col">
                    {puts[strike][0].volatility}
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
