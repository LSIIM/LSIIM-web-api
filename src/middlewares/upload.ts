import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import config from "../config/config";

// Função para criar uma pasta temporária
function createTempFolder(tempUUID: string) {
    const tempFolderPath = path.join(config.recordingPath, tempUUID);
    if (!fs.existsSync(tempFolderPath)) {
        fs.mkdirSync(tempFolderPath, { recursive: true });
    }
    return tempFolderPath;
}

// Configuração do multer para salvar na pasta temporária
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempUUID = randomUUID();
        (req as any).tempUUID = tempUUID;
        // UUID passado pelo controller
        const tempFolderPath = createTempFolder(tempUUID);
        cb(null, tempFolderPath);
    },
    filename: (req, file, callback) => {
        callback(null, `${(req as any).tempUUID}_${file.originalname}`);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ["video/mp4", "video/avi", "video/quicktime", "video/webm"];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo inválido"));
        }
    },
    limits: {
        fileSize: 1000 * 1024 * 1024, // Limite de 100MB por arquivo
    },
});

export default upload;
