import express from 'express'
import path from 'path'

const app = express()

app.use(express.json());
app.use(express.static('public'))

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

// ✅ REGISTRE O ROUTER NA APLICAÇÃO
app.use('/', router)

export default app;
