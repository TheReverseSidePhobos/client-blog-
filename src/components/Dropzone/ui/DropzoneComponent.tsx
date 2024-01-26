import React from "react";
import { BoxHideenStyled, ButtonDownloadStyled } from "./styled";
import intl from "react-intl-universal";
import { Box } from "@mui/material";
import { DropzoneComponentProp } from "../model/types";

const DropzoneComponent = ({
  filePickerRef,
  handleChangeFile,
  handleDownloadClick,
}: DropzoneComponentProp) => (
  <Box display="flex" justifyContent="center">
    <BoxHideenStyled>
      <input
        ref={filePickerRef}
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
      />
    </BoxHideenStyled>
    <ButtonDownloadStyled onClick={handleDownloadClick}>
      {intl.get("DOWNLOAD_FILE")}
    </ButtonDownloadStyled>
  </Box>
);

export default DropzoneComponent;
