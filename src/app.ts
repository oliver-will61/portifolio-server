import express from 'express'
import cors from 'cors'
import path from 'path'

import goodbypdRouter from './router/goodbyepdfRouter'
 

const app = express()

app.use(express.json());
app.use(cors())
app.use(express.static('public'))

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

//registra rota
app.use('/', router)
app.use('/goodbyepdf', goodbypdRouter)

export default app;
