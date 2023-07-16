import {PageComponentProps} from "../models/PageComponentProps";
import {useState} from "react";
import {Input, Spacer} from "@nextui-org/react";
import {Layout} from "../components/Layout";
import FkNavBar from "../components/FkNavBar";
import {Web3Button} from "@thirdweb-dev/react";
import {FKC_ADDRESS} from "../constants/addresses";


export default function TransferComponent({address}: PageComponentProps) {

    const [amount, setAmount] = useState('')
    const [toAddress, setToAddress] = useState('');


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
                       labelRight='FKC' type='number' onChange={e => setAmount(e.target.value)}/>
                <Spacer y={2}/>
                <Input bordered placeholder={address} label='Transfer Account' width='80%' size='xl' color='secondary' onChange={e => setToAddress(e.target.value)}/>
                <Spacer y={2}/>
                <Web3Button
                    style={{width: '80%', color: 'white', background: '#7928CA'}}
                    isDisabled={!isValidEntry(amount, toAddress, address)}
                    onSuccess={result => window.alert('SUCCESS')}
                    onError={error => window.alert(error.message)}
                    contractAddress={FKC_ADDRESS}
                    action={contract1 => contract1.erc20.transfer(toAddress, Number(amount))}>TRANSFER</Web3Button>
            </div>
        </Layout>
    )

}

function isValidEntry(amount: string, toAddress: string, address: string) {
    return Number(amount) > 0 && toAddress !== address && toAddress.length === address.length;
}


