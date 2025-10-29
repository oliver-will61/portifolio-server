import { Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export class ConversaoService {
    private baseURL: string

    constructor() {
        this.baseURL = String(process.env.CONVERSOR_API_URL);
    }

    async enviaParaAPI(req: Request, res: Response) {
        try {

            const formData = new FormData();
            formData.append('arquivo', 
                fs.createReadStream(req.file!.path),
                {
                    filename: req.file!.originalname,
                    contentType: req.file!.mimetype
                }
            );

            const resposta = await axios.post(
                `${this.baseURL}/api/xlsx-json`,
                formData, 
                {
                    headers: {
                        ...formData.getHeaders()
                    },
                    timeout: 30000,
                    responseType: 'arraybuffer' //definimos o tipo do response
                }
            );

            // Limpa o arquivo temporário
            fs.unlinkSync(req.file!.path);

            console.log("Resposta do Python: ", resposta.data)

            // Define os headers para forçar download no cliente final
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', resposta.headers['content-disposition'] || `attachment; filename="${req.file!.originalname}.json"`)
            return res.send(resposta.data)

        } catch (error: any) {
            console.error('❌ Erro detalhado:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
        
            // Limpa arquivo temporário em caso de erro
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }        

            return res.status(500).json({
                mensagem: "Erro ao processar arquivo Python",
                erro: error.response?.data || error.message 
            });   
        }
    }
}