import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box, TextField, Button } from "@mui/material";

// recoil
import { useSetRecoilState, useRecoilState } from "recoil";
import { loadingState } from "../recoil/loading.js";
import { tabSelectState } from "../recoil/tabSelect.js";
import { addressState } from "../recoil/addressForMint.js";
import { securityState } from "../recoil/security.js";

// web3
// import { checkAddress } from "../utils/web3.js";

// caver
import { test, checkAddress } from "../utils/caver.js";

export default function Main() {
  const setLoading = useSetRecoilState(loadingState);
  const setTabSelect = useSetRecoilState(tabSelectState);
  const [isErr, setIsErr] = useState(false);
  const [securityCode, setSecurityCode] = useRecoilState(securityState);
  const [address, setAddress] = useRecoilState(addressState);
  const navigate = useNavigate();

  const handleCheckAddress = () => {
    setLoading({ isLoading: true });

    if (!isErr && securityCode.isSecurityCode) {
      // 데이터가 잘 들어옴
      setIsErr(false);
      setTabSelect({ tabSelect: "Json" });
      navigate("/Json");
      setLoading({ isLoading: false });
      console.log("address가 잘 들어왔습니다. address : ", address.address);
    } else {
      // 데이터가 잘 들어오지 않음.
      setAddress({ address: "" });
      setIsErr(true);
      setLoading({ isLoading: false });
      if (address.address === "") {
        console.log("address를 확인해주세요. address : ", address.address);
      }
    }
  };

  const handleInput = (inputAddress) => {
    if (checkAddress(inputAddress.target.value)) {
      setAddress({ address: inputAddress.target.value });
      setIsErr(false);
    } else {
      setIsErr(true);
    }
  };

  // 보안코드
  const handleSecurity = (inputCode) => {
    const code = inputCode.target.value;

    // 주소에서 뒤의 두자리
    const addressCode = address.address.slice(address.address.length - 2);
    const addressInputCode = code.slice(4, 6);

    // 시간 계산
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let availableHours = hours;
    let availableMinutes = minutes;
    if (availableMinutes >= 60) {
      availableMinutes = availableMinutes - 60;
      availableHours = hours + 1;
    }

    // 시간을 잘 입력했는지
    const inputTimeCode = Number(code.slice(0, 4));
    const inputHours = String(inputTimeCode).slice(0, 2);
    const inputMinutes = String(inputTimeCode).slice(2, 4);
    const isNaNInputTime = isNaN(inputTimeCode);

    if (
      !isNaNInputTime &&
      inputMinutes.length === 2 &&
      inputHours.length === 2 &&
      addressInputCode.length === 2
    ) {
      let availableTime = availableHours * 60 + availableMinutes;
      let inputTime = Number(inputHours) * 60 + Number(inputMinutes);
      const checkTime = availableTime - inputTime;

      // 0 <= checkTime <= 10 (10분간만 유효)
      // address 뒤에 두자리와 inputCode 뒤에 두자리가 같아야 함.
      if (
        checkTime >= 0 &&
        checkTime <= 10 &&
        addressCode === addressInputCode
      ) {
        setSecurityCode({ isSecurityCode: true });
      } else {
        setSecurityCode({ isSecurityCode: false });
      }
    }
    if (code.length !== 6) {
      setSecurityCode({ isSecurityCode: false });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: "3%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: "5%",
        }}
      >
        <Box sx={{ width: "70%" }}>
          {!isErr ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="addressInput"
                label="address"
                variant="standard"
                fullWidth
                onChange={handleInput}
              />
              <TextField
                autoFocus
                margin="dense"
                id="codeInput"
                label="code"
                variant="standard"
                fullWidth
                onChange={handleSecurity}
              />
            </>
          ) : (
            <>
              <TextField
                error
                id="standard-error-helper-text"
                label="받을 주소가 올바르지 않습니다."
                fullWidth
                helperText="유효한 주소인지 확인해주세요."
                variant="standard"
                onChange={handleInput}
              />
              <TextField
                autoFocus
                margin="dense"
                id="codeInput"
                label="code"
                variant="standard"
                fullWidth
                onChange={handleSecurity}
              />
            </>
          )}
        </Box>
      </Box>
      {securityCode.isSecurityCode ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ width: "40%", mt: "5%" }}
            onClick={handleCheckAddress}
            variant="contained"
          >
            시작하기
          </Button>
        </Box>
      ) : null}
      <Button
        sx={{ width: "40%", mt: "5%", margin: "0 auto" }}
        variant="contained"
        onClick={test}
      >
        테스트
      </Button>
    </Box>
  );
}
