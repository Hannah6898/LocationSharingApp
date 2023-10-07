import React, { Fragment, useState } from "react";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  //Opening and closing of the Side drawer
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  //If the size of the page increases and the side drawer is open, it should automtically disappear

  return (
    <Fragment>
      {drawerIsOpen ? <Backdrop onClick={closeDrawerHandler} /> : null}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <h1 className="main-navigation__title">
          {" "}
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
      </MainHeader>
    </Fragment>
  );
}

export default MainNavigation;
