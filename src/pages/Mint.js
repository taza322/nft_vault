import React from "react";

// MUI css
import { Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

// component
import UploadFile from "../components/UploadFile.js";
import BeforeMint from "../components/BeforeMint.js";
import MintButton from "../components/MintButton.js";

// recoil
import { useRecoilValue, useResetRecoilState } from "recoil";
import { imageState } from "../recoil/image.js";
import { fileNumState } from "../recoil/files.js";

export default function Mint() {
  const { prevImg } = useRecoilValue(imageState);
  const { count } = useRecoilValue(fileNumState);
  const resetFileState = useResetRecoilState(fileNumState);

  const handleReset = () => {
    resetFileState();
  };

  return (
    <>
      <RefreshIcon
        fontSize="large"
        color="success"
        onClick={handleReset}
        sx={{ cursor: "pointer" }}
      />
      {count === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <UploadFile />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mb: "10%" }}>파일을 민팅할 준비가 되었습니다!</Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={prevImg}
                alt="select img"
                style={{ width: "50%", height: "auto" }}
              />
            </Box>
            <BeforeMint />
            <Box sx={{ display: "flex", justifyContent: "center", mt: "10%" }}>
              <MintButton />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
