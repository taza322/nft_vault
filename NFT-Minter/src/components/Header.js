import React, { useEffect, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// Images
import headerMMG from "../img/milal_logo.png";

import { REACT_APP_RPC_URL } from "../utils/config.js";

// recoil
import { useResetRecoilState, useRecoilState } from "recoil";
import { nftMetaState } from "../recoil/nftMeta.js";
import { addressState } from "../recoil/addressForMint.js";
import { loadingState } from "../recoil/loading.js";
import { tabSelectState } from "../recoil/tabSelect.js";
import { networkState } from "../recoil/network.js";
import { attributesState } from "../recoil/attributes.js";
import { securityState } from "../recoil/security.js";
import { guideState } from "../recoil/guide.js";
import { successState } from "../recoil/success.js";

export default function Header() {
  // state reset
  const resetNftMeta = useResetRecoilState(nftMetaState);
  const resetAddress = useResetRecoilState(addressState);
  const resetTabSelect = useResetRecoilState(tabSelectState);
  const resetLoading = useResetRecoilState(loadingState);
  const resetAttributes = useResetRecoilState(attributesState);
  const resetSecurity = useResetRecoilState(securityState);
  const resetGuide = useResetRecoilState(guideState);
  const resetSuccess = useResetRecoilState(successState);

  const reset = () => {
    resetNftMeta();
    resetAddress();
    resetTabSelect();
    resetLoading();
    resetAttributes();
    resetSecurity();
    resetGuide();
    resetSuccess();
    window.location.replace("/");
  };

  const [whichNet, setWhichNEt] = useRecoilState(networkState);

  const handleNetwork = useCallback(async () => {
    let network = REACT_APP_RPC_URL;
    network.toLowerCase();

    if (network.indexOf("polygon") !== -1 && network[8] === "p") {
      setWhichNEt({ network: "Polygon" });
    } else if (network.indexOf("main") !== -1 && network[8] === "m") {
      setWhichNEt({ network: "Ethereum" });
    } else if (network.indexOf("goerli") !== -1 && network[8] === "g") {
      setWhichNEt({ network: "Ethereum" });
    } else if (network.indexOf("matic") !== -1 && network[8] === "r") {
      setWhichNEt({ network: "Polygon" });
    } else if (network.indexOf("klaytn") !== -1) {
      setWhichNEt({ network: "Klaytn" });
    }
  }, [setWhichNEt]);

  useEffect(() => {
    handleNetwork();
  }, [handleNetwork]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: "1%" }}>
      <Box onClick={reset} sx={{ display: "flex", cursor: "pointer" }}>
        <img src={headerMMG} width="auto" height="40px" alt="logo" />
        <Typography variant="h4" ml="10px">
          Milal {whichNet.network}
        </Typography>
      </Box>
    </Box>
  );
}
