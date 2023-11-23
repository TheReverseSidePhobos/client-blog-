import { BoxColorStyled } from "@/app/personal/styled";
import React from "react";

const ColorButtons = ({ setSelectedColor, selectedColor, item }) => {
  return (
    <BoxColorStyled
      onClick={() => setSelectedColor(item)}
      selectedColor={selectedColor}
      color={item}
    ></BoxColorStyled>
  );
};

export default ColorButtons;
