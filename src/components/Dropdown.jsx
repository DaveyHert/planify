import { useState } from "react";
import "./Dropdown.css";

const DropDown = ({ options, category, saveCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCategory = (option) => {
    saveCategory(option);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className='dropdown'>
        <div
          className='dropdown-trigger'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <input
            type='text'
            readOnly
            tabIndex='0'
            value={category}
            placeholder='Select category'
          />
          <span className={isOpen ? "active" : ""}>{">"}</span>
        </div>

        {isOpen && (
          <ul className='dropdown-items-wrapper'>
            {options.map((option, indx) => (
              <li key={indx} onClick={() => handleSelectCategory(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropDown;
