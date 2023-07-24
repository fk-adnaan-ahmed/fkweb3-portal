import {Spacer, Text} from "@nextui-org/react";
import {Web3Button} from "@thirdweb-dev/react";
import {MARKETPLACE_ADDRESS} from "../constants/addresses";
import {showToast} from "../tools/Toast";
import React, {Dispatch, SetStateAction} from "react";
import {DirectListingV3} from "@thirdweb-dev/sdk";

type Props = {
    directListing: DirectListingV3 | undefined
    setVisible: Dispatch<SetStateAction<boolean>>
}
export default function BuyInfo({directListing, setVisible}: Props) {

    return (
        <div>
            <Text b size={16} color='grey'>PRICE</Text>
            <Spacer y={0.2}/>
            <Text b
                  size={24}>{!directListing ? 'Not Listed' : `Price: ${directListing.currencyValuePerToken.displayValue} ${directListing.currencyValuePerToken.symbol}`}</Text>
            <Spacer y={1}/>
            {!!directListing && <Web3Button contractAddress={MARKETPLACE_ADDRESS}
                                            onSuccess={_ => {
                                                setVisible(false);
                                                showToast('Claimed successfully', 'success');
                                            }}
                                            onError={error => showToast(error.message, 'error')}
                                            action={contract1 => contract1.directListings.buyFromListing(directListing.id, 1)}>
                BUY AT LISTED PRICE
            </Web3Button>}
        </div>
    )
}