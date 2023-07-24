import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {Loading, Spacer} from "@nextui-org/react";
import {useContract} from "@thirdweb-dev/react-core";
import {ERC1155_ADDRESS, ERC721_ADDRESS} from "../constants/addresses";
import {useAddress, useOwnedNFTs} from "@thirdweb-dev/react";
import NFTGrid from "../components/NFTGrid";
import {mergeNFTs} from "../tools/FkNFTManager";

export default function SellPageComponent() {

    const address = useAddress()

    const {contract: erc1155Contract, isLoading: isLoadingERC1155Contract} = useContract(ERC1155_ADDRESS);
    const {data: erc1155NFTs, isLoading: isLoadingERC1155s} = useOwnedNFTs(erc1155Contract, address)
    const {contract: erc721Contract, isLoading: isLoadingERC721Contract} = useContract(ERC721_ADDRESS);
    const {data: erc721NFTs, isLoading: isLoadingERC721s} = useOwnedNFTs(erc721Contract, address);

    const isLoading = isLoadingERC1155Contract || isLoadingERC1155s || isLoadingERC721Contract || isLoadingERC721s;


    if (isLoadingERC1155s || isLoadingERC721s) return <Loading type='gradient' size='lg' style={{padding: '8rem'}}/>

    return (
        <Layout>
            <FkNavBar activeTab='sell'/>
            <Spacer y={2}/>
            <NFTGrid isLoading={isLoading} nfts={mergeNFTs(erc1155NFTs, erc721NFTs)} type='sell'/>
        </Layout>
    )
}