import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
import logoCollapsed from "../assets/logoCollapsed.svg"; 
import glovesSelect from "../assets/glovesSelect.svg"; 
import glovesWhite from "../assets/glovesWhite.svg"; 
import handSelect from "../assets/handSelect.svg"; 
import handWhite from "../assets/handWhite.svg"; 
import Footer from './footer';
import hand from "../assets/hand.svg";
import gloves from "../assets/gloves.svg";
import { HomeIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, HandRaisedIcon, UserIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

const SideBar = ({ toggle, setToggle }) => {
  const [activeItem, setActiveItem] = useState('');
  const [showManageSection, setShowManageSection] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/ppe-violations')) {
      setShowManageSection(true);
      if (path.includes('/workers')) {
        setActiveItem('workers');
      } else if (path.includes('/ppes')) {
        setActiveItem('ppes');
      } else if (path.includes('/contractors')) {
        setActiveItem('contractors');
      } else {
        setActiveItem('ppe-violations');
      }
    } else {
      setShowManageSection(false);
      setActiveItem(path.split('/')[1] || 'dashboard');
    }
  }, [location]);

  const handleClick = (item) => {
    setActiveItem(item);
    if (item === 'ppe-violations') {
      setShowManageSection(true);
    }
    localStorage.setItem('activeItem', item);
  };

  return (
    <div className={`${toggle ? 'w-20' : 'w-64 px-4'} bg-white border-[#D7D7D7] border-r-2 fixed h-full flex flex-col`}>
      <div className='flex justify-center items-center py-2'>
        <img src={toggle ? logoCollapsed : logo} alt="" className={`${toggle ? "" : "me-2"}`} />
        <Bars3Icon className={`size-6 text-[#C4C4C4] cursor-pointer ${toggle ? "hidden" : "block"}`} onClick={() => setToggle(!toggle)} />
      </div>
      <div className="flex-1 ">
        <ul className='mt-3 font-normal'>
          <li
            className={`mb-2 rounded-lg py-2 flex items-center ${activeItem === 'dashboard' ? (toggle ? 'text-blue-500 px-4' : 'bg-[#42A4DF] text-white') : (toggle ? 'px-4' : 'text-[#C4C4C4]')}`}
            onClick={() => handleClick('dashboard')}
            onMouseEnter={() => setHoveredIcon('dashboard')}
            onMouseLeave={() => setHoveredIcon('')}
          >
            <NavLink to="/" className={`flex items-center ${toggle ? "px-2" : "px-4"}`}>
              <HomeIcon className={`size-6 inline-block ${activeItem === 'dashboard' ? (toggle ? 'text-blue-500 ' : 'text-white mr-3 ') : (toggle ? 'text-[#C4C4C4] mr-0' : 'mr-3')}`} />
              <h1 className={` ${activeItem === 'dashboard' ? 'text-white' : 'text-[#626262]'}`}>{!toggle && 'Dashboard'}</h1>
            </NavLink>
            {toggle && hoveredIcon === 'dashboard' && (
              <div className=" bg-[#343434] text-white p-2 rounded-md whitespace-nowrap z-5">
                Dashboard
              </div>
            )}
          </li>
          <li
            className={`mb-2 rounded-lg py-2 flex items-center ${activeItem === 'ppe-violations' || showManageSection ? (toggle ? 'text-blue-500 px-4' : 'bg-[#42A4DF] text-white') : (toggle ? 'px-4' : 'text-[#C4C4C4]')}`}
            onClick={() => handleClick('ppe-violations')}
          >
            <NavLink to="/ppe-violations" className={`flex items-center ${toggle ? "px-2" : "px-4"}`}>
              <img 
            onMouseEnter={() => setHoveredIcon('ppe-violations')}
            onMouseLeave={() => setHoveredIcon('')} src={activeItem === 'ppe-violations' || showManageSection ? (toggle ? handSelect : handWhite) : (toggle ? hand : hand)} alt="" className={`size-6 inline-block ${activeItem === 'ppe-violations' || showManageSection ? (toggle ? 'text-blue-500' : 'text-white mr-3') : (toggle ? 'text-[#C4C4C4] mr-0' : 'mr-3')}`} />
              <h1 className={` ${activeItem === 'ppe-violations' || showManageSection ? 'text-white' : 'text-[#626262]'}`}>{!toggle && 'P.P.E Violations'}</h1>
            </NavLink>
            {toggle && hoveredIcon === 'ppe-violations' && (
              <div className="  bg-[#343434] text-white p-2 rounded-md whitespace-nowrap z-5">
                P.P.E Violations
              </div>
            )}
          </li>
        </ul>
        {showManageSection && (
          <div>
            <h1 className={`${toggle ? "border-b border-[#EBEBEB]" : "px-4"} text-[#B7B7B7] font-medium`}>{!toggle && 'MANAGE'}</h1>
            <ul className='mt-3 font-normal'>
              <li
                className={`mb-2 rounded-lg py-2 flex items-center ${activeItem === 'ppes' ? (toggle ? 'text-blue-500 px-4' : 'bg-[#42A4DF] text-white') : (toggle ? 'px-4' : 'text-[#C4C4C4]')}`}
                onClick={() => handleClick('ppes')}
                
              >
                <NavLink to="/ppe-violations/ppes" className={`flex items-center ${toggle ? "px-2" : "px-4"}`}>
                  <img src={activeItem === 'ppes' ? (toggle ? glovesSelect : glovesWhite) : (toggle ? gloves : gloves)} alt="" className={`size-6 inline-block ${activeItem === 'ppes' ? (toggle ? 'text-blue-500 ' : 'text-white mr-3') : (toggle ? 'text-[#C4C4C4]' : 'mr-3')}`} onMouseEnter={() => setHoveredIcon('ppes')}
                 onMouseLeave={() => setHoveredIcon('')} />
                  <h1 className={` ${activeItem === 'ppes' ? 'text-white' : 'text-[#626262]'}`}>{!toggle && 'P.P.Es'}</h1>
                </NavLink>
                {toggle && hoveredIcon === 'ppes' && (
                  <div className=" bg-[#343434] text-white p-2 rounded-md whitespace-nowrap z-5">
                    P.P.Es
                  </div>
                )}
              </li>
              <li
                className={`mb-2 rounded-lg py-2 flex items-center ${activeItem === 'contractors' ? (toggle ? 'text-blue-500 px-4' : 'bg-[#42A4DF] text-white') : (toggle ? 'px-4' : 'text-[#C4C4C4]')}`}
                onClick={() => handleClick('contractors')}
                onMouseEnter={() => setHoveredIcon('contractors')}
                onMouseLeave={() => setHoveredIcon('')}
              >
                <NavLink to="/ppe-violations/contractors" className={`flex items-center ${toggle ? "px-2" : "px-4"}`}>
                  <BriefcaseIcon className={`size-6 inline-block ${activeItem === 'contractors' ? (toggle ? 'text-blue-500' : 'text-white mr-3') : (toggle ? 'text-[#C4C4C4] mr-0' : 'mr-3')}`} />
                  <h1 className={` ${activeItem === 'contractors' ? 'text-white' : 'text-[#626262]'}`}>{!toggle && 'Contractors'}</h1>
                </NavLink>
                {toggle && hoveredIcon === 'contractors' && (
                  <div className="    bg-[#343434] text-white p-2 rounded-md whitespace-nowrap z-5">
                    Contractors
                  </div>
                )}
              </li>
              <li
                className={`mb-2 rounded-lg py-2 flex items-center ${activeItem === 'workers' ? (toggle ? 'text-blue-500 px-4' : 'bg-[#42A4DF] text-white') : (toggle ? 'px-4' : 'text-[#C4C4C4]')}`}
                onClick={() => handleClick('workers')}
                onMouseEnter={() => setHoveredIcon('workers')}
                onMouseLeave={() => setHoveredIcon('')}
              >
                <NavLink to="/ppe-violations/workers" className={`flex items-center ${toggle ? "px-2" : "px-4"}`}>
                  <UserIcon className={`size-6 inline-block ${activeItem === 'workers' ? (toggle ? 'text-blue-500' : 'text-white mr-3') : (toggle ? 'text-[#C4C4C4] mr-0' : 'mr-3')}`} />
                  <h1 className={` ${activeItem === 'workers' ? 'text-white' : 'text-[#626262]'}`}>{!toggle && 'Workers'}</h1>
                </NavLink>
                {toggle && hoveredIcon === 'workers' && (
                  <h1 className=" flex   bg-[#343434] text-white p-2 rounded-md whitespace-nowrap z-5">
                    Workers
                  </h1>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
      <Footer toggle={toggle}/>
    </div>
  );
};

export default SideBar;
