import React from "react";
import Box from "../index";

const Img = (props) => {
  const defaultConf = {
    src: props.src,
    alt: props.alt,
    title: props.title || props.alt,
    ...props,
  };
  return (
    <Box tag='img' {...defaultConf}>
    </Box>
  );
};

export default Img;