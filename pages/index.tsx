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
                <a
                    href="https://portal.thirdweb.com/"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/images/portal-preview.png"
                        alt="Placeholder preview of starter"
                        width={300}
                        height={200}
                    />
                    <div className={styles.cardText}>
                        <h2 className={styles.gradientText1}>Portal ➜</h2>
                        <p>
                            Guides, references, and resources that will help you build with
                            thirdweb.
                        </p>
                    </div>
                </a>

                <a
                    href="https://thirdweb.com/dashboard"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/images/dashboard-preview.png"
                        alt="Placeholder preview of starter"
                        width={300}
                        height={200}
                    />
                    <div className={styles.cardText}>
                        <h2 className={styles.gradientText2}>Dashboard ➜</h2>
                        <p>
                            Deploy, configure, and manage your smart contracts from the
                            dashboard.
                        </p>
                    </div>
                </a>

                <a
                    href="https://thirdweb.com/templates"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/images/templates-preview.png"
                        alt="Placeholder preview of templates"
                        width={300}
                        height={200}
                    />
                    <div className={styles.cardText}>
                        <h2 className={styles.gradientText3}>Templates ➜</h2>
                        <p>
                            Discover and clone template projects showcasing thirdweb
                            features.
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </main>
)