import React from "react";

// Image
import kilpLogo from "../img/klip_Logo.png";

// MUI css
import { Box, Typography } from "@mui/material";

export default function Done() {
  const handleKlip = () => {
    window.location.href = "kakaotalk://";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: "10px",
      }}
    >
      <Typography sx={{ margin: "0 auto" }}>
        NFT 민팅이 완료 되었습니다.
      </Typography>
      <Typography sx={{ margin: "0 auto" }}>
        아래 이미지를 눌러 Klip에서 확인해주세요.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={kilpLogo}
          width="200px"
          height="auto"
          style={{ cursor: "pointer" }}
          alt="logo"
          onClick={handleKlip}
        />
      </Box>
    </Box>
  );
}
