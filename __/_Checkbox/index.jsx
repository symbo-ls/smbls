import React from "react";
import Box from "../../index";
import './style.css'

const Checkbox = (props) => {
  const defaultConf = {
    name: props.name,
    value: props.value,
    checked: props.checked,
    ...props,
  };
  
  return (
    <Box className="box-checkbox">  
        <Box id={props.id} tag='input' type='checkbox' {...defaultConf} />
        <label htmlFor={props.id}>{props.label}</label>
    </Box>
  );
};

export default Checkbox;