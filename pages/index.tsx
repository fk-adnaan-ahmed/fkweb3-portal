import {ChainId, useAddress, useNetworkMismatch, useSwitchChain} from "@thirdweb-dev/react";
import {NextPage} from "next";
import React, {useEffect} from "react";
import styles from "../styles/Home.module.css";
import SplashComponent from "../page-components/SplashComponent";
import Image from "next/image";
import {showToast} from "../tools/Toast";
import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {Spacer} from "@nextui-org/react";
import Link from "next/link";

const Home: NextPage = () => {
    const address = useAddress();
    const switchChain = useSwitchChain();
    const isWrongNetwork = useNetworkMismatch()

    useEffect(() => {
        if (isWrongNetwork && switchChain) {
            switchChain(ChainId.Mumbai)
                .then(value => showToast('chain switched'))
                .catch(reason => showToast('chain switch failed', 'error'))
        }
    }, [address, isWrongNetwork, switchChain])

    if (!address) return <SplashComponent address={undefined} progress={20}/>
    return (
        <Layout>
            <FkNavBar activeTab='home'/>
            <Spacer y={1}/>
            <Temp/>
        </Layout>

    );
};


export default Home;


const Temp = () => (
    <main className={styles.main}>
        <div className={styles.container}>

            <div className={styles.header}>
                <h1 className={styles.title}>
                    Welcome to{" "}
                    <span className={styles.gradientText0}>
              <text>FK NFT</text>
            </span>
                </h1>

                <p className={styles.description}>
                    A new era of internet. Migrate from Web2 to Web3 in{" "}
                    <span className={styles.gradientText0}>
              <text> Flipkart NFT Marketplace</text>
            </span>
                </p>
            </div>


            <div className={styles.grid}>
                <Link href='/buy' style={{color: 'white'}}>
                    <div
                        className={styles.card}
                    >
                        <Image
                            src="/images/portal-preview.png"
                            alt="Placeholder preview of starter"
                            width={300}
                            height={200}
                        />
                        <div className={styles.cardText}>
                            <h2 className={styles.gradientText1}>Buy NFTs ➜</h2>
                            <p>
                                Browse through the plethora of NFTs will are released. It can be special discount
                                coupons or pass for exclusive services like priority shipping and pre-order.
                            </p>
                        </div>
                    </div>
                </Link>
                <Link href='/sell' style={{color: 'white'}}>
                    <div
                        className={styles.card}
                    >
                        <Image
                            src="/images/dashboard-preview.png"
                            alt="Placeholder preview of starter"
                            width={300}
                            height={200}
                        />
                        <div className={styles.cardText}>
                            <h2 className={styles.gradientText2}>Sell ➜</h2>
                            <p>
                                Sell your owned NFTs to other Flip users. You can swap up for something much cooler or
                                just sell it for profit. Everything is in MATIC after all.
                            </p>
                        </div>
                    </div>
                </Link>
                <Link href='/profile' style={{color: 'white'}}>
                    <div
                        className={styles.card}
                    >
                        <Image
                            src="/images/templates-preview.png"
                            alt="Placeholder preview of templates"
                            width={300}
                            height={200}
                        />
                        <div className={styles.cardText}>
                            <h2 className={styles.gradientText3}>Profile ➜</h2>
                            <p>
                                Checkout your owned NFTs which can give you access to exclusive benefits or special unique discount codes just for you.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </main>
)