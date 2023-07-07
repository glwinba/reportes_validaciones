import config from "../config.js";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

const oauth2Client = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: config.REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

export const uploadFile = async () => {
    console.log(config.CLIENT_ID, config.CLIENT_SECRET)
    try {
        const createFile = await drive.files.create({
            requestBody: {
                name: "computadora.jpeg",
                mimeType: 'image/jpeg'
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(path.join(__dirname, '../computadora.jpeg'))
            }
        })

        console.log(createFile.data)
    } catch (error) {
        console.log(error)
    }
};

export const deleteFile = () => {};
