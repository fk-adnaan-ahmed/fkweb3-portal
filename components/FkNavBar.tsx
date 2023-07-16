import {Navbar, Text} from "@nextui-org/react";
import {ConnectWallet} from "@thirdweb-dev/react";
import CoinBalance from "./CoinBalance";
import React from "react";
import Link from "next/link";

export default function FkNavBar(props: FkNavBarProps) {
    return (
        <Navbar isBordered variant='sticky'>
            <Navbar.Brand>
                <Text b>FLIPKART NFT PORTAL</Text>
            </Navbar.Brand>
            <Navbar.Content hideIn='xs' activeColor='secondary' variant='underline'>
                <Navbar.Link href='#' isActive={props.activeTab === 'home'}><Link href='/' style={{color: 'white'}}>Home</Link></Navbar.Link>
                <Navbar.Link href='#' isActive={props.activeTab === 'passes'}><Link href='/passes' style={{color: 'white'}}>Passes</Link></Navbar.Link>
                <Navbar.Link href='#' isActive={props.activeTab === 'transfer'}><Link href='/transfer' style={{color: 'white'}}>Transfer</Link></Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link>
                    <ConnectWallet
                        dropdownPosition={{
                            side: "bottom",
                            align: "center",
                        }}
                    />
                </Navbar.Link>
                <Navbar.Item>
                    <CoinBalance/>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}

export interface FkNavBarProps {
    activeTab: string
}