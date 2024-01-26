import { styled, Button, Box } from "@mui/material";

export const BoxHideenStyled = styled(Box)(() => ({
  width: "0",
  opacity: 0,
  height: "0",
  lineHeight: 0,
  padding: 0,
  margin: 0,
}));

export const ButtonDownloadStyled = styled(Button)(() => ({
  width: "200px",
  "&:hover": {
    cursor: "pointer",
  },
}));
