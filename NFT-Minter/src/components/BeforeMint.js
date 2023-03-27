import React, { useEffect } from "react";

// MUI css
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  Input,
  FormHelperText,
} from "@mui/material";

// recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { fileNumState } from "../recoil/files.js";
import { nftMetaState } from "../recoil/nftMeta.js";
import { attributeSelector } from "../recoil/attributes.js";

export default function BeforeMint() {
  const fileNum = useRecoilValue(fileNumState);
  const metaData = useRecoilValue(nftMetaState);
  const nftMeta = useSetRecoilState(nftMetaState);
  const [attributes, setAttributes] = useRecoilState(attributeSelector);

  const handleName = (e) => {
    nftMeta((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    nftMeta((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  // const handleOwner = (e) => {
  //   setPolygonAttributes([
  //     {
  //       trait_type: "Owner",
  //       value: e.target.value,
  //     },
  //   ]);
  // };

  // const handleLeadPainter = (e) => {
  //   setAttributes((prev) => [
  //     ...prev,
  //     {
  //       trait_type: "Artist",
  //       value: e.target.value,
  //     },
  //   ]);
  // };

  const handleClass = (e) => {
    setAttributes((prev) => [
      ...prev,
      { trait_type: "Class", value: e.target.value },
    ]);
  };

  useEffect(() => {
    nftMeta((prev) => ({
      ...prev,
      attributes: attributes,
    }));
  }, [attributes, nftMeta]);

  console.log(metaData);

  const rendering = () => {
    const result = [];

    for (let i = 0; i < fileNum.count; i++) {
      result.push(
        <Box key={i} sx={{ mb: "5%" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                아래의 정보로 NFT가 민팅됩니다.
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="nameInput"
                label="name : NFT 이름을 쓰세요."
                variant="standard"
                fullWidth
                onChange={handleName}
              />
              <TextField
                autoFocus
                margin="dense"
                id="descriptionInput"
                label="description : NFT에 관한 설명을 쓰세요."
                variant="standard"
                fullWidth
                onChange={handleDescription}
              />
              <TextField
                autoFocus
                margin="dense"
                id="CollaboratedWithInput"
                label="Class : 아이는 무슨 반인가요?"
                variant="standard"
                fullWidth
                onBlur={handleClass}
              />
              <FormControl
                disabled
                variant="standard"
                margin="dense"
                fullWidth
                sx={{ mt: "23px" }}
              >
                <Input
                  id="component-disabled"
                  defaultValue="Kindergarten : 밀알 성품 어린이집"
                />
                <FormHelperText>Only use 밀알 성품 어린이집</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return result;
  };

  return <Box>{rendering()}</Box>;
}
