import { OGSVG } from "./svg";

// @ts-ignore
const sharp = require('sharp')
const imageDataURI = require('image-data-uri');
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();

const convert = async (svg: string) => {
    try {
        const image = await sharp(Buffer.from(svg)).toBuffer()
        return image
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

app.get('/idea', async(req: any, res: any) => {
    const {title, description, author} = req.query
    if (!title || !description || !author) return
    try {
        const svgObj = OGSVG(title, description, author)
        const png = await convert(svgObj);
        if (!png.error) {
            res.set('Content-Type', 'image/png');
            res.send(png);
        } else {
            res.set('Content-Type', 'image/png');
            const defaultOG = fs.readFileSync(path.join(__dirname, '..', 'static', 'meta.png'))
            res.send(defaultOG)
        }
    } catch (e) {
        console.error(e)
        res.set('Content-Type', 'image/png');
        const defaultOG = fs.readFileSync(path.join(__dirname, '..', 'static', 'meta.png'))
        res.send(defaultOG)
    }
});


const port = process.env.PORT || 3000;

app.listen(process.env.PORT || port, () => {
    console.log('The server is running on', port)
})
