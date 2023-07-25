import {createCanvas, loadImage} from "canvas";
import {useEffect, useState} from "react";
import {Col, Container, Radio, Row, Spacer, Text} from "@nextui-org/react";
import Image from "next/image";
import {CANVAS_HEIGHT, CANVAS_WIDTH, generateImage} from "../tools/ImageGenerator";


export default function CanvasComponent() {

    const [dataUrl, setDataUrl] = useState('');
    const [bg, setBg] = useState('1');
    const [body, setBody] = useState('1');
    const [cloth, setCloth] = useState('1');
    const [face, setFace] = useState('1');
    const [chest, setChest] = useState('1');

    useEffect(() => {
        generateImage(bg, body, cloth, face, chest)
            .then(value => setDataUrl(value))
            .catch(reason => console.error(reason))
    }, [bg, body, cloth, face, chest]);



    return (
        <Container style={{padding: '2rem', alignItems: 'center', justifyContent: 'center'}}>
            <Text h1>Avatar Builder</Text>
            <Row>
                <img src={dataUrl} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
                <Spacer x={4}/>
                <Col>
                    <Radio.Group orientation='horizontal' label='background' defaultValue={'1'} value={bg} onChange={setBg}>
                        <Radio value='1'>
                            <Image src='/layers/background/1.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='2'>
                            <Image src='/layers/background/2.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='3'>
                            <Image src='/layers/background/3.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                    </Radio.Group>

                    <Spacer y={1}/>

                    <Radio.Group orientation='horizontal' label='body' defaultValue={'1'} value={body} onChange={setBody}>
                        <Radio value='1'>
                            <Image src='/layers/body/1.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='2'>
                            <Image src='/layers/body/2.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='3'>
                            <Image src='/layers/body/3.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                    </Radio.Group>

                    <Spacer y={1}/>

                    <Radio.Group orientation='horizontal' label='clothing' defaultValue={'1'} value={cloth} onChange={setCloth}>
                        <Radio value='0'>
                            <Image src='/images/forbidden.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='1'>
                            <Image src='/layers/clothing/1.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='2'>
                            <Image src='/layers/clothing/2.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='3'>
                            <Image src='/layers/clothing/3.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                    </Radio.Group>

                    <Spacer y={1}/>

                    <Radio.Group orientation='horizontal' label='face' defaultValue={'1'} value={face} onChange={setFace}>
                        <Radio value='1'>
                            <Image src='/layers/face/1.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='2'>
                            <Image src='/layers/face/2.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='3'>
                            <Image src='/layers/face/3.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                    </Radio.Group>

                    <Spacer y={1}/>

                    <Radio.Group orientation='horizontal' label='chest' defaultValue={'1'} value={chest} onChange={setChest}>
                        <Radio value='0'>
                            <Image src='/images/forbidden.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='1'>
                            <Image src='/layers/chest/1.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='2'>
                            <Image src='/layers/chest/2.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                        <Radio value='3'>
                            <Image src='/layers/chest/3.png' alt={'test'} height={128} width={128}/>
                        </Radio>
                    </Radio.Group>

                </Col>
            </Row>

        </Container>
    )

}