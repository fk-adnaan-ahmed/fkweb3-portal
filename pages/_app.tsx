import type {AppProps} from "next/app";
import {magicLink, ThirdwebProvider} from "@thirdweb-dev/react";
import "../styles/globals.css";
import {MAGIC_LINK_API_KEY, RELAYER_URL} from "../constants/keys";
import {Mumbai} from "@thirdweb-dev/chains";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "next-themes";
import {Directory} from "../tools/DirectoryManager";
import React, {useState} from "react";
import {DirectoryContext} from "../tools/DirectoryContext";

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

    const _directory: Directory = {};
    const [directory, setDirectory] = useState(_directory)

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
                    <DirectoryContext.Provider value={{directory, setDirectory}}>
                        <Component {...pageProps} />
                    </DirectoryContext.Provider>
                </ThirdwebProvider>
            </NextUIProvider>
        </ThemeProvider>
    );
}

export default MyApp;
