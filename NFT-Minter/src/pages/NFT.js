import React from "react";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { securityState } from "../recoil/security.js";

// component
import BeforeMint from "../components/BeforeMint.js";
import MintButton from "../components/MintButton.js";

export default function NFT() {
  const isReady = useRecoilValue(securityState);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {isReady.isSecurityCode ? (
          <>
            <Box sx={{ mb: "10%" }}>파일이 민팅할 준비가 되었습니다!</Box>
            <BeforeMint />
            <Box sx={{ display: "flex", justifyContent: "center", mt: "10%" }}>
              <MintButton />
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ mb: "10%" }}>MAIN의 코드를 입력해주세요</Box>
          </>
        )}
      </Box>
    </Box>
  );
}
