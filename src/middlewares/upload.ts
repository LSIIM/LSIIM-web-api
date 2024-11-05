import multer from "multer";
import path from "path";
import config from "../config/config";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.body;

        const basePath = config.URL_BASE_PATH || "";
        const folderPath = path.join(__dirname, basePath, `videos`, String(id));

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const { projectVideoTypeId } = req.body;
        cb(null, projectVideoTypeId + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "video/mp4" || file.mimetype === "video/avi") {
            cb(null, true);
        } else {
            cb(new Error("Formato de arquivo inválido. Apenas arquivos mp4 e avi são aceitos."));
        }
    },
    limits: {
        fileSize: 100 * 1024 * 1024, // Limite de 100MB por arquivo
    },
});

export default upload;
