import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const successState = atom({
  key: "success",
  default: {
    isSuccess: false,
  },
  effects_UNSTABLE: [persistAtom],
});
