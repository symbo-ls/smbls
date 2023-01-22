import React from "react";
import IconText from "./IconText";

const Button = (props) => {
  return (
    <IconText tag="button" {...props}>
      {props.children}
    </IconText>
  );
};
 
export default Button
