import React, { useCallback, useState } from "react";
import {
  BoxDropzoneStyled,
  BoxFileNameStyled,
  BoxHideenStyled,
  ButtonDownloadStyled,
} from "./styled";
import intl from "react-intl-universal";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DropzoneComponentProp } from "../model/types";
import { useDropzone } from "react-dropzone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DropzoneComponent = ({
  dropzoneFile,
  setDropzoneFile,
}: DropzoneComponentProp) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setDropzoneFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
  });
  const handleDeleteFile = () => setDropzoneFile(null);
  return (
    <Box width="50%">
      <BoxDropzoneStyled {...getRootProps()}>
        <input accept="image/*" {...getInputProps()} />
        {isDragActive ? (
          <Typography>{intl.get("DROP_FILE_HERE")}</Typography>
        ) : (
          <ButtonDownloadStyled>
            {intl.get("DOWNLOAD_FILE")}
          </ButtonDownloadStyled>
        )}
      </BoxDropzoneStyled>
      <BoxFileNameStyled>
        {dropzoneFile && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography pl={2}>{dropzoneFile.name}</Typography>
            <IconButton onClick={handleDeleteFile}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        )}
      </BoxFileNameStyled>
    </Box>
  );
};

export default DropzoneComponent;
