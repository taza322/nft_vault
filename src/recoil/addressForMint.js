import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const addressState = atom({
    key: "address",
    default: {
        address: '',
    },
    effects_UNSTABLE: [persistAtom],
});