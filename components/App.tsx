import React from "react";
import FkNavBar from "./FkNavBar";
import {Layout} from "./Layout";
import NFTCard from "./NFTCard";


export default function App() {
    return (
        <Layout>
            <FkNavBar activeTab='passes'/>
            {/*<NFTCard id={1}/>*/}
        </Layout>
    )
}