import { ColorButtonsProp } from "../model/types";
import { BoxColorStyled } from "./styled";

const ColorButtons = ({
  setSelectedColor,
  selectedColor,
  item,
}: ColorButtonsProp) => (
  <BoxColorStyled
    onClick={() => setSelectedColor(item)}
    selectedColor={selectedColor}
    color={item}
  ></BoxColorStyled>
);

export default ColorButtons;
