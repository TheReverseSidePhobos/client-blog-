import { IconButton, styled } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
export const IconButtonStyled = styled(IconButton)(() => ({
  marginRight: "16px",
}));
export const LanguageIconStyled = styled(LanguageIcon)(() => ({
  "&:hover": {
    cursor: "pointer",
  },
}));
