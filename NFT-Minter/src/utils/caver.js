import { REACT_APP_ADDRESS, REACT_APP_RPC_URL } from "./config.js";

// caver
import Caver from "caver-js";
const caver = new Caver(REACT_APP_RPC_URL);

export const test = () => {
  const account = caver.utils.toChecksumAddress(REACT_APP_ADDRESS);
  console.log(account);
};
