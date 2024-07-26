import React from 'react';

const Footer = ({ toggle, setToggle}) => {
  return (
    <div className={`${toggle? "hidden":""} absolute bottom-0 left-0 w-full text-[#939393] text-sm px-4 py-2 border-t border-[#EBEBEB]`}>
      <h1>@ App name 2021</h1>
      <p className='text-[#8A8A8A] text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
    </div>
  );
}

export default Footer;
