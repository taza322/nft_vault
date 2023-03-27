import { REACT_APP_ADDRESS, REACT_APP_RPC_URL } from "./config.js";

// caver
import Caver from "caver-js";
const caver = new Caver(REACT_APP_RPC_URL);

export const test = () => {
  const account = caver.utils.isAddress(REACT_APP_ADDRESS);
  console.log(account);
};

// Address 확인
export const checkAddress = (address) => {
  return caver.utils.isAddress(address);
};
