import { atom, selector } from "recoil";

export const attributesState = atom({
  key: "attributes",
  default: [{ trait_type: "", value: "" }],
});

export const attributeSelector = selector({
  key: "attribute",
  get: ({ get }) => {
    const attributes = get(attributesState);
    return attributes;
  },
  set: ({ set }, newValue) => {
    let filter = newValue.reverse();
    let result = [];

    // for (let i = 0; i < filter.length; i++) {
    //   if (filter[i].trait_type !== "" || filter[i].value !== "") {
    //     if (filter[i].trait_type === "Artist") {
    //       result.push(filter[i]);
    //       break;
    //     }
    //   }
    // }

    for (let i = 0; i < filter.length; i++) {
      if (filter[i].trait_type !== "" || filter[i].value !== "") {
        if (filter[i].trait_type === "Class") {
          result.push(filter[i]);
          break;
        }
      }
    }

    result.push({ trait_type: "Kindergarten", value: "밀알 성품 어린이집" });

    set(attributesState, result);
  },
});
