import React, { useState, useRef, useEffect } from "react";
import "./CustomDatePicker.css";

const CustomDatePicker = ({
  selectedDate,
  onDateChange,
  placeholder = "Select date",
}) => {
  // states
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(selectedDate || null);
  const wrapperRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  //global mousedown listener to hide calendar if click is not inside our picker (wrapperRef).
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // Cleanup on unmount.
  }, []);

  // Helpers
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentMonth((prev) => {
      const year = prev.getFullYear();
      const month = prev.getMonth();
      return new Date(year, month - 1, 1);
    });
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentMonth((prev) => {
      const year = prev.getFullYear();
      const month = prev.getMonth();
      return new Date(year, month + 1, 1);
    });
  };

  const handleDateClick = (day) => {
    setDate(day);
    onDateChange && onDateChange(day);
    setShowCalendar(false);
  };

  const formatDate = (d) => {
    if (!d) return "";

    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  // Render
  const renderHeader = () => (
    <div className='cdp-header'>
      <button onClick={handlePrevMonth} className='cdp-nav'>
        ‹
      </button>
      <div className='cdp-month'>
        {currentMonth.toLocaleString("default", { month: "long" })}{" "}
        {currentMonth.getFullYear()}
      </div>
      <button onClick={handleNextMonth} className='cdp-nav'>
        ›
      </button>
    </div>
  );

  const renderDays = () => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className='cdp-days-row'>
        {weekDays.map((d) => (
          <div key={d} className='cdp-day-name'>
            {d}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const startDay = getFirstDayOfWeek(year, month);
    const cells = [];

    // Blank cells
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`blank-${i}`} className='cdp-cell blank'></div>);
    }

    // Date cells
    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      const isSelected =
        date && cellDate.toDateString() === date.toDateString();
      cells.push(
        <div
          key={day}
          className={`cdp-cell ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(cellDate)}
        >
          {day}
        </div>
      );
    }

    return <div className='cdp-cells-grid'>{cells}</div>;
  };

  return (
    <div className='cdp-wrapper' ref={wrapperRef}>
      <input
        type='text'
        readOnly
        className='cdp-input'
        placeholder={placeholder}
        value={formatDate(date)}
        onClick={() => setShowCalendar(!showCalendar)}
      />
      {showCalendar && (
        <div className='cdp-calendar'>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
