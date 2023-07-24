import {useContract} from "@thirdweb-dev/react-core";
import {ERC721_ADDRESS, MARKETPLACE_ADDRESS} from "../constants/addresses";
import {Avatar, Col, Container, Loading, Modal, Row, Spacer, Text} from "@nextui-org/react";
import {MediaRenderer, ThirdwebNftMedia, useValidDirectListings} from "@thirdweb-dev/react";
import React, {Dispatch, SetStateAction, useState} from "react";
import {FK_NFT} from "../tools/FkNFTManager";
import SaleInfo from "./SaleInfo";
import BuyInfo from "./BuyInfo";
import ViewInfo from "./ViewInfo";

type Props = {
    nft: FK_NFT,
    setVisible: Dispatch<SetStateAction<boolean>>,
    bindings: {
        open: boolean;
        onClose: () => void;
    }
    type: 'buy' | 'sell' | 'view'

}
export default function NFTDetailsModal({nft, setVisible, bindings, type}: Props) {

    const {contract, isLoading} = useContract(nft.address);
    const {contract: marketplace, isLoading: loadingMarketplace} = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
    const [contractMetadata, setContractMetadata] = useState<any>();
    const {data, isLoading: loadingDirectListing} = useValidDirectListings(marketplace, {
        tokenContract: nft.address,
        tokenId: nft.nft.metadata.id
    })

    contract?.metadata.get()
        .then(value => {
            setContractMetadata(value);
            console.log('contractMetadata', value);
        })
        .catch(reason => console.error('contractMetadata error', reason));

    const directListing = data?.[0];

    if (isLoading || loadingDirectListing || loadingMarketplace) return <Loading type='spinner' size='lg'
                                                                                 style={{padding: '8rem'}}/>

    return (
        <Modal
            scroll
            width='60%'
            {...bindings}>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <ThirdwebNftMedia
                                metadata={nft.nft.metadata} width='100%' height='100%'/>
                        </Col>
                        <Spacer x={1}/>
                        <Col>
                            {!!(contractMetadata?.image) && !!(contractMetadata?.name) && (
                                <Row align='center'>
                                    <MediaRenderer
                                        src={contractMetadata.image}
                                        height='32px'
                                        width='32px'
                                    />
                                    <Text css={{marginLeft: '1rem'}} size={12}>{contractMetadata.name}</Text>
                                </Row>
                            )}
                            <Text size={24}>{nft.nft.metadata.name}</Text>
                            <Row align='center'>
                                <Avatar
                                    size="sm"
                                    src="https://i.pravatar.cc/150?u=a042581f4e25056704b"
                                    color="gradient"
                                    bordered
                                />
                                <Text css={{marginLeft: '1rem'}}
                                      size={12}>{`${nft.nft.owner.slice(0, 6)}...${nft.nft.owner.slice(-4)}`}</Text>
                            </Row>
                            <Spacer y={1}/>
                            <Text size={12} color='grey'>DESCRIPTION</Text>
                            <Text size={14}>{`${nft.nft.metadata.description}`}</Text>
                            <Spacer y={1}/>
                            {type === 'buy' && <BuyInfo directListing={directListing} setVisible={setVisible}/>}
                            {!!marketplace && !!contract && type === 'sell' &&
                                <SaleInfo marketplace={marketplace} nftContract={contract} nft={nft}/>}
                            {nft.address === ERC721_ADDRESS && type === 'view' && !!contract && <ViewInfo contract={contract} nft={nft}/>}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

