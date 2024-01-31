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
  width: "100%",
  "&:hover": {
    cursor: "pointer",
  },
}));

export const BoxFileNameStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(1, 0, 1, 0),
}));

export const BoxDropzoneStyled = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,

  display: "flex",
  justifyContent: "center",
}));
