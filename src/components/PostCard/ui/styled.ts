import { Card, styled } from "@mui/material";

interface CardStyledStyledProp {
  postColor?: string;
}
export const CardStyled = styled(Card)(
  ({ postColor }: CardStyledStyledProp) => ({
    backgroundColor: postColor,
    marginTop: "16px",
  })
);
