import React, { useEffect } from "react";

// MUI css
import { Box, Card, CardContent, Typography, TextField } from "@mui/material";

// recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { fileNumState } from "../recoil/files.js";
import { nftMetaState } from "../recoil/nftMeta.js";
import { networkState } from "../recoil/network.js";
import { attributesState, attributeSelector } from "../recoil/attributes.js";

export default function BeforeMint() {
  const fileNum = useRecoilValue(fileNumState);
  const nftMeta = useSetRecoilState(nftMetaState);
  const network = useRecoilValue(networkState);
  const setPolygonAttributes = useSetRecoilState(attributesState);
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

  const handleOwner = (e) => {
    setPolygonAttributes([
      {
        trait_type: "Owner",
        value: e.target.value,
      },
    ]);
  };

  const handleLeadPainter = (e) => {
    setAttributes((prev) => [
      ...prev,
      {
        trait_type: "Artist",
        value: e.target.value,
      },
    ]);
  };

  const handleCollaboratedWith = (e) => {
    setAttributes((prev) => [
      ...prev,
      { trait_type: "Collaborated with", value: e.target.value },
    ]);
  };

  useEffect(() => {
    nftMeta((prev) => ({
      ...prev,
      attributes: attributes,
    }));
  }, [attributes, nftMeta]);

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
              {network.network === "Polygon" ? (
                <TextField
                  autoFocus
                  margin="dense"
                  id="OwnerInput"
                  label="Owner : NFT를 가질 소유자를 쓰세요."
                  variant="standard"
                  fullWidth
                  onBlur={handleOwner}
                />
              ) : (
                <Box>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="ArtistInput"
                    label="Artist : 작가의 이름을 쓰세요."
                    variant="standard"
                    fullWidth
                    onBlur={handleLeadPainter}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="CollaboratedWithInput"
                    label="Collaborated with : 함께한 아이를 쓰세요."
                    variant="standard"
                    fullWidth
                    onBlur={handleCollaboratedWith}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      );
    }

    return result;
  };

  return <Box>{rendering()}</Box>;
}
