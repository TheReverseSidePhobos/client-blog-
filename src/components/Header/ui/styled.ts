import { Box, Toolbar, styled } from "@mui/material";
import Link from "next/link";

export const BoxHeaderStyled = styled(Box)(() => ({
  flexGrow: 1,
}));

export const ToolbarStyled = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));
export const LinkStyled = styled(Link)(() => ({
  textDecoration: "none",
}));
