import {useState} from "react";
import {Col, Container, Input, Spacer} from "@nextui-org/react";
import {MarketplaceV3, SmartContract} from "@thirdweb-dev/sdk";
import {useCreateDirectListing, Web3Button} from "@thirdweb-dev/react";
import {FK_NFT} from "../tools/FkNFTManager";
import {MARKETPLACE_ADDRESS} from "../constants/addresses";
import {showToast} from "../tools/Toast";

type Props = {
    marketplace: MarketplaceV3
    nftContract: SmartContract
    nft: FK_NFT

}
export default function SaleInfo({marketplace, nftContract, nft}: Props) {
    const [amount, setAmount] = useState('')
    const {mutateAsync: createDirectListing} = useCreateDirectListing(marketplace);

    async function checkAndProvideApproval() {
        const hasApproval = await nftContract?.call(
            "isApprovedForAll", [nft.nft.owner, MARKETPLACE_ADDRESS]
        );

        if (!hasApproval) {
            const txResult = await nftContract?.call(
                "setApprovalForAll", [MARKETPLACE_ADDRESS, true]
            );

            if (txResult) {
                showToast('Approval Provided', 'success');
            }
        }

        return true;
    }

    async function handleSubmissionDirect(amount: string) {
        await checkAndProvideApproval()
        return await createDirectListing({
            assetContractAddress: nft.address,
            tokenId: nft.nft.metadata.id,
            pricePerToken: amount,
        })
    }


    return (
            <Col>
                <Input bordered placeholder='0.0' label='Sell Amount' size='xl' color='secondary'
                       labelRight='MATIC' type='number' onChange={e => setAmount(e.target.value)}/>
                <Spacer y={1}/>
                <Web3Button
                    contractAddress={MARKETPLACE_ADDRESS}
                    action={_ => {
                        handleSubmissionDirect(amount)
                            .then(value => showToast('Direct Listing done', 'success'))
                            .catch(reason => {
                                showToast('Direct Listing failed, please check the logs', 'error')
                                console.log(reason)
                            })
                    }}>
                    CREATE LISTING
                </Web3Button>
            </Col>
    )
}