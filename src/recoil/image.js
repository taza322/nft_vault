import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const imageState = atom({
  key: "image",
  default: {
    prevImg: "",
  },
  effects_UNSTABLE: [persistAtom],
});
