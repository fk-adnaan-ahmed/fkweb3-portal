import {FLIP_PASS_CONTRACT_ADDRESS} from "../constants/addresses";
import {useNFT, Web3Button} from "@thirdweb-dev/react";
import {Card, Col, Row, Text} from "@nextui-org/react";
import {SmartContract} from "@thirdweb-dev/sdk";
import {useContext} from "react";
import {DirectoryContext, DirectoryContextType} from "../tools/DirectoryContext";
import DirectoryManager, {Directory} from "../tools/DirectoryManager";

export default function NFTCard(props: NFTCardProps) {
    const contract = props.contract
    const {data: nft, isLoading, error} = useNFT(contract, props.id);
    const {directory, setDirectory: _} = useContext(DirectoryContext) as DirectoryContextType;

    if (isLoading) return <LoadingNFTCard content='Loading...'/>;
    else if (error || !nft) return <LoadingNFTCard content='NFT not loaded'/>;
    return <LoadedNFTCard nft={nft} directory={directory} id={props.id} />
}

const LoadedNFTCard = ({nft, directory, id}) => (
    <Card css={{w: '100%', h: '400px'}}>
        <Card.Header css={{position: 'absolute', zIndex: 1, top: 5}}>
            <Text size={12} weight='bold' transform='uppercase'
                  color='#FFFFFFAA'>{`#${nft.metadata.id} ${nft.type}`}</Text>
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
                    <Text color='#0008' size={12}>{`${nft.metadata.description}`}</Text>
                </Col>
                <Row justify='flex-end'>
                    <FooterButton directory={directory} id={id}/>
                </Row>
            </Row>
        </Card.Footer>
    </Card>
)

interface FooterButtonProps {
    directory: Directory,
    id: number
}

function FooterButton({directory, id}: FooterButtonProps) {
    if (DirectoryManager.hasClaimed(directory, id)) {
        return (
            <Card css={{mw: '100px', alignItems: 'center', justifyContent: 'center', background: 'transparent'}}
                  variant='bordered'>
                <Card.Body>
                    <Text b size={12}>CLAIMED</Text>
                </Card.Body>
            </Card>
        );
    }

    return <Web3Button
        contractAddress={FLIP_PASS_CONTRACT_ADDRESS}
        onError={error1 => window.alert(error1.message)}
        onSuccess={_ => window.alert('Done')}
        action={contract1 => contract1.erc1155.claim(0, 1)}
    >CLAIM
    </Web3Button>

}


const LoadingNFTCard = ({content}) => (
    <Card css={{w: '100%', h: '400px', $$cardColor: '#color#primary'}}>
        <Card.Body>
            <Text h6 size={16} color='white'>{content}</Text>
        </Card.Body>
    </Card>
)

export interface NFTCardProps {
    id: number,
    address: string,
    contract: SmartContract
}