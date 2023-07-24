import {SmartContract} from "@thirdweb-dev/sdk";
import {Dispatch, SetStateAction} from "react";
import {ethers} from "ethers";
import {showToast} from "./Toast";

export function setTotalCount(address: string | undefined, id: number, contract: SmartContract, setterFun: Dispatch<SetStateAction<string>>): void {
    if (!address) return;
    contract.erc1155.balanceOf(address, id)
        .then(value => setterFun(ethers.utils.formatUnits(value, 'wei')))
        .catch(reason => console.error(reason))

}

export function setTotalCoins(address: string | undefined, contract: SmartContract | undefined, setterFun: Dispatch<SetStateAction<string>>): void {
    if (!contract || !address) return;
    contract.erc20.balanceOf(address)
        .then(value => {
            setterFun(value.displayValue)
        })
        .catch(reason => console.error(reason));
}

export function getTotalCoins(address: string | undefined, contract: SmartContract | undefined, setterFun: Dispatch<SetStateAction<string>>): void {
    setterFun('...');
    if (!contract || !address) return;
    contract.erc20.balanceOf(address)
        .then(value => {
            setterFun(value.displayValue)
        })
        .catch(reason => console.error(reason));
}

export function setTotalCoinsNumber(address: string, contract: SmartContract, setterFun: Dispatch<SetStateAction<number>>): void {
    contract.erc20.balanceOf(address)
        .then(data => {
            setterFun(data.value.toNumber())
        })
        .catch(reason => console.error(reason));
}


