const e = require('express');
const express = require('express');
const {Pool} = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harrypotter',
    password: 'ds564',
    port: 7007
});

//rota teste
app.get('/',(req,res) =>{
    res.send('Servidor funcionando');
}
)

//inicializar o servidor
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
});