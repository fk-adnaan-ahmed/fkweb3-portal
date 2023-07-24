import {NFT} from "@thirdweb-dev/sdk";
import {ERC1155_ADDRESS, ERC721_ADDRESS} from "../constants/addresses";

export interface FK_NFT {
    nft: NFT,
    address: string
}

export function mergeNFTs(erc1155NFTs: NFT[] | undefined, erc721NFTs: NFT[] | undefined): FK_NFT[] {
    const fkNFTArr: FK_NFT[] = [];

    if (!!erc1155NFTs) {
        for (let nft of erc1155NFTs) {
            fkNFTArr.push({nft, address: ERC1155_ADDRESS})
        }
    }

    if (!!erc721NFTs) {
        for (let nft of erc721NFTs) {
            fkNFTArr.push({nft, address: ERC721_ADDRESS})
        }
    }
    return fkNFTArr;
}