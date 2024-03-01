import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("HolyCoin", ["0x1E1E2DB06c7276A6c12a223BF185f454FF542d4B"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});