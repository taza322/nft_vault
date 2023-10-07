import React from "react";

// MUI css
import { Box } from "@mui/material";

// component
import NFTs from "../components/NFTs.js";

export default function NFT() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <NFTs />
      </Box>
    </Box>
  );
}
