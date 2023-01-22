import React from "react";

const Text = (props) => {
  return (
    <>
      {props.text || props.children}
    </>
  );
};

export default Text;
