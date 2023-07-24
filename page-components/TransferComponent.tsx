import {useState} from "react";
import {Input, Spacer} from "@nextui-org/react";
import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {Web3Button} from "@thirdweb-dev/react";
import {TRANSFER_ADDRESS} from "../constants/addresses";
import {showToast} from "../tools/Toast";
import {ethers} from "ethers";

export default function TransferComponent() {

    const [amount, setAmount] = useState('')

    return (
        <Layout>
            <FkNavBar activeTab='transfer'/>
            <div style={{
                flexDirection: 'column',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '4rem'
            }}>
                <Input bordered placeholder='0.0' label='Transfer Amount' width='80%' size='xl' color='secondary'
                       labelRight='MATIC' type='number' onChange={e => setAmount(e.target.value)}/>
                <Spacer y={2}/>
                <Web3Button
                    style={{width: '80%', color: 'white', background: '#7928CA'}}
                    isDisabled={!isValidEntry(amount)}
                    contractAddress={TRANSFER_ADDRESS}
                    action={contract => {
                        console.log(`amount: ${ethers.utils.parseEther(amount)}`)
                        contract.call('addToQueue', [Number(ethers.utils.parseEther(amount))])
                            .then(_ => showToast("Transfer successful", 'success'))
                            .catch(reason => {
                                showToast('Transfer unsuccessful', 'error')
                                console.log(reason)
                            })
                    }}>TRANSFER</Web3Button>
            </div>
        </Layout>
    )

}

function isValidEntry(amount: string) {
    return Number(amount) > 0;
}


