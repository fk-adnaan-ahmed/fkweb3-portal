import {NextPage} from "next";
import {useAddress, Web3Button} from "@thirdweb-dev/react";
import {Loading} from "@nextui-org/react";
import React from "react";
import {FLIP_DROPS_ADDRESS} from "../constants/addresses";
import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {SmartContract} from "@thirdweb-dev/sdk";

const Drops: NextPage = () => {

    const address = useAddress();

    if (!address) return <Loading type='spinner' size='lg' style={{padding: '8rem'}}/>


    return (
        <Layout>
            <FkNavBar activeTab='drops'/>
            <Web3Button
                // onSuccess={result => window.alert('success')}
                // onError={error => window.alert(error.message)}
                contractAddress={FLIP_DROPS_ADDRESS}
                action={contract => doTransaction(contract)}>CLAIM</Web3Button>
        </Layout>
    )
}

async function doTransaction(contract: SmartContract) {
    const data = await contract.erc721.claim(1)
    console.log('data', data);
}

export default Drops;