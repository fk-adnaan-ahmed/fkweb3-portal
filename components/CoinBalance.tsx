import React, {useState} from "react";
import {Avatar, Badge} from "@nextui-org/react";
import {useContract} from "@thirdweb-dev/react-core";
import {FKC_ADDRESS} from "../constants/addresses";
import {useAddress} from "@thirdweb-dev/react";
import {getTotalCoins, setTotalCoins} from "../tools/Utils";


export interface CoinState {
    coins: string,
    variant: "default" | "points" | "flat" | "bordered" | "dot" | undefined;
}

export default function CoinBalance() {
    const address = useAddress();
    const {contract} = useContract(FKC_ADDRESS);

    const [coins, setCoins] = useState('...');
    setTotalCoins(address, contract, setCoins);

    return (
        <div onClick={_ => getTotalCoins(address, contract, setCoins)}>
            <Badge color='primary' shape='circle' size='xs' content={coins}
                   variant={coins === '...' ? 'points' : 'default'}>
                <Avatar size='lg' src='https://cdn-icons-png.flaticon.com/512/6557/6557103.png'/>
            </Badge>
        </div>
    )
}