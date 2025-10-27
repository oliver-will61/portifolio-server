import { dot } from 'node:test/reporters'
import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, () => {
    console.log(`Servidor rodando em ${HOST}:${PORT}`);
});