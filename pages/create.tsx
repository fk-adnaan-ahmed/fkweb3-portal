import {NextPage} from "next";
import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {Spacer, Text} from "@nextui-org/react";
import CanvasComponent from "../components/CanvasComponent";

const Create: NextPage = () => {
    return (
        <Layout>
            <FkNavBar activeTab='profile'/>
            <Spacer y={2}/>
            <CanvasComponent/>
        </Layout>
    )
}

export default Create;