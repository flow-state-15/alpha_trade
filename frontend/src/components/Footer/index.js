import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-about">
        <h2>AlphaTrade 2021</h2>
        <h3>Designed and built by Dan Purcell</h3>
        <p>
          This website was built as a tool to experience a simulated trading
          environment. It should be used for data viewing purposes only and
          nothing on this site is to be interpreted as financial advice. All
          data is delayed and reliant upon external APIs. Trading real money is
          risky and should only be done after preparation and understanding of
          its risks.
        </p>
      </div>
      <div className="footer-logo-links-wrap">
        <div className="footer-logo-container">
          <h2>LinkedIn</h2>
          <a
            href="https://www.linkedin.com/in/dan-purcell-fifteen/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636743583/discord_group_projo_assets/linkedin-tile_xvsp19.svg"
              alt="linkedin icon"
            />
          </a>
        </div>
        <div className="footer-logo-container">
          <h2>Github</h2>
          <a
            href="https://github.com/flow-state-15/alpha_trade"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636755621/discord_group_projo_assets/github-icon-2_lhhfge.jpg"
              alt="github icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
