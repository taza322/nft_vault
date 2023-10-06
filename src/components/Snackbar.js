import React, { useEffect, useCallback } from "react";

// MUI css
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

// recoil
import { useRecoilValue } from "recoil";
import { tabSelectState } from "../recoil/tabSelect.js";
import { guideState } from "../recoil/guide.js";

export default function Snackbar() {
  const { enqueueSnackbar } = useSnackbar();
  const tabSelect = useRecoilValue(tabSelectState);
  const guide = useRecoilValue(guideState);

  const showSnackbar = useCallback(
    (message) => {
      if (message === "NFT") {
        enqueueSnackbar("민팅할 NFT의 정보를 써주세요.");
      }
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    showSnackbar(tabSelect.tabSelect);
  }, [tabSelect.tabSelect, showSnackbar]);

  useEffect(() => {
    if (guide.message.length > 0) {
      showSnackbar(guide.message);
    }
  }, [guide.message, showSnackbar]);

  return <Box></Box>;
}
