import {Box} from "./Box";
import {PlaceholderContent} from "./PlaceholderContent";

export const Layout = ({children}) => (
    <Box css={{
        maxW: '100%'
    }}>
        {children}
        {/*<PlaceholderContent/>*/}
    </Box>
)