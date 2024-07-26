// src/components/pages/ppeViolations.js
import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const PPEViolations = () => {
  const [selectedSite, setSelectedSite] = useState('All');

  const sites = [
    { text: "All" },
    { text: "Site 1" },
    { text: "Site 2" },
    { text: "Site 3" },
  ];
  useEffect(() => {
    console.log('Selected site:', selectedSite); // Debugging log
  }, [selectedSite]);

  return (
    <div >
      <div className="bg-white flex items-start justify-start gap-x-2 border-b-2 border-[#D7D7D7] ">
        <button className='border-r-2 border-[#D7D7D7] text-[#ADADAD] font-medium bg-[#FCFCFC] px-8 py-3'>SITES</button>
        {sites.map((site) => (
          <button
              key={site.text}
              className={`text-[#ADADAD] font-medium hover:text-[#42A4DF] px-4 py-3 bg-white ${selectedSite === site.text ? "selected-site" : ""}`}
              onClick={() => setSelectedSite(site.text)}
            >
              {site.text}
            </button>

        ))}
      </div>
      
      <Outlet context={{ selectedSite }} />
    </div>
  );
}

export default PPEViolations;
