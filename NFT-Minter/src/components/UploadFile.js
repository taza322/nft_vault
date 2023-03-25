import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box, IconButton } from "@mui/material";
import { DriveFolderUpload, Send } from "@mui/icons-material";

// recoil
import { useSetRecoilState } from "recoil";
import { tabSelectState } from "../recoil/tabSelect.js";
import { loadingState } from "../recoil/loading.js";
import { fileNumState } from "../recoil/files.js";
import { nftMetaState } from "../recoil/nftMeta.js";
import { guideState } from "../recoil/guide.js";

// api
import { uploadImgToPinata } from "../APIs/pinataCall.js";

export default function UploadFile() {
  const navigate = useNavigate();
  const setTabSelect = useSetRecoilState(tabSelectState);
  const setLoading = useSetRecoilState(loadingState);
  const setFileNum = useSetRecoilState(fileNumState);
  const setNftMetaData = useSetRecoilState(nftMetaState);
  const setGuide = useSetRecoilState(guideState);
  const [uploadFile, setUploadFile] = useState(null);
  const [prevImg, setPrevImg] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setUploadFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPrevImg(reader.result);
    };
  };

  const handleSendFile = async () => {
    setLoading({ isLoading: true });
    const formData = new FormData();
    formData.append("file", uploadFile);

    const result = await uploadImgToPinata(formData);
    console.log("img : ", result);

    if (result) {
      setLoading({ isLoading: false });
      setFileNum({ count: 1 });
      setNftMetaData((prev) => ({
        ...prev,
        image: result,
      }));
      setTabSelect({ tabSelect: "NFT" });
      setGuide({ message: "이미지를 민팅할 준비가 되었습니다." });
      navigate("/NFT");
    } else {
      setLoading({ isLoading: false });
    }
  };

  console.log(uploadFile);

  return (
    <>
      <Box>
        {uploadFile === null ? (
          <>
            <Box>이미지 파일을 올려서 NFT Json URL을 만드세요.</Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onChange={handleUpload}
              >
                <DriveFolderUpload color="primary" fontSize="large" />
                <input hidden accept="image/*" type="file" />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              다음의 이미지가 민팅됩니다.
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", padding: "5%" }}
            >
              <img
                src={prevImg}
                alt="select img"
                style={{ width: "50%", height: "auto" }}
              />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-evenly", mb: "3%" }}
            >
              <IconButton
                color="primary"
                aria-label="send picture"
                component="label"
                onClick={handleSendFile}
              >
                <Send fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
