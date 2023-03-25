import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const securityState = atom({
  key: "security",
  default: {
    isSecurityCode: false,
  },
  effects_UNSTABLE: [persistAtom],
});
