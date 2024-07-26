import React, { useEffect, useRef } from 'react';
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";

const popUpData = [
  { img: image1, date: "15/11/2022 10:34", number: "#03", text: "consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscingdo eiusmod tempor incididunt labore" },
  { img: image2, date: "15/11/2022 10:34", number: "#07", text: "consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua adipiscingdo eiusmod tempor incididunt labore" },
];

const Modal = ({ isOpen, onClose, position }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="pt-2 fixed z-20" style={{ top: position.top, left: position.left }}>
      <div
        ref={modalRef}
        className="model-content bg-white p-2 rounded-lg shadow-md max-w-[296px] border border-[#EDEDED] overflow-y-auto"
        style={{ maxHeight: '400px' }} // Adjust the height as needed
      >
        {popUpData.map(item => (
          <div key={item.number} className="flex flex-col gap-y-2">
            <img src={item.img} alt="" className="w-full" />
            <div className='flex justify-between items-center'>
              <h1 className='text-[#929292] text-sm'>Comment</h1>
              <div className="flex items-center gap-x-2">
                <h1 className="text-[#727272] text-xs font-medium">{item.date}</h1>
                <h1 className="font-medium text-sm text-[#313131]">{item.number}</h1>
              </div>
            </div>
            <div className="bg-[#F8F8F8] border border-[#E1E1E1] rounded-lg">
              <p className="text-xs text-[#313131] p-2">{item.text}</p>
            </div>
            <hr className='text-[#D8D8D8] pt-2'/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
