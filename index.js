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

app.get('/bruxo', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxo');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todos os bruxos');
        res.status(500).send({ mensagem: 'Erro ao obter bruxo' });
    }
});

app.post('/bruxo', async (req, res) => {
    try {
        const { nome, idade, casa, habilidade, sangue, patrono } = req.body;
  
        await pool.query('INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, sangue, patrono]);
        res.status(201).send({ mensagem: 'Bruxocriado com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao adicionar bruxo', error);
        res.status(500).send('Erro ao criar bruxo');
    }
  });

  app.put('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa, habilidade, sangue, patrono } = req.body;
  
        await pool.query('UPDATE bruxo SET nome =$1, idade = $2, casa = $3, habilidade = $4, sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa, habilidade, sangue, patrono, id]);
        res.status(200).send({ mensagem: 'Bruxo atualizado com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao atualizar bruxo', error);
        res.status(500).send('Erro ao atualizar bruxo');
    }
  });

  app.delete('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxo WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Bruxodeletado com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao excluir Bruxo ', error);
        res.status(500).send({ mensagem: 'Erro ao deletar o Bruxo ' });
    }
});




//rota teste
app.get('/',(req,res) =>{
    res.send('Servidor funcionando');
}
)

//inicializar o servidor
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port} 🎇`)
});