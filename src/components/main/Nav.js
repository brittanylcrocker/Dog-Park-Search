import React from 'react';
import { Router, Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <Router>
      <Link to='/home'>Dog Park Search</Link>
      </Router>
    </div>
  )
}


export default Nav
