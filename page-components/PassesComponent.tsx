import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {Grid} from "@nextui-org/react";
import {SmartContract} from "@thirdweb-dev/sdk";
import {useState} from "react";
import NFTCard from "../components/NFTCard";
import {PageComponentProps} from "../models/PageComponentProps";


export default function PassesComponent({address, contract}: PageComponentProps) {
    const gridSize = 4;
    const [nftIds, setNFTIds] = useState<number[]>([]);
    getPassesCount(address, contract)
        .then(value => setNFTIds(value))
        .catch(reason => console.error(reason));

    return (
        <Layout>
            <FkNavBar activeTab='passes'/>
            <Grid.Container gap={4} justify='center'>
                {nftIds.map((value, _) => <Grid key={value} xs={gridSize}><NFTCard id={value} address={address} contract={contract}/></Grid>)}
            </Grid.Container>
        </Layout>
    );
}


async function getPassesCount(address: string, contract: SmartContract) {
    const data = await contract.call('nextTokenIdToMint', []);
    const arr: number[] = [];
    for (let i=0; i<data.toNumber(); i++) {
        arr.push(i);
    }
    return arr;

}