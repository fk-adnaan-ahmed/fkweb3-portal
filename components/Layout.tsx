import {Box} from "./Box";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {NoSSR} from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";


export const Layout = ({children}) => (
    <NoSSR>
        <Box css={{
            maxW: '100%'
        }}>
            {children}
            <ToastContainer/>
        </Box>
    </NoSSR>
)