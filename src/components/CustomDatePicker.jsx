import React, { useState, useRef, useEffect } from "react";
import "./CustomDatePicker.css";

export default function CustomDatePicker({
  selectedDate,
  onDateChange,
  placeholder = "Select date",
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [date, setDate] = useState(selectedDate || null);
  const [time, setTime] = useState("12:00");
  const wrapperRef = useRef(null);
  const today = new Date();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = (e) => {
    e.preventDefault();
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    if (prevMonth < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const combinedDate = new Date(day);
    const [hours, minutes] = time.split(":");
    combinedDate.setHours(parseInt(hours));
    combinedDate.setMinutes(parseInt(minutes));
    setDate(combinedDate);
    onDateChange && onDateChange(combinedDate);
    setShowCalendar(false);
  };

  const handleTimeChange = (e) => {
    e.preventDefault();
    const newTime = e.target.value;
    setTime(newTime);
    if (date) {
      const newDate = new Date(date);
      const [hours, minutes] = newTime.split(":");
      newDate.setHours(parseInt(hours));
      newDate.setMinutes(parseInt(minutes));
      setDate(newDate);
      onDateChange && onDateChange(newDate);
    }
  };

  const formatDate = (d) => {
    if (!d) return "";
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd} ${hh}:${mins}`;
  };

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

    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`blank-${i}`} className='cdp-cell blank'></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      const isToday = cellDate.toDateString() === today.toDateString();
      const isSelected =
        date && cellDate.toDateString() === date.toDateString();
      const isPast =
        cellDate <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

      cells.push(
        <div
          key={day}
          className={`cdp-cell 
            ${isToday ? "today" : ""} 
            ${isSelected ? "selected" : ""} 
            ${isPast ? "disabled" : ""}`}
          onClick={() => !isPast && handleDateClick(cellDate)}
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
          <div className='cdp-time-picker'>
            <label htmlFor='cdp-time'>Time: </label>
            <input
              id='cdp-time'
              type='time'
              className='cdp-time-input'
              value={time}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
