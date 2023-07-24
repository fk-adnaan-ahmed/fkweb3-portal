import {FK_NFT} from "../tools/FkNFTManager";
import {Spacer, Text} from "@nextui-org/react";
import {useContractRead} from "@thirdweb-dev/react";
import {SmartContract} from "@thirdweb-dev/sdk";

type Props = {
    nft: FK_NFT
    contract: SmartContract
}

export default function ViewInfo({nft, contract}: Props) {
    const {data} = useContractRead(contract, 'getCouponCode', [nft.nft.metadata.id]);


    return (
        <div>
            <Text b size={16} color='grey'>COUPON</Text>
            <Spacer y={0.5}/>
            <Text h1 size={48} weight='bold' css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}>{`${data ?? ''}`}</Text>
        </div>
    )
}