const shell = require("shelljs");

// 컴파일 명령어
const compileString = "truffle compile";

// 배포 명령어(Klaytn_Test)
// const deployString = "truffle deploy --network klaytnTest --compile-none";
// 배포 명령어(Klaytn)
const deployString = "truffle deploy --network klaytn --compile-none";

const init = async () => {
  console.log("-------------- 컴파일을 시작합니다. --------------");

  try {
    await shell.exec(compileString);
    console.log("-------------- 컴파일 완료 --------------");
    console.log("   ");
    console.log("-------------- 배포를 시작합니다. --------------");
    await shell.exec(deployString);
    console.log("-------------- 배포 완료 --------------");
  } catch (err) {
    console.log("-----------------------------------------------------");
    console.log("배포중 문제가 생겼습니다. 에러 : ", err);
  }
};

init();
