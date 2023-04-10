import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import {Link} from 'react-router-dom'

function MainNavigation() {
  return (
    <MainHeader>
      <h1 className="main-navigation__title"> <Link to="/">YourPlaces</Link></h1>
      <nav>...</nav>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
    </MainHeader>
  );
}

export default MainNavigation;
