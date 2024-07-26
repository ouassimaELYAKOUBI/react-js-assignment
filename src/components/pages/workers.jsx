import React, { useState, useEffect } from 'react';
import { Cog8ToothIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import workersData from '../../data/workersData.json';
import protectiveGlovesImg from '../../assets/protective_gloves.svg';
import safetyGlassesImg from '../../assets/safety_glasses.svg';
import earProtectionImg from '../../assets/ear_protection.svg';
import maskProtectionImg from '../../assets/mask_protection.svg';
import kneePadsImg from '../../assets/knee_pads.svg';
import safetyShoesImg from '../../assets/safety_shoes.svg';
import coverallImg from '../../assets/coverall.svg';
import hiVisJacketImg from '../../assets/hi_vis_jacket.svg';
import safetyHarnessImg from '../../assets/safety_harness.svg';
import faceShieldImg from '../../assets/face_shield1.svg';
import gogglesImg from '../../assets/hard_hat.svg';
import weldingHelmetImg from '../../assets/welding_helmet.svg';
import photoProfileImg from '../../assets/photo_profile.svg';
import img from '../../assets/img.svg';

import { useOutletContext } from 'react-router-dom';
import CustomDatePicker from '../CustomDatePicker';
import '../../customDatePicker.css'; // Import your custom CSS
import Modal from '../Modal'; // Import Modal

const PPE_ICONS = {
  Protective_gloves: protectiveGlovesImg,
  Safety_glasses: safetyGlassesImg,
  Ear_protection: earProtectionImg,
  Mask_protection: maskProtectionImg,
  Knee_pads: kneePadsImg,
  Safety_shoes: safetyShoesImg,
  Coverall: coverallImg,
  Hi_Vis_jacket: hiVisJacketImg,
  Safety_harness: safetyHarnessImg,
  Face_shield: faceShieldImg,
  Hard_hat: gogglesImg,
  Welding_helmet: weldingHelmetImg
};

const Workers = ({ toggle, setToggle }) => {
  const { selectedSite } = useOutletContext();
  const [selectedPPE, setSelectedPPE] = useState(Object.keys(PPE_ICONS));
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedContractor, setSelectedContractor] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleCheckboxChange = (ppe) => {
    setSelectedPPE(prevState =>
      prevState.includes(ppe)
        ? prevState.filter(item => item !== ppe)
        : [...prevState, ppe]
    );
  };

  useEffect(() => {
    if (selectedPPE.length === Object.keys(PPE_ICONS).length) {
      setToggle(true); // Collapse the sidebar
    }
  }, [selectedPPE, setToggle]);

  const filteredWorkers = workersData.filter(worker => 
    (selectedSite === "All" || worker.site === selectedSite) &&
    (searchTerm === '' || worker.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!startDate || !endDate || (new Date(worker.date) >= startDate && new Date(worker.date) <= endDate)) &&
    (selectedContractor === 'All' || worker.contractor === selectedContractor)
  );

  const handlePPEClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const modalWidth = 296; // or the width of your modal in pixels
    
    setModalPosition({
      top: rect.bottom, // Vertical position remains the same
      left: rect.left + (rect.width / 2) - (modalWidth / 2) // Center horizontally
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-[#F2F2F2] px-12 py-10 ">
      <div className="flex items-start justify-between pt-6 pb-4">
        <div className="bg-[#F2F2F2]">
          <h1 className="mb-2 text-lg font-medium">P.P.E Violations Table</h1>
        </div>
        <div className="flex justify-end items-end gap-x-4">
          <div className="flex items-center justify-start pl-2 py-1 gap-x-2 w-96 border-2 bg-white border-[#D8D8D8] rounded-sm">
            <MagnifyingGlassIcon className="h-6 w-6 text-[#C8C8C8]" />
            <input
              type="text"
              placeholder="Search workers ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm text-[#C8C8C8] flex-grow"
            />
          </div>
          <div className="flex items-center">
            <CustomDatePicker className="border-2 border-[#D8D8D8] rounded-sm" />
          </div>
          <select
            value={selectedContractor}
            onChange={(e) => setSelectedContractor(e.target.value)}
            className="pl-2 pr-6 py-2 border-2 border-[#D8D8D8] rounded-sm text-sm text-[#909090]"
          >
            <option value="All">All Contractors</option>
            {['Contractor A', 'Contractor B', 'Contractor C'].map(contractor => (
              <option key={contractor} value={contractor}>{contractor}</option>
            ))}
          </select>
          <div className="bg-white border-2 border-[#D8D8D8] px-2 py-1">
            <ArrowsPointingOutIcon className="w-6 h-6 cursor-pointer text-[#C4C4C4]" onClick={() => console.log('Resize icon clicked')} />
          </div>
        </div>
      </div>
      <table className="table-auto w-full border-collapse bg-white rounded-lg border-2 border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 ">
              <Cog8ToothIcon onClick={() => setDropdownVisible(!dropdownVisible)} className='text-[#DCDCDC] inline-block w-6 h-6 cursor-pointer'/>
              {dropdownVisible && (
                <div className="absolute bg-white border mt-2 shadow-lg z-10">
                  <div className="flex flex-col gap-4 p-4 w-max">
                    <label className='text-[#989797] text-sm font-medium'>Select Columns to display</label>
                    {Object.keys(PPE_ICONS).map(ppe => (
                      <label key={ppe} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedPPE.includes(ppe)}
                          onChange={() => handleCheckboxChange(ppe)} className='w-3.5 h-3.5'
                        />
                        <span className="ml-2 text-[#313131] font-medium text-sm">{ppe.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </th>
            <th className="border border-gray-200 p-2 text-[#737373] font-medium">Workers</th>
            {selectedPPE.map(ppe => (
              <th key={ppe} className="p-2">
                <div className='flex items-center justify-center bg-[#F5F5F5] rounded-lg w-[80px] h-[86.81px]'>
                  <img src={PPE_ICONS[ppe]} alt={ppe} />
                </div>
                <h1 className="font-normal text-[#737373] text-xs">{ppe.replace('_', ' ')}</h1>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map((worker, index) => (
            <tr key={worker.index}>
              <td className="border border-gray-200 p-2 text-center">{index + 1}</td>
              <td className="border border-gray-200 p-2">
                <div className="flex items-center gap-x-2 w-max">
                  <img src={photoProfileImg} alt={worker.name} className="" />
                  <div className='flex flex-col'>
                    <span className="text-xs font-normal text-[#484848]">{worker.name}</span>
                    <span className='text-[#909090] text-xs font-normal'>{worker.role}</span>
                  </div>
                  <img src={img} alt={worker.name} className=""/>
                </div>
              </td>
              {selectedPPE.map(ppe => (
                <td key={ppe} className="border-y-2 border-gray-200 px-4 py-2 text-center ">
                  {worker.ppe_violations[ppe] !== '-' ? (
                    <span
                      className={`cursor-pointer rounded-full inline-flex items-center justify-center text-xs text-[#313131] font-medium ${worker.ppe_violations[ppe] > 9 ? 'bg-red-400 text-white' : 'bg-yellow-400'}`}
                      style={{ width: '24px', height: '24px' }}
                      onClick={handlePPEClick}
                    >
                      {worker.ppe_violations[ppe]}
                    </span>
                  ) : (
                    <span>{worker.ppe_violations[ppe]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={modalOpen} onClose={handleCloseModal} position={modalPosition} />
    
    </div>
  );
};

export default Workers;
