import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to="/">
      <span
        style={{ fontSize: '50px' }}
        className="material-symbols-outlined">
        hive
      </span>
    </NavLink>
  );
}
