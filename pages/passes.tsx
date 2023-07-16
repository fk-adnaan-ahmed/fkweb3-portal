import {NextPage} from "next";
import {useAddress, useContract} from "@thirdweb-dev/react";
import {FKC_ADDRESS, FLIP_PASS_CONTRACT_ADDRESS} from "../constants/addresses";
import PassesComponent from "../page-components/PassesComponent";
import React from "react";
import TransferComponent from "../page-components/TransferComponent";
import {Loading} from "@nextui-org/react";


const Passes: NextPage = () => {
    const address = useAddress();
    const {contract} = useContract(FLIP_PASS_CONTRACT_ADDRESS);

    if (!address || !contract) return <Loading type='spinner' size='lg' style={{padding: '8rem'}}/>

    return <PassesComponent address={address} contract={contract}/>;

};

export default Passes;