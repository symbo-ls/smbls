import React from "react";
import Svg from "./Svg";

const Icon = (props) => {
 
  return (
    <Svg {...props}>
      {props.name ? <use xlinkHref={props.name} /> : props.children}
    </Svg>
  );
};

export default Icon;
