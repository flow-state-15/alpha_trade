import { useState } from "react";
import { Link } from "react-router-dom";
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
      <div
        className="dd-active"
        onClick={() => {
          setToggle(!toggle);
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
