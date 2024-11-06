import multer, {Options} from "multer";
import path from "path";
import fs from "fs";
import config from "../config/config";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id} = req.body
        const basePath = config.URL_BASE_PATH || "";
        const folderPath = path.join(__dirname, '..', `..`, 'uploads');
        // Verificar se o diretório existe
        if (!fs.existsSync(folderPath)) {
            // Criar diretório se não existir
            fs.mkdirSync(folderPath, { recursive: true });
        }

        cb(null, folderPath);
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1000 * 1024 * 1024, // Limite de 100MB por arquivo
    },
});

export default upload;
