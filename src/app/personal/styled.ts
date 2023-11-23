import { Box, styled } from "@mui/material";

interface BoxColorStyledProp {
  selectedColor?: string;
  color?: string;
}
export const BoxColorStyled = styled(Box)(
  ({ selectedColor, color }: BoxColorStyledProp) => ({
    width: "20px",
    margin: "8px",
    height: "20px",
    border: selectedColor === color ? "4px solid black" : "",
    backgroundColor: `${color}`,
    "&:hover": {
      opacity: 0.8,
      border: "2px solid black",
    },
  })
);
