import {
  REACT_APP_ADDRESS,
  REACT_APP_RPC_URL,
  REACT_APP_PRIVATE_KEY,
} from "./config.js";
import CryptoJS from "crypto-js";

// abi
import { MilalPOCCA, MilalPOCABI } from "../contract/getAbiData.js";

// caver
import Caver from "caver-js";
const caver = new Caver(REACT_APP_RPC_URL);

// contract
const MilalPOCContract = new caver.klay.Contract(MilalPOCABI, MilalPOCCA);

// Address 확인
export const checkAddress = (address) => {
  return caver.utils.isAddress(address);
};

// NFT Minting
export const minting = async (tokenURI, to) => {
  const mint = MilalPOCContract.methods.mintNFT(to, tokenURI).encodeABI();

  const estimate = await MilalPOCContract.methods
    .mintNFT(to, tokenURI)
    .estimateGas({
      from: REACT_APP_ADDRESS,
    });

  console.log("예상 실행 가스비 견적 : ", estimate);
  const result = await SendTransactionNoValue(mint, MilalPOCCA, estimate);
  console.log("트랜잭션 해시 : ", result.hash);
  return result;
};

// Transaction for Data
export const SendTransactionNoValue = async (data, to, estimateGas) => {
  const privateKey = CryptoJS.AES.decrypt(
    REACT_APP_PRIVATE_KEY,
    REACT_APP_ADDRESS
  ).toString(CryptoJS.enc.Utf8);

  const signTx = await caver.klay.accounts
    .signTransaction(
      {
        from: REACT_APP_ADDRESS,
        to: to,
        gas: estimateGas,
        gasPrice: await caver.klay.getGasPrice(),
        data: data,
      },
      privateKey
    )
    .then((res) => res.rawTransaction);

  const txHash = caver.utils.soliditySha3(signTx);

  const result = {
    hash: txHash,
    tx: signTx,
  };

  return result;
};

// 사인된 트랜잭션을 전송
export const sendSignTx = async (signTx) =>
  await caver.klay.sendSignedTransaction(signTx).then((hash, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("완료되었습니다.", hash);
    }
  });

export const test = async () => {
  await caver.klay.getGasPrice().then(console.log());
};
