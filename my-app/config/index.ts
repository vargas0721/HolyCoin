import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
  return new Contract(
    "0x092056093318996AB0F649ABD000F0aFeF5920f5" /* address of the deployed contract */,
    abi as any,
    signer
  );
}