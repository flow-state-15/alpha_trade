import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import "./DropDownMenu.css";

export default function DropDownMenu({ array, user, name }) {
  const [toggle, setToggle] = useState(false);

  const ddContent = array.map((watchlist) => (
    <Link
      className="dd-item"
      to={`/@profile/${user.id}/watchlists/${watchlist.id}`}
    >
      {watchlist.name}
    </Link>
  ));

  return (
    <>
      {/* <h1>hello</h1>
      {array.map((watchlist) => (
        <Link to={`/@profile/${user.id}/watchlists/${watchlist.id}`}>
          {watchlist.name}
        </Link>
      ))} */}
      <div
        className="dd-active"
        onClick={() => {
          setToggle(!toggle);
          console.log(toggle, ddContent);
        }}
      >
        <div className='dd-name-wrapper'>
            {name}
        </div>
        <div className="dd-hidden">
          <div className="dd-content-wrapper">{ddContent}</div>
        </div>
      </div>
    </>
  );
}
