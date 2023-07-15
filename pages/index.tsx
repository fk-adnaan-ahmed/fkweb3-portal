import {ConnectWallet, useAddress, Web3Button} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image"
import {NextPage} from "next";
import {NFT_CONTRACT_ADDRESS} from "../constants/keys";
import React from "react";

const Home: NextPage = () => {
    const address = useAddress()
    return (
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

                    <div className={styles.connect}>
                        <ConnectWallet
                            dropdownPosition={{
                                side: "bottom",
                                align: "center",
                            }}
                        />
                    </div>
                </div>
                <div className={styles.claim}>
                    {!!address ? <Web3Button
                        contractAddress={NFT_CONTRACT_ADDRESS}
                        action={contract => contract.erc1155.claim(0, 1)}
                        onSuccess={_result => window.alert("Claim successful")}
                        onError={error => window.alert(error.message)}
                    >
                        Claim
                    </Web3Button> : <text>Please connect to the wallet</text>}

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
    );
};

export default Home;
