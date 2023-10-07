import React, { useEffect, useState } from "react";

// MUI css
import {
  Box,
  CardContent,
  Card,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";

// Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addressState } from "../recoil/account.js";
import { loadingState } from "../recoil/loading.js";

// Api
import { getNftsByAddress } from "../APIs/kasCall.js";

export default function NFTs() {
  const { address } = useRecoilValue(addressState);
  const [nfts, setNfts] = useState([]);
  const [isCardExpanded, setIsCardExpanded] = useState([]);
  const isLoading = useSetRecoilState(loadingState);

  const getNfts = async () => {
    isLoading({ isLoading: true });
    const nfts = await getNftsByAddress(address);
    setNfts(nfts);

    setIsCardExpanded(new Array(nfts.length).fill(false));
    isLoading({ isLoading: false });
  };

  const toggleCardExpansion = (index) => {
    setIsCardExpanded((prevState) =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  };

  const handleAddress = (address) => {
    window.open(
      `https://baobab.klaytnscope.com/account/${address}?tabId=txList`
    );
  };

  const handleTx = (tx) => {
    window.open(`https://baobab.klaytnscope.com/tx/${tx}?tabId=nftTransfer`);
  };

  useEffect(() => {
    getNfts();
    // eslint-disable-next-line
  }, []);

  const rendering = () => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {nfts.map((nft, index) => (
          <Box
            key={index}
            sx={{
              margin: "2%",
              flex: "0 0 calc(33.33% - 16px)",
            }}
          >
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5">{nft.name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Owned by</Typography>
                  <Typography
                    variant="h10"
                    color="blue"
                    sx={{ cursor: "pointer", ml: "4px" }}
                    onClick={() => handleAddress(nft.owner)}
                  >
                    {nft.owner.slice(0, 6)}...
                    {nft.owner.slice(
                      nft.owner.length - 5,
                      nft.owner.length - 1
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: "15px",
                  }}
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    style={{ width: "150px" }}
                  />
                </Box>
                <Typography variant="h8" sx={{ mt: "3px" }}>
                  {nft.description}
                </Typography>
                {nft.attributes && nft.attributes.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {nft.attributes.map((attribute, attrIndex) => (
                      <Box
                        key={attrIndex}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          margin: "10px",
                        }}
                      >
                        <Card
                          sx={{
                            minWidth: 60,
                            backgroundColor: "#F1F1F1",
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="h10" fontSize="small">
                                {attribute.trait_type}
                              </Typography>
                              <Typography
                                variant="h10"
                                fontSize="small"
                                sx={{ mt: "3px" }}
                              >
                                {attribute.value}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                ) : null}
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isCardExpanded[index]}
                        onChange={() => toggleCardExpansion(index)}
                        color="primary"
                      />
                    }
                    label="Details"
                  />
                  {isCardExpanded[index] && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        p: 2,
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Typography fontSize="small">
                          Contract Address :
                        </Typography>
                        <Typography
                          variant="h10"
                          color="blue"
                          fontSize="small"
                          sx={{ cursor: "pointer", ml: "4px" }}
                          onClick={() => handleAddress(nft.contractAddress)}
                        >
                          {nft.contractAddress.slice(0, 6)}...
                          {nft.contractAddress.slice(
                            nft.contractAddress.length - 5,
                            nft.contractAddress.length - 1
                          )}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: "10px", display: "flex" }}>
                        <Typography fontSize="small">Token ID : </Typography>
                        <Typography fontSize="small" sx={{ ml: "4px" }}>
                          {nft.tokenId}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: "10px", display: "flex" }}>
                        <Typography fontSize="small">Chain : </Typography>
                        <Typography fontSize="small" sx={{ ml: "4px" }}>
                          {nft.chain}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: "10px", display: "flex" }}>
                        <Typography fontSize="small">CreatedAt : </Typography>
                        <Typography fontSize="small" sx={{ ml: "4px" }}>
                          {nft.createdAt}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: "10px", display: "flex" }}>
                        <Typography fontSize="small">Transaction : </Typography>
                        <Typography
                          variant="h10"
                          color="blue"
                          fontSize="small"
                          sx={{ cursor: "pointer", ml: "4px" }}
                          onClick={() => handleTx(nft.transactionHash)}
                        >
                          {nft.transactionHash.slice(0, 6)}...
                          {nft.transactionHash.slice(
                            nft.transactionHash.length - 5,
                            nft.transactionHash.length - 1
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    );
  };

  return <Box>{rendering()}</Box>;
}
