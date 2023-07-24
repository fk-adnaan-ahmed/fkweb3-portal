import {NextPage} from "next";
import {useContract} from "@thirdweb-dev/react";
import {TRANSFER_ADDRESS} from "../constants/addresses";
import {Loading} from "@nextui-org/react";
import React from "react";
import TransferComponent from "../page-components/TransferComponent";

const Transfer: NextPage = () => {
    // const {contract, isLoading} = useContract(TRANSFER_ADDRESS);

    // if (!contract || isLoading) return <Loading type='spinner' size='lg' style={{padding: '8rem'}}/>

    return <TransferComponent/>
}
export default Transfer;