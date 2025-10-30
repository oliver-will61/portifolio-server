
import { Request, Response } from 'express'; // ← Importe do Express
import { ConversaoService } from '../../services/goodbyepdf/ConversaoService';


export const xlsxForJsonController = async (req: Request, res: Response) => {
    try {    

        if (!req.file) {
            return res.status(400).json({
                mensagem: "Nenhum arquivo enviado"
            })
        }

        console.log("Enviando para a API do Python...");

        console.log(req.file);
        
        const conversaoService = new ConversaoService

        // envia o arquivo para a API de conversão
        conversaoService.enviaParaAPI(req, res)        
    }

    catch (error) {
        console.error("Erro no arquivo", error)

        return res.status(500).json({
            mensagem:"Erro no servidor",
            error: error 
        })
    }
}
    