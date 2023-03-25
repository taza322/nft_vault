import {
  REACT_APP_ADDRESS,
  REACT_APP_PRIVATE_KEY,
  REACT_APP_RPC_URL,
} from "./config.js";
import Web3 from "web3";
import CryptoJS from "crypto-js";

// Contract data
import { MyMetaGalleryCA, MyMetaGalleryABI } from "../contract/getAbiData.js";

// web3 provider
export const web3 = new Web3(REACT_APP_RPC_URL);

// Address 확인
export const checkAddress = (address) => web3.utils.isAddress(address);

// Transaction for Data
export const SendTransactionNoValue = async (data, to, estimateGas) => {
  const privateKey = CryptoJS.AES.decrypt(
    REACT_APP_PRIVATE_KEY,
    REACT_APP_ADDRESS
  ).toString(CryptoJS.enc.Utf8);

  // 동기적인 코드(해시 리턴 값을 가져오기까지 오래걸림)
  //   await web3.eth.accounts
  //     .signTransaction(
  //       {
  //         from: REACT_APP_ADDRESS,
  //         to: to,
  //         gas: estimateGas,
  //         gasPrice: await web3.eth.getGasPrice(),
  //         data: data,
  //       },
  //       privateKey
  //     )
  //     .then(async (Tx) => {
  //       await web3.eth
  //         .sendSignedTransaction(Tx.rawTransaction)
  //         .then((hash, err) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log("민팅이 완료되었습니다.");
  //             return hash;
  //           }
  //         });
  //     });

  // 사인한 트랙잭션에 대한 해시를 미리 넘겨서 빨리 끝낸다.
  const signTx = await web3.eth.accounts
    .signTransaction(
      {
        from: REACT_APP_ADDRESS,
        to: to,
        gas: estimateGas,
        gasPrice: await web3.eth.getGasPrice(),
        data: data,
      },
      privateKey
    )
    .then((res) => {
      return res.rawTransaction;
    });

  const txHash = web3.utils.sha3(signTx);

  const result = {
    hash: txHash,
    tx: signTx,
  };

  return result;
};

// Mint
const MyMetaGalleryContract = new web3.eth.Contract(
  MyMetaGalleryABI,
  MyMetaGalleryCA
).methods;
export const minting = async (tokenURI, to) => {
  const mint = MyMetaGalleryContract.mintNFT(to, tokenURI).encodeABI();

  const estimate = await MyMetaGalleryContract.mintNFT(
    to,
    tokenURI
  ).estimateGas({
    from: REACT_APP_ADDRESS,
  });

  console.log("예상 실행 가스비 견적 : ", estimate);
  const result = await SendTransactionNoValue(mint, MyMetaGalleryCA, estimate);
  console.log("트랜잭션 해시 : ", result.hash);
  return result;
};

// 사인된 트랜잭션을 전송
export const sendSignTx = async (signTx) =>
  await web3.eth.sendSignedTransaction(signTx).then((hash, err) => {
    if (err) {
      console.log(err);
    } else {
      if (web3.utils.hexToNumber(hash.logs[0].topics[3])) {
        const tokenId = web3.utils.hexToNumber(hash.logs[0].topics[3]);
        console.log("tokenID : ", tokenId);
        console.log("tokenID type : ", typeof tokenId);
        return tokenId;
      } else {
        console.log("완료되었습니다.", hash);
      }
    }
  });

// 민팅이 완료되었으면, 다시 민팅 의뢰자(to)에세 전송(transfer)
export const transfer = async (to, tokenId) => {
  const safeTransferFrom = await MyMetaGalleryContract.safeTransferFrom(
    REACT_APP_ADDRESS,
    to,
    Number(tokenId)
  ).encodeABI();

  const estimate = await MyMetaGalleryContract.safeTransferFrom(
    REACT_APP_ADDRESS,
    to,
    Number(tokenId)
  ).estimateGas({
    from: REACT_APP_ADDRESS,
    gas: 5000000,
  });

  console.log("예상 가스 견적 : ", estimate);

  console.log("트랜잭션을 사인합니다.");

  const result = await SendTransactionNoValue(
    safeTransferFrom,
    MyMetaGalleryCA,
    estimate
  );

  console.log("트랜잭션 해시 : ", result.hash);

  return result;
};
