import type {AppProps} from "next/app";
import {magicLink, metamaskWallet, ThirdwebProvider} from "@thirdweb-dev/react";
import "../styles/globals.css";
import {MAGIC_LINK_API_KEY, RELAYER_URL} from "../constants/keys";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "next-themes";
import React from "react";
import {SDKOptions} from "@thirdweb-dev/sdk";
import {Mumbai} from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({Component, pageProps}: AppProps) {

    const lightTheme = createTheme({type: "light"});
    const darkTheme = createTheme({
        type: "dark",
        className: 'dark-modern',
        theme: {
            colors: {
                primary: '#7928CA',
                primaryLight: '#582A87',
                success: '#FF1CF7'
            }
        }
    })

    const sdkOptions: Omit<SDKOptions, "chains"> = {
        gasless: {
            openzeppelin: {
                relayerUrl: RELAYER_URL
            }
        }
    }


    return (
        <ThemeProvider
            defaultTheme='system'
            attribute='class'
            value={{
                light: lightTheme.className,
                dark: darkTheme.className
            }}
        >
            <NextUIProvider>
                <ThirdwebProvider
                    activeChain={Mumbai}
                    supportedWallets={[
                        magicLink({
                            apiKey: MAGIC_LINK_API_KEY
                        }),
                        metamaskWallet()
                    ]}
                >
                        <Component {...pageProps} />
                </ThirdwebProvider>
            </NextUIProvider>
        </ThemeProvider>
    );
}

export default MyApp;
