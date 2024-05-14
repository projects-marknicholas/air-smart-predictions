import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import homeSvg from '../assets/svg/home.svg'
import aboutSvg from '../assets/svg/about.svg'

function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);
  const [showLoggers, setShowLoggers] = useState(false);

  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Toggle button to open/close the sidebar */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      {/* Navigation links */}
      <nav>
        <ul>
          {/* Home Link */}
          <li className={`${getNavLinkClass('/')}`}>
            <Link to="/" onClick={closeSidebar}>
              <img src={homeSvg}/>
              <p className={`${isOpen ? 'show' : 'hide'}`}>Home</p>
            </Link>
          </li>
          {/* 
            kung ano yung redirect link, ayun din ang ilalagay sa getNavLinkClass, ayan yung sample.
            and purpose nito is para sa para malaman if anong page yung active
          */}
          <li className={`${getNavLinkClass('/about')}`}>
            <Link to="/about" onClick={closeSidebar}>
              <img src={aboutSvg  }/>
              <p className={`${isOpen ? 'show' : 'hide'}`}>About</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;