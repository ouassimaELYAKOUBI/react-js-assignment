import React from 'react';
import { ArrowRightStartOnRectangleIcon, Bars3Icon, ChevronDownIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import fontSize from '../assets/fontSize.svg';
import moon from '../assets/moon.svg';
import notification from '../assets/notification.svg';
import english from '../assets/english.svg';
import Ellipse from '../assets/Ellipse.svg';
import france from '../assets/france.svg';
import spain from '../assets/spain.svg';
import germany from '../assets/germany.svg';
import nederlands from '../assets/nederlands.svg';

const NavBar = ({ toggle, setToggle,sidebarToggle }) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState({ src: english, text: 'English (EN)' });

  const headerIcons = [
    { src: fontSize, alt: 'Font Size' },
    { src: moon, alt: 'Night Mode' },
    { src: notification, alt: 'Notifications' },
    { src: selectedLanguage.src, alt: 'Language', isLanguageIcon: true },
  ];

  const languages = [
    { src: english, alt: 'eng', text: 'English (EN)' },
    { src: france, alt: 'fr', text: 'Français (FR)' },
    { src: nederlands, alt: 'nl', text: 'Nederlands (NL)' },
    { src: spain, alt: 'es', text: 'Español (ES)' },
    { src: germany, alt: 'de', text: 'Deutsch (DE)' },
  ];

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className={`bg-white px-4 py-3 flex justify-between border-b-2 border-[#D7D7D7] transition-all `}>
      <div className="flex items-center text-xl">
         <Bars3Icon className={` ${toggle? "block":"hidden"}  size-6 text-[#C4C4C4] me-4 cursor-pointer`} onClick={() => setToggle(!toggle)}/>
        <span className='font-medium text-[#313131]'>Overview</span>
      </div>
      <div className='flex items-center gap-x-8'>
        <div className='flex items-center gap-x-4'>
          {headerIcons.map((icon) => (
            <div key={icon.alt} className="relative">
              <img
                src={icon.src}
                alt={icon.alt}
                className="rounded-full cursor-pointer"
                onClick={icon.isLanguageIcon ? toggleLanguageDropdown : null}
              />
              {icon.isLanguageIcon && isLanguageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#D7D7D7] rounded-lg shadow-sm z-10">
                  <ul>
                    {languages.map((lang) => (
                      <li
                        key={lang.alt}
                        className={`p-2 cursor-pointer hover:text-black ${selectedLanguage.text === lang.text ? 'text-black' : 'text-[#ADADAD]'}`}
                        onClick={() => handleLanguageSelect(lang)}
                      >
                        <img
                          src={lang.src}
                          alt={lang.alt}
                          className={`inline-block mr-2 ${selectedLanguage.text === lang.text ? 'opacity-100' : 'opacity-75'}`}
                        />
                        {lang.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-x-4 relative">
          <img src={Ellipse} alt="" className="" />
          <h1 className='font-medium text-[#7A7A7A]'>BESIX Group</h1>
          <ChevronDownIcon className='w-5 h-5 text-[#7A7A7A] cursor-pointer' onClick={toggleProfileDropdown} />
          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-[200px] bg-white border border-[#D7D7D7] rounded-lg shadow-sm z-10">
              <ul className='py-4'>
                <li className="pl-4 pb-2 cursor-pointer text-black font-medium">BESIX Group
                <h1 className='text-[#797979] font-normal pb-2'>besix.group@besix.be</h1></li>
                <hr className="py-1 border-1 border-[#EBEBEB]"/>
                <li className="pl-4 pt-2 cursor-pointer text-black"><Cog8ToothIcon className='text-[#797979] inline-block w-6 h-6 mr-2'/>Profile settings</li>
                <li className="pl-4 py-2 pb-3 cursor-pointer text-black"><ShieldExclamationIcon className='text-[#797979] inline-block w-6 h-6 mr-2'/>Our policies</li>
                <hr className="py-2 border-1 border-[#EBEBEB]"/>
                <li className="pl-4  cursor-pointer text-black"><ArrowRightStartOnRectangleIcon className='text-[#797979] inline-block w-6 h-6 mr-2'/>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
