import React, { useEffect, useCallback, useState } from "react";

// MUI css
import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

// Images
import headerMMG from "../img/codestates_Logo.png";

import { REACT_APP_RPC_URL } from "../utils/config.js";

// recoil
import { useResetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { nftMetaState } from "../recoil/nftMeta.js";
import { addressState } from "../recoil/addressForMint.js";
import { loadingState } from "../recoil/loading.js";
import { tabSelectState } from "../recoil/tabSelect.js";
import { networkState } from "../recoil/network.js";
import { attributesState } from "../recoil/attributes.js";
import { securityState } from "../recoil/security.js";
import { guideState } from "../recoil/guide.js";
import { successState } from "../recoil/success.js";

// Util
import { isListening } from "../utils/caver";

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

  const { address } = useRecoilValue(addressState);
  const [peer, setPeer] = useState(0);

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

  const handleListening = async () => {
    const result = await isListening();
    setPeer(result);
  };

  useEffect(() => {
    handleNetwork();
    handleListening();
  }, [handleNetwork]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: "1%" }}>
      <Box
        onClick={reset}
        sx={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={headerMMG} width="auto" height="40px" alt="logo" />
          <Typography variant="h4" ml="10px">
            My NFT Vault
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {address.length === 0 ? null : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mr: "3px",
              }}
            >
              <Typography variant="h10">
                {address.slice(0, 6)}...
                {address.slice(address.length - 5, address.length - 1)}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {peer > 0 ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    mr: "3px",
                  }}
                >
                  <CircleIcon fontSize="small" color="success" />
                </Box>
                <Typography variant="h10">{whichNet.network}</Typography>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    mr: "3px",
                  }}
                >
                  <CircleIcon fontSize="small" color="disabled" />
                </Box>
                <Typography variant="h10">네트워크가 불안정합니다.</Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
