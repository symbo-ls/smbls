import React from "react";
import Box from "../index";
import { transformEmotion, transformClassname} from 'css-in-props' 

const Flex = (props) => {

  const gridProps = {
    display: "grid",
    columns: props.columns,
    rows: props.rows,
    area: props.area,
    template: props.template,
    templateAreas: props.templateAreas,
    gap: props.gap,
    columnGap: props.template,
    rowGap: props.template,
    ...props
  }

  return (
    <Box className={transformEmotion(transformClassname(gridProps))}>
      {props.children}
    </Box>
  );
};

export default Flex;
