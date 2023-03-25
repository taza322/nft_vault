import React from "react";

// MUI css
import { Box } from "@mui/material";

// component
import UploadFile from "../components/UploadFile.js";

// recoil
import { useRecoilValue } from "recoil";
import { securityState } from "../recoil/security.js";

export default function Json() {
  const isSecurity = useRecoilValue(securityState);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
      {isSecurity.isSecurityCode ? (
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
      ) : (
        <>MAIN의 코드를 입력해주세요</>
      )}
    </Box>
  );
}
