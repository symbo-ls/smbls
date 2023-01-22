import React from "react";
import Flex from "./Flex";
import Icon from "./Icon";
import Text from "./Text";

const IconText = (props) => {

  return (
    <Flex tag={props.tag} alignItems="center" {...props}>
      <Icon name={props.name} {...props.icon} />
      <Text text={props.text} />
      {props.children}
    </Flex>
  );
};

export default IconText;
