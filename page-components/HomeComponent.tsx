import {useContext, useState} from "react";
import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {Grid, Text} from "@nextui-org/react";
import {FLIP_PASS_CONTRACT_ADDRESS} from "../constants/addresses";
import DirectoryManager, {Directory} from "../tools/DirectoryManager";
import NFTCard from "../components/NFTCard";
import {SmartContract} from "@thirdweb-dev/sdk";
import {PageComponentProps} from "../models/PageComponentProps";
import {DirectoryContext, DirectoryContextType} from "../tools/DirectoryContext";

export default function HomeComponent({address, contract}: PageComponentProps) {


    const {directory, setDirectory} = useContext(DirectoryContext) as DirectoryContextType;


    return (
        <Layout>
            <FkNavBar activeTab='home'/>
            <HomeContent directory={directory} address={address} contract={contract} />
        </Layout>
    )
}


interface HomeContentProps {
    directory: Directory | undefined,
    address?: string,
    contract?: SmartContract
}

function HomeContent({directory, address, contract}: HomeContentProps) {
    const gridSize = 6;

    if (!address || !contract) return <Text h2>Not connected to Web3...</Text>;
    if (!directory) return <Text h2>Loading your NFTs...</Text>;
    const innerArr = directory[FLIP_PASS_CONTRACT_ADDRESS] ?? [];
    if (innerArr.length === 0) return <Text h2>No NFTs...</Text>;
    return (
        <Grid.Container gap={2} justify='center'>
            {innerArr.map(value => <Grid key={value} xs={gridSize}><NFTCard id={value} address={address} contract={contract}/></Grid>)}
        </Grid.Container>
    );
}
