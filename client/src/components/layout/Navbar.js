import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <ul className="navbar">
    <li className="navbar__item">
      <NavLink to="/" className="navbar__link" exact activeClassName="navbar__link--active">Landing</NavLink>
    </li>
    <li className="navbar__item">
      <NavLink to="/login" className="navbar__link" exact activeClassName="navbar__link--active">Login</NavLink>
    </li>
    <li className="navbar__item">
      <NavLink to="/register" className="navbar__link" activeClassName="navbar__link--active">Register</NavLink>
    </li>
    <li className="navbar__item">
      <NavLink to="/dashboard" className="navbar__link" activeClassName="navbar__link--active">Dashboard</NavLink>
    </li>
    <li className="navbar__item">
      <NavLink to="/history" className="navbar__link" activeClassName="navbar__link--active">History</NavLink>
    </li>
  </ul>
);

export default Navbar;