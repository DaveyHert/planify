import { useState, useEffect, useRef } from "react";
import "./CustomSelectDropdown.css";

const DropDown = ({ options, onOptChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option) => {
    setOption(option.label);
    onOptChange(option.value);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="dropdown" ref={dropdownRef}>
        <div
          className="dropdown-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <input
            type="text"
            readOnly
            tabIndex="0"
            value={option}
            placeholder="Select category"
          />
          <span className={isOpen ? "active" : ""}>{">"}</span>
        </div>

        {isOpen && (
          <ul className="dropdown-items-wrapper">
            {options.map((item) => (
              <li key={item.value} onClick={() => handleSelectOption(item)}>
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropDown;
