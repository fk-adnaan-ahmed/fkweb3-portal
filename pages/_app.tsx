import type {AppProps} from "next/app";
import {magicLink, ThirdwebProvider} from "@thirdweb-dev/react";
import "../styles/globals.css";
import {MAGIC_LINK_API_KEY, RELAYER_URL} from "../constants/keys";
import {Mumbai} from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThirdwebProvider
            activeChain={Mumbai}
            supportedWallets={[
                magicLink({
                    apiKey: MAGIC_LINK_API_KEY
                })
            ]}
            sdkOptions={{
                gasless: {
                    openzeppelin: {
                        relayerUrl: RELAYER_URL
                    }
                }
            }}
        >
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default MyApp;
