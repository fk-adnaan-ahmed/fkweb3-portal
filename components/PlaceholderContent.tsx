import { Text, Spacer } from "@nextui-org/react"
import { Box } from "./Box";
import styles from "../styles/Home.module.css";
import React from "react";


export const PlaceholderContent = () => (
    <Box css={{px: "$12", mt: "$8"}}>

        <Text h1> Welcome to{" "}
            <span className={styles.gradientText0}>
                Flipkart NFT Portal
            </span>
        </Text>
        <Text h2>Lorem ipsum dolor sit amet</Text>
        <Text size="$lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
            fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
            egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
            placerat duis ultricies.
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
            Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
            sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
            proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
            tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
            gravida in.
        </Text>
        <Spacer y={1} />
    </Box>
);
