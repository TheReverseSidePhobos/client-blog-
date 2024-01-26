import React, { FC, ReactElement } from "react";
import { Container, Grid, Typography } from "@mui/material";
import intl from "react-intl-universal";
import { BoxFooterStyled } from "./styled";
import { NOW } from "@/app/constants";

export const Footer: FC = (): ReactElement => {
  return (
    <BoxFooterStyled bgcolor="primary.main" mt={2}>
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="body1">
              {intl.get("BLOG")} {NOW.getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </BoxFooterStyled>
  );
};

export default Footer;
