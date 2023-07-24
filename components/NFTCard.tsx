import {DirectListingV3, NFT} from "@thirdweb-dev/sdk";
import {Card, Col, Loading, Row, Text} from "@nextui-org/react";
import {useContract} from "@thirdweb-dev/react-core";
import {MARKETPLACE_ADDRESS} from "../constants/addresses";
import {useValidDirectListings} from "@thirdweb-dev/react";
import React from "react";
import {FK_NFT} from "../tools/FkNFTManager";


type Props = {
    nft: FK_NFT
}

export default function NFTCard({nft}: Props) {
    const {contract: marketplace, isLoading: loadingMarketplace} = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
    const {data, isLoading: loadingDirectListing} = useValidDirectListings(marketplace, {
        tokenContract: nft.address,
        tokenId: nft.nft.metadata.id
    })
    if (loadingMarketplace || loadingDirectListing) return <LoadingNFT/>
    return <LoadedNFT nft={nft.nft} directListing={data?.[0]}/>
}

const LoadingNFT = () => (
    <Card css={{w: '100%', h: '400px', $$cardColor: '#color#primary'}}>
        <Card.Body>
            <Loading type='gradient' size='lg' style={{padding: '8rem'}}/>
        </Card.Body>
    </Card>
)


type LoadedCardProps = {
    nft: NFT,
    directListing: DirectListingV3 | undefined
}

const LoadedNFT = ({nft, directListing}: LoadedCardProps) => (
        <Card css={{w: '100%', h: '400px'}} isPressable>
            <Card.Header css={{position: 'absolute', zIndex: 1, top: 5}}>
                <Text size={12} weight='bold' transform='uppercase'
                      color='#FFFFFFAA'>{`Token #${nft.metadata.id} ${nft.type}`}</Text>
            </Card.Header>
            <Card.Body css={{p: 0}}>
                <Card.Image src={nft.metadata.image as string} width='100%' height='100%' objectFit='cover'/>
            </Card.Body>

            <Card.Footer isBlurred css={{
                position: 'absolute',
                bgBlur: "#ffffff66",
                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1
            }}>
                <Row>
                    <Col>
                        <Text b color='#000' size={14}>{`${nft.metadata.name}`}</Text>
                        <Text color='#000'
                              size={12}>{!directListing ? 'Not Listed' : `Price: ${directListing.currencyValuePerToken.displayValue} ${directListing.currencyValuePerToken.symbol}`}</Text>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
)