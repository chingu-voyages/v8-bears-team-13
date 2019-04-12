import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <div id="toggle">
    <input className="checkbox" type="checkbox" />
    <span />
    <span />
    <span />
    <ul className="navbar" id="navbar">

      <li className="navbar__item">
        <NavLink to="/" className="navbar__link" exact activeClassName="navbar__link--active">
          <button className="navbar__button" type="button">
            Landing
          </button>
        </NavLink>
      </li>

      <li className="navbar__item">
        <NavLink to="/login" className="navbar__link" exact activeClassName="navbar__link--active">
          <button className="navbar__button" type="button">
            Login
          </button>
        </NavLink>
      </li>

      <li className="navbar__item">
        <NavLink to="/register" className="navbar__link" activeClassName="navbar__link--active">
          <button className="navbar__button" type="button">
            Register
          </button>
        </NavLink>
      </li>

      <li className="navbar__item">
        <NavLink to="/dashboard" className="navbar__link" activeClassName="navbar__link--active">
          <button className="navbar__button" type="button">
            Dashboard
          </button>
        </NavLink>
      </li>

      <li className="navbar__item">
        <NavLink to="/history" className="navbar__link" activeClassName="navbar__link--active">
          <button className="navbar__button" type="button">
            History
          </button>
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Navbar;
