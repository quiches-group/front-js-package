import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { UploadedFile } from 'express-fileupload';

// export default class FileOld {
//     apiKey: string;
//
//     hostname: string;
//
//     constructor({ apiKey, hostname = 'https://bay.maxencemottard.com' }: { apiKey: string; hostname?: string }) {
//         this.apiKey = apiKey;
//         this.hostname = hostname;
//     }
//
//     uploadFileToServer = async (filePath: string): Promise<string> => {
//         const formData = new FormData();
//
//         formData.append('files', fs.createReadStream(filePath));
//
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 authorization: this.apiKey,
//                 ...formData.getHeaders(),
//             },
//             data: formData,
//             method: 'POST',
//             url: `${this.hostname}/upload`,
//         };
//
//         // @ts-ignore
//         const result = await axios(config);
//
//         if (result.data?.files?.length <= 0) {
//             throw new Error('No file upload');
//         }
//
//         const uploadedFile = result.data.files[0];
//
//         return uploadedFile.url as string;
//     }
//
//     uploadFileToServerFromExpressFileUpload = async (file: UploadedFile): Promise<string> => {
//         const filePath = `/tmp/file-server-${Date.now()}`;
//         await file.mv(filePath);
//
//         return this.uploadFileToServer(filePath);
//     }
// }
