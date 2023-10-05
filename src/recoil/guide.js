import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const guideState = atom({
  key: "guide",
  default: {
    message: "",
  },
  effects_UNSTABLE: [persistAtom],
});
