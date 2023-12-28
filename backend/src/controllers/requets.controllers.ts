import { Request, Response } from 'express';
import { uploadImage } from '../utils/cloudinary';
import fs from "fs-extra";

export const publicRequest = async (req: Request, res: Response) => {
    res.send({ message: "Public Request" })
}


export const protectedRequest = async (req: Request, res: Response) => {
    res.send({ message: "Protected Request" })
}

export const uploadImageWithCloudinary = async (req: Request, res: Response) => {
    const image = req.files?.image
    console.log(image)
    let imageUploaded = null

    if (image) {
        if ("tempFilePath" in image) {
            imageUploaded = await uploadImage(image.tempFilePath)
            await fs.unlink(image.tempFilePath)
        }
    }

    res.status(200).send({ message: "Upload Request Success", data: imageUploaded })
}