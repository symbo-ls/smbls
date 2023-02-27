
import React from "react";
import { transformEmotion, transformClassname} from 'css-in-props' 

export const Box = (props) => {
  // return (
  //   <div className={transformEmotion(transformClassname(props))}>
  //     {props.children}
  //   </div>
  // )
  const { tag, className } = props
  const propsClass = transformEmotion(transformClassname(props)) 
  const children = props.text ? props.text : props.children;
  
  return React.createElement(
    tag || "div",
    {
      className: `${className ?? ""} ${propsClass}` ,
    },
    children
  )
}
