import React from "react";

// Image
import afunLogo from "../img/afun_Logo.png";

// MUI css
import { Box, Typography } from "@mui/material";

export default function Done() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: "10px",
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "5%",
        }}
      > */}
      <Typography>NFT 민팅이 완료 되었습니다.</Typography>
      <Typography>잠시 후 Klip에서 확인해주세요.</Typography>
      {/* </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "5%",
        }}
      >
        <img src={afunLogo} width="200px" height="auto" alt="logo" />
      </Box>
    </Box>
  );
}
