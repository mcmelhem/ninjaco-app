import React, { useState, useRef } from 'react';
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { format } from 'date-fns';  // Import the `date-fns` library for date formatting
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const CustomInput = ({ value, defaultValue, inputRef, className, placeholder, onClear, ...props }) => {
  return (
    <div className="d-flex" style={{ position: 'relative' }}>
      <input
        {...props}
        defaultValue={defaultValue}
        ref={inputRef}
        className={className}
        placeholder={placeholder}
      />
     
      {value && (
        <button
          type="button"
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      )}
    </div>
  );
};

const DatePicker = (props) => {
  const { className = "", placeholderText = "", showTime = false, showDate = true, onChange, value, ...otherProps } = props;

  let dateFormat = "Y-m-d";

  // Adjust the format based on time/date options
  if (!showTime && showDate) {
    dateFormat = "Y-m-d"; // Show both date and time
  } else if (showTime && !showDate) {
    dateFormat = "H:i"; // Show only time
  }

  const [selectedDate, setSelectedDate] = useState(value || "");
  const fp = useRef(null);

  const handleDateChange = (date) => {
    // Format the date based on showDate/showTime options
    let formattedDate = date;
    if (showDate && showTime) {
      formattedDate = format(date[0], "yyyy-MM-dd HH:mm");
    } else if (showDate) {
      formattedDate = format(date[0], "yyyy-MM-dd");
    } else if (showTime) {
      formattedDate = format(date[0], "HH:mm a");
    }

    setSelectedDate(formattedDate);

    if (onChange) {
      onChange(formattedDate);
    }
  };

  const handleClear = () => {
    setSelectedDate(""); // Clear the date value
    if (onChange) {
      onChange(""); // Propagate the clear to parent if needed
    }
  };

  return (
    <div className="d-flex">
      <Flatpickr
        value={selectedDate}
        ref={fp}
        options={{
          dateFormat: dateFormat,
          enableTime: showTime,
          noCalendar: !showDate,
          time_24hr: false,
        }}
        onChange={handleDateChange}
        render={({ defaultValue, value, ...props }, ref) => {
          return (
            <CustomInput
              defaultValue={defaultValue}
              inputRef={ref}
              className={className}
              placeholder={placeholderText}
              value={selectedDate}
              onClear={handleClear} // Pass the clear handler to the input component
              {...props}
            />
          );
        }}
        {...otherProps}
      />
    </div>
  );
};

export default DatePicker;
