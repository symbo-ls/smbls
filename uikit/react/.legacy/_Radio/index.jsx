import React from "react";
import Box from "../../index";
import Text from "../Text"
import "./style.css"

const Radio = (props) => {
  const defaultConf = {
    name: props.name,
    value: props.value,
    checked: props.checked,
    ...props,
  };
  
  return (
    <Box className="box-radio">  
        <Box id={props.id} tag='input' type='radio' {...defaultConf} />
        <label htmlFor={props.id}>{props.label}</label>
    </Box>
  );
};

export default Radio;