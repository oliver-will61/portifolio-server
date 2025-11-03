import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

import {xlsxForJsonController} from '../controllers/goodbyepdf/xlsxForJsonController'

const router = express.Router();
const app = express();

app.use(express.json())
app.use(cors());


//configuração do multer para tratar arquivos
const upload = multer({
    dest: 'upload', // pasta temporaria para salvar arquivos 
});


router.post('/xlsx-json', upload.single('arquivo'), async (req, res, next) => {
    xlsxForJsonController(req, res).catch(next)   
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/goodbyepdf/xlsxForJson.html'))
})

export default router
