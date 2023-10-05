import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const networkState = atom({
  key: "network",
  default: {
    network: "네트워크에 연결이 되지 않았습니다.",
  },
  effects_UNSTABLE: [persistAtom],
});
