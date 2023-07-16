import {useAddress, useContract} from "@thirdweb-dev/react";
import {NextPage} from "next";
import React, {useContext, useState} from "react";
import {FLIP_PASS_CONTRACT_ADDRESS} from "../constants/addresses";
import SplashComponent from "../page-components/SplashComponent";
import {DirectoryContext, DirectoryContextType} from "../tools/DirectoryContext";
import DirectoryManager from "../tools/DirectoryManager";
import HomeComponent from "../page-components/HomeComponent";

const Home: NextPage = () => {
    const address = useAddress()
    const {contract} = useContract(FLIP_PASS_CONTRACT_ADDRESS);
    const [progress, setProgress] = useState(0);
    const {directory: _, setDirectory} = useContext(DirectoryContext) as DirectoryContextType;

    if (!!address && !!contract) {
        DirectoryManager.populateDirectory2(address, contract, setProgress)
            .then(value => {
                setDirectory(value);
                setProgress(100)
            })
            .catch(reason => console.error(reason));
    }

    if (progress < 100 || !address || !contract) return <SplashComponent address={address} progress={progress}/>

    return <HomeComponent address={address} contract={contract}/>;


    // return <HomeComponent/>
    // return <SplashComponent/>


    //
    // return (
    //     <main className={styles.main}>
    //         <div className={styles.container}>
    //
    //             <App/>
    //
    //
    //             <div className={styles.header}>
    //                 <h1 className={styles.title}>
    //                     Welcome to{" "}
    //                     <span className={styles.gradientText0}>
    //           <text>FK NFT</text>
    //         </span>
    //                 </h1>
    //
    //                 <p className={styles.description}>
    //                     A new era of internet. Migrate from Web2 to Web3 in{" "}
    //                     <span className={styles.gradientText0}>
    //           <text> Flipkart NFT Marketplace</text>
    //         </span>
    //                 </p>
    //
    //                 <div className={styles.connect}>
    //                     <ConnectWallet
    //                         dropdownPosition={{
    //                             side: "bottom",
    //                             align: "center",
    //                         }}
    //                     />
    //                 </div>
    //             </div>
    //             <div className={styles.claim}>
    //                 {!!address ? <Web3Button
    //                     contractAddress={FLIP_PASS_CONTRACT_ADDRESS}
    //                     action={contract => contract.erc1155.claim(0, 2)}
    //                     onSuccess={_result => window.alert("Claim successful")}
    //                     onError={error => window.alert(error.message)}
    //                 >
    //                     Claim
    //                 </Web3Button> : <text>Please connect to the wallet</text>}
    //
    //             </div>
    //
    //
    //             <div className={styles.claim}>
    //                 <Web3Button
    //                     contractAddress={FLIP_PASS_CONTRACT_ADDRESS}
    //                     onSuccess={_result => window.alert("Burn successful")}
    //                     onError={error => window.alert(error.message)}
    //                     action={contract => contract.call('safeTransferFrom', [
    //                         address, '0xF1a63Af7c21A651DC24d962e3F6cA88ae4410401', 0, 1, []
    //                     ])}>
    //                     BURN
    //                 </Web3Button>
    //             </div>
    //
    //             <div style={{flexDirection: 'column', padding: 32}}>
    //                 <Web3Button contractAddress={FLIP_PASS_CONTRACT_ADDRESS}
    //                             action={contract1 => setTotalCount(address, 0, contract1, setCount)}>
    //                     GET COUNT
    //                 </Web3Button>
    //                 <Text style={{marginLeft: 8, color: 'white'}}>{`total count: ${count}`}</Text>
    //                 <Text style={{marginLeft: 8, color: 'white'}}>{`total coins: ${coins}`}</Text>
    //
    //
    //             </div>
    //
    //
    //             <div className={styles.grid}>
    //                 <a
    //                     href="https://portal.thirdweb.com/"
    //                     className={styles.card}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     <Image
    //                         src="/images/portal-preview.png"
    //                         alt="Placeholder preview of starter"
    //                         width={300}
    //                         height={200}
    //                     />
    //                     <div className={styles.cardText}>
    //                         <h2 className={styles.gradientText1}>Portal ➜</h2>
    //                         <p>
    //                             Guides, references, and resources that will help you build with
    //                             thirdweb.
    //                         </p>
    //                     </div>
    //                 </a>
    //
    //                 <a
    //                     href="https://thirdweb.com/dashboard"
    //                     className={styles.card}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     <Image
    //                         src="/images/dashboard-preview.png"
    //                         alt="Placeholder preview of starter"
    //                         width={300}
    //                         height={200}
    //                     />
    //                     <div className={styles.cardText}>
    //                         <h2 className={styles.gradientText2}>Dashboard ➜</h2>
    //                         <p>
    //                             Deploy, configure, and manage your smart contracts from the
    //                             dashboard.
    //                         </p>
    //                     </div>
    //                 </a>
    //
    //                 <a
    //                     href="https://thirdweb.com/templates"
    //                     className={styles.card}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     <Image
    //                         src="/images/templates-preview.png"
    //                         alt="Placeholder preview of templates"
    //                         width={300}
    //                         height={200}
    //                     />
    //                     <div className={styles.cardText}>
    //                         <h2 className={styles.gradientText3}>Templates ➜</h2>
    //                         <p>
    //                             Discover and clone template projects showcasing thirdweb
    //                             features.
    //                         </p>
    //                     </div>
    //                 </a>
    //             </div>
    //         </div>
    //     </main>
    // );
};


export default Home;
