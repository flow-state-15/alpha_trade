import "./Handle404.css";
import { Link } from "react-router-dom";



export default function Handle404() {
  return (
    <div className="tag-handle-404">
      <h1 >
        Oops! Looks like there's nothing here!
        <br />
        <h3>
          {" "}
          Go back to
          <Link to="/">Home</Link>
        </h3>
      </h1>
    </div>
  );
}
