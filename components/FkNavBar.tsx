import {Avatar, Navbar, Text} from "@nextui-org/react";
import {ConnectWallet} from "@thirdweb-dev/react";
import React from "react";
import Link from "next/link";


type Props = {
    activeTab: string
}
export default function FkNavBar({activeTab}: Props) {
    return (
        <Navbar isBordered variant='sticky'>
            <Navbar.Brand>
                <Text b>FLIPKART NFT PORTAL</Text>
            </Navbar.Brand>
            <Navbar.Content hideIn='xs' activeColor='secondary' variant='underline'>
                <Navbar.Link href='#' isActive={activeTab === 'home'}><Link href='/'
                                                                            style={{color: 'white'}}>Home</Link></Navbar.Link>
                <Navbar.Link href='#' isActive={activeTab === 'buy'}><Link href='/buy'
                                                                           style={{color: 'white'}}>Buy</Link></Navbar.Link>
                <Navbar.Link href='#' isActive={activeTab === 'sell'}><Link href='/sell'
                                                                            style={{color: 'white'}}>Sell</Link></Navbar.Link>
                <Navbar.Link href='#' isActive={activeTab === 'transfer'}><Link href='/transfer'
                                                                            style={{color: 'white'}}>Transfer</Link></Navbar.Link>

            </Navbar.Content>
            <Navbar.Content activeColor='secondary' variant='underline'>
                <Navbar.Link>
                    <ConnectWallet
                        dropdownPosition={{
                            side: "bottom",
                            align: "center",
                        }}
                    />
                </Navbar.Link>
                <Navbar.Item isActive={activeTab === 'profile'}>
                    <Link href='/profile'>
                        <Avatar
                            color='gradient'
                            size="lg"
                            src="https://i.pravatar.cc/150?u=a048581f4e29026701d"
                            zoomed
                            bordered
                        />
                    </Link>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}
