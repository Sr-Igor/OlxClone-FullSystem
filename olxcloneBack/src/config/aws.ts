import { S3 } from "aws-sdk"
import dotenv  from "dotenv"
import fs from "fs"

dotenv.config()

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESSkEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    region: process.env.AWS_REGION,
})

export const s3Upload = async (file: Express.Multer.File) => {
    const contentFile = await fs.promises.readFile(`./public/media/${file.filename}.jpg`)

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `media/${file.filename}.jpg`,
        Body: contentFile,
        ACL: "public-read"
    }

    await s3.upload(params).promise()
    fs.unlink(`./public/media/${file.filename}.jpg`, (err) => {
        if (err) throw err;
    });
}

export const s3Delete = async (file: Express.Multer.File) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `${file.filename}.jpg`,
    }

   await s3.deleteObject(params).promise()

}