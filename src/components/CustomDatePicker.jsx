import React, { useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../customDatePicker.css';

const CustomDatePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isOpen, setIsOpen] = useState(false);
  const [viewedDate, setViewedDate] = useState(new Date());

  const handleApply = () => {
    console.log('Applied date range:', dateRange);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setDateRange([null, null]);
    setIsOpen(false);
  };

  const CustomInput = ({ value, onClick }) => (
    <button className="custom-date-picker text-[#313131] text-sm" onClick={onClick}>
      {value || 'Select Date Range'}
    </button>
  );

  const CustomCalendarContainer = ({ children }) => (
    <div className="custom-calendar-container">
      <label className="custom-date-picker-label text-[#989797] text-sm  font-medium px-4 ">
        Date Range
      </label>
      <div className="custom-date-picker-dropdown text-[#313131] text-sm px-4 py-2">
        <select >
          <option value="option1" class>Custom</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <CalendarContainer className="react-datepicker">
        <div style={{ position: 'relative' }}>{children}</div>
        <div className="custom-date-picker-buttons">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="apply" onClick={handleApply}>
            Apply
          </button>
        </div>
      </CalendarContainer>
    </div>
  );

  const dayClassName = (date) => {
    const viewedMonth = viewedDate.getMonth();
    const dateMonth = date.getMonth();
    return dateMonth === viewedMonth
      ? 'react-datepicker__day--in-month'
      : 'react-datepicker__day--outside-month';
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(update) => setDateRange(update)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      isClearable
      dateFormat="dd/MM/yyyy"
      placeholderText="Select Date Range"
      customInput={<CustomInput />}
      calendarContainer={CustomCalendarContainer}
      open={isOpen}
      onClickOutside={() => setIsOpen(false)}
      onInputClick={() => setIsOpen(true)}
      dayClassName={dayClassName}
      onMonthChange={(date) => setViewedDate(date)}
      onYearChange={(date) => setViewedDate(date)}
      wrapperClassName="custom-date-picker-wrapper"
    />
  );
};

export default CustomDatePicker;
