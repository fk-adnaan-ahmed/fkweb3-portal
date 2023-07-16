import {SmartContract} from "@thirdweb-dev/sdk";
import {Dispatch, SetStateAction} from "react";
import {BigNumber} from "ethers";
import {FLIP_PASS_CONTRACT_ADDRESS} from "../constants/addresses";

export type Directory = Record<string, number[] | undefined>;
export default class DirectoryManager {

    public static async populateDirectory2(address: string, contract: SmartContract, setter: Dispatch<SetStateAction<number>> | undefined) {
        const nextTokenIdToMint: BigNumber = await contract.call('nextTokenIdToMint', []);
        const accounts: string[] = []
        const ids: number[] = [];
        const steps = 80 / nextTokenIdToMint.toNumber();
        let accumulator = 0;

        for (let i = 0; i < nextTokenIdToMint.toNumber(); i++) {
            accounts.push(address);
            ids.push(i);
            accumulator += steps;
            setter && setter(accumulator);
        }

        const balanceOfBatch: BigNumber[] = await contract.call('balanceOfBatch', [accounts, ids]);
        console.log('balanceOfBatch', JSON.stringify(balanceOfBatch));

        const directory: Directory = {};
        const innerArr: number[] = [];

        for (let i = 0; i < nextTokenIdToMint.toNumber(); i++) {
            if ((balanceOfBatch?.at(i)?.toNumber() ?? 0) >= 1) {
                innerArr.push(i);
            }
        }
        directory[FLIP_PASS_CONTRACT_ADDRESS] = innerArr;
        return directory;
    }

    public static hasClaimed(directory: Directory, id: number) {
        return (directory[FLIP_PASS_CONTRACT_ADDRESS]?.findIndex(value => value === id) ?? -1) !== -1;
    }

}