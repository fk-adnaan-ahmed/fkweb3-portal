import {NextPage} from "next";
import {useAddress, useContract} from "@thirdweb-dev/react";
import {FKC_ADDRESS} from "../constants/addresses";
import {Loading} from "@nextui-org/react";
import React from "react";
import TransferComponent from "../page-components/TransferComponent";

const Transfer: NextPage = () => {
    const address = useAddress();
    const {contract} = useContract(FKC_ADDRESS);

    if (!address || !contract) return <Loading type='spinner' size='lg' style={{padding: '8rem'}}/>

    return <TransferComponent address={address} contract={contract}/>
}
export default Transfer;