import {NFT} from "@thirdweb-dev/sdk";
import {Grid, Loading, useModal, Text} from "@nextui-org/react";
import React, {useState} from "react";
import NFTCard from "./NFTCard";
import NFTDetailsModal from "./NFTDetailsModal";
import {FK_NFT} from "../tools/FkNFTManager";

type Props = {
    isLoading: boolean,
    nfts: FK_NFT[]
    type: 'buy' | 'sell' | 'view'
}

export default function NFTGrid({isLoading, nfts, type}: Props) {
    const gridSize = 4;
    const {setVisible, bindings} = useModal();
    const [selectedNFT, setSelectedNFT] = useState<FK_NFT | undefined>();

    if (nfts.length === 0) return <Text css={{margin: '4rem'}} h1 b>THERE ARE NO NFTs...</Text>

    return (
        <div>
            {!!selectedNFT && <NFTDetailsModal type={type} nft={selectedNFT} setVisible={setVisible} bindings={{...bindings, onClose: () => setSelectedNFT(undefined)}}/>}
            <Grid.Container gap={4} justify='flex-start'>
                {isLoading ? (
                    [...Array(6)].map((_, index) => <Grid key={index} xs={gridSize}><Loading type='gradient' size='lg'
                                                                                             style={{padding: '8rem'}}/></Grid>)
                ) : (
                    nfts.map(value => (
                        <Grid key={value.nft.metadata.id} xs={gridSize}>
                            <div onClick={_ => {
                                setSelectedNFT(value)
                                setVisible(true)
                            }}>
                                <NFTCard nft={value} shouldSkipUnlisted={type === 'buy'}/>
                            </div>
                        </Grid>
                    ))
                )}
            </Grid.Container>
        </div>
    );
}