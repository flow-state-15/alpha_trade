import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import "./DropDownMenu.css";

export default function DropDownMenu({ array }, { user }) {
    return (
        <>
            {array.map((watchlist) =>
                <Link to={`/@profile/${user.id}/watchlists/${watchlist.id}`}>{watchlist.name}</Link>
            )}
        </>
    )
}
