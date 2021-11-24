import { Container, Row, Col } from "react-grid-system";

export default function StrikeMapCard({ calls, puts, exp }) {
  const rawDate = exp.split(":")[0];
  const daysTilExp = exp.split(":")[1];
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(rawDate);

  console.log(calls, puts, exp);
  return (
    <div>
      <div className="strike-date-wrap">
        <h2>{date.toLocaleDateString("en-US", options)}</h2>
        <h2>{`days til exp: ${daysTilExp}`}</h2>
      </div>
      <Container fluid>
        <Row debug>
          <Col debug>
            <Row>
              <Col className="opt-data-col">CALLS</Col>
            </Row>
            <Row>
              <Col>symbol</Col>
              <Col>volatility</Col>
              <Col>openInterest</Col>
              <Col>totalVolume</Col>
              <Col>delta</Col>
              <Col>netChange</Col>
              <Col>percentChange</Col>
              <Col>ask</Col>
              <Col>bid</Col>
            </Row>
            {Object.keys(calls).map((strike) => (
              <Row key={strike}>
                <Col>{calls[strike][0].symbol}</Col>
                <Col>{calls[strike][0].volatility}</Col>
                <Col>{calls[strike][0].openInterest}</Col>
                <Col>{calls[strike][0].totalVolume}</Col>
                <Col>{calls[strike][0].delta}</Col>
                <Col>{calls[strike][0].netChange}</Col>
                <Col>{calls[strike][0].percentChange}</Col>
                <Col>{calls[strike][0].ask}</Col>
                <Col>{calls[strike][0].bid}</Col>
              </Row>
            ))}
          </Col>
          <Col debug xs="content">
            <Row>
              <Col className="opt-data-col">STRIKE</Col>
            </Row>
            <br />
            {Object.keys(calls).map((strike) => (
              <Row key={strike}>
                <Col>{strike}</Col>
              </Row>
            ))}
          </Col>
          <Col debug>
            <Row>
              <Col className="opt-data-col">PUTS</Col>
            </Row>
            <Row>
              <Col>symbol</Col>
              <Col>volatility</Col>
              <Col>openInterest</Col>
              <Col>totalVolume</Col>
              <Col>delta</Col>
              <Col>netChange</Col>
              <Col>percentChange</Col>
              <Col>ask</Col>
              <Col>bid</Col>
            </Row>
            {Object.keys(puts).map((strike) => (
              <Row key={strike}>
                <Col>{puts[strike][0].symbol}</Col>
                <Col>{puts[strike][0].volatility}</Col>
                <Col>{puts[strike][0].openInterest}</Col>
                <Col>{puts[strike][0].totalVolume}</Col>
                <Col>{puts[strike][0].delta}</Col>
                <Col>{puts[strike][0].netChange}</Col>
                <Col>{puts[strike][0].percentChange}</Col>
                <Col>{puts[strike][0].ask}</Col>
                <Col>{puts[strike][0].bid}</Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
