const fs = require("fs");
const path = require("path");

const basePath = __dirname;

let base = path.join(basePath, "../");

const makeFile = async (location, destination, address) => {
  console.log(
    "다음 경로에 abi파일을 만듭니다. : ",
    path.join(base, destination)
  );
  const json = await fs.readFileSync(path.join(base, location), {
    encoding: "utf-8",
  });

  await fs.writeFileSync(path.join(base, destination), makeData(json, address));
};

const makeData = (json, address) => {
  const abi = JSON.parse(json).abi;

  return JSON.stringify({
    abi: abi,
    address: address,
  });
};

const makeAbi = async (contract, address) => {
  makeFile(
    `/datas/low/${contract}.json`,
    `/datas/abi/${contract}.json`,
    address
  );
};

module.exports = {
  makeAbi,
};
