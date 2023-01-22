import React from "react";
import Box from "../index";
import { transformEmotion, transformClassname} from 'css-in-props' 

const Flex = (props) => {

  const flexProps = {
    display: 'flex',
    flexFlow: props.flexFlow,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    ...props
  }

  return (
    <Box tag={props.tag} className={transformEmotion(transformClassname(flexProps))}>
      {props.children}
    </Box>
  );
};

export default Flex;
