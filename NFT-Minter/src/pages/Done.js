import React from "react";

// Image
import kilpLogo from "../img/klip_Logo.png";

// MUI css
import { Box, Typography } from "@mui/material";

// recoil
import { useSetRecoilState } from "recoil";
import { guideState } from "../recoil/guide.js";

export default function Done() {
  // 스낵바가 필요할까?
  const setGuide = useSetRecoilState(guideState);
  const handleKlip = () => {
    setGuide({ message: "이거 되니?" });
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
      <Typography>NFT 민팅이 완료 되었습니다.</Typography>
      <Typography>잠시 후 Klip에서 확인해주세요.</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "5%",
        }}
      >
        <img
          src={kilpLogo}
          width="200px"
          height="auto"
          style={{ cursor: "pointer" }}
          alt="logo"
          onMouseEnter={handleKlip}
        />
      </Box>
    </Box>
  );
}
