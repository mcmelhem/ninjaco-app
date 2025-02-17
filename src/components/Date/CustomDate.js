import React from 'react';
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

const CustomInput = ({ value, defaultValue, inputRef, className, placeholder, ...props }) => {
  return <input {...props} defaultValue={defaultValue} ref={inputRef} className={`${className}`}  placeholder={`${placeholder}`}/>;
};

const DatePicker = (props) =>  { 
  var strClassName = props.hasOwnProperty("className") ? props.className : "";
  var strPlaceholder = props.hasOwnProperty("placeholderText") ? props.placeholderText : "";
  return (
    <Flatpickr
      render={
        ({defaultValue, value, ...props}, ref) => {
          return <CustomInput defaultValue={defaultValue} inputRef={ref} className={`${strClassName}`} placeholder= {`${strPlaceholder}`}/>
        }
      }
    />
  )
}

export default DatePicker;