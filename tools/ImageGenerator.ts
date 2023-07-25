import {createCanvas, loadImage} from "canvas";

export const CANVAS_WIDTH = 512;
export const CANVAS_HEIGHT = 512;
const ratio = 1;

export async function generateImage(bg: string, body: string, cloth: string, face: string, chest: string) {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    const ctx = canvas.getContext('2d');


    const w = canvas.width * ratio;
    const h = canvas.width * ratio;
    ctx.imageSmoothingEnabled = false;

    const bgImage = await loadImage(`/layers/background/${bg}.png`);
    ctx.drawImage(bgImage, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    const bodyImage = await loadImage(`/layers/body/${body}.png`);
    ctx.drawImage(bodyImage, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    if (cloth !== '0') {

        const clothImage = await loadImage(`/layers/clothing/${cloth}.png`);
        ctx.drawImage(clothImage, 0, 0, w, h);
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    }

    const faceImage = await loadImage(`/layers/face/${face}.png`);
    ctx.drawImage(faceImage, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    if (chest !== '0') {

        const chestImage = await loadImage(`/layers/chest/${chest}.png`);
        ctx.drawImage(chestImage, 0, 0, w, h);
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    }

    return canvas.toDataURL();
}