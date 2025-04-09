import React, { useState, useRef, useEffect } from "react";

import "./CustomDate.css";

const CustomDate = ({ value, onChange, placeholder = "Select date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const datePickerRef = useRef(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateSelect = (date) => {
    if (date < today) return;

    const [hours, minutes] = selectedTime.split(":");
    date.setHours(parseInt(hours), parseInt(minutes), 0);
    setSelectedDate(date);
    onChange(date);
    setIsOpen(false);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    if (selectedDate) {
      const [hours, minutes] = e.target.value.split(":");
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours), parseInt(minutes), 0);
      onChange(newDate);
    }
  };

  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })} ${selectedTime}`;
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="custom-date-picker" ref={datePickerRef}>
      <div
        className="date-input"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        {selectedDate ? formatDate(selectedDate) : placeholder}
      </div>

      {isOpen && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button onClick={handlePrevMonth}>‹</button>
            <span>
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button onClick={handleNextMonth}>›</button>
          </div>

          <div className="calendar-grid">
            {weekDays.map((day) => (
              <div key={day} className="week-day">
                {day}
              </div>
            ))}

            {days.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${
                  day &&
                  selectedDate &&
                  day.toDateString() === selectedDate.toDateString()
                    ? "selected"
                    : ""
                } ${
                  day && day.toDateString() === today.toDateString()
                    ? "today"
                    : ""
                } ${!day ? "empty" : ""} ${
                  day && day < today ? "disabled" : ""
                }`}
                onClick={() => day && handleDateSelect(day)}
              >
                {day ? day.getDate() : ""}
              </div>
            ))}
          </div>

          <div className="time-picker">
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="time-input"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDate;
