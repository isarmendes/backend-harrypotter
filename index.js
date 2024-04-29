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

        if (sangue === "touxa" || sangue === "mestiço" || sangue === "puro") {
            console.log('Sangue válido.');
           }  else {
             console.log('Tipo de sangue inválido.');
             res.status(400).send('Erro ao criar bruxo tipo de sangue inválido');
       }
  
       if (casa === "sonserina" || casa === "grifinória" || casa === "lufa-lufa" || casa === "corvinal") {
        console.log('Casa válida.');
       }  else {
         console.log('Essa casa não existe.');
         res.status(400).send('Erro ao criar bruxo com essa casa pois ela não existe');
   }
        await pool.query('INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, sangue, patrono]);
        res.status(201).send({ mensagem: 'Bruxo criado com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao adicionar bruxo', error);
        res.status(500).send('Erro ao criar bruxo casa não existe');
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
        res.status(200).send({ mensagem: 'Bruxo deletado com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao excluir Bruxo ', error);
        res.status(500).send({ mensagem: 'Erro ao deletar o Bruxo ' });
    }
});

app.get('/bruxo/nome/:nome', async (req, res) => {
   
    try {
        const {nome} = req.params
        console.log(nome);
        console.log( typeof(nome));
        const resultado = await pool.query('SELECT * FROM bruxo WHERE nome = $1', [nome]);
        if(resultado.rows.length === 0){
            res.status(404).send({ mensagem: 'Bruxo {nome} nao encontrado'});
        }else{
            res.status(200).send(resultado.rows[0]);
        }
        
    } catch (error) {
        console.error('Erro ao obter todos os bruxos');
        res.status(500).send({ mensagem: 'Erro ao obter bruxo' });
    }
});


// Varinhas

app.get('/varinha', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinha');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todas as varinhas');
        res.status(500).send({ mensagem: 'Erro ao obter varinha' });
    }
});

app.post('/varinha', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
  
        await pool.query('INSERT INTO varinha (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
        res.status(201).send({ mensagem: 'Varinha criada com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao adicionar varinha', error);
        res.status(500).send('Erro ao criar varinha');
    }
  });


  app.put('/varinha/:id', async (req, res) => {

    
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
  
        await pool.query('UPDATE varinha SET material =$1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_fabricacao, id]);
        res.status(200).send({ mensagem: 'Varinha atualizada com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao atualizar varinha', error);
        res.status(500).send('Erro ao atualizar varinha');
    }
  });

  
  app.delete('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinha WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Varinhadeletado com sucesso 🎇' });
    } catch (error) {
        console.error('Erro ao excluir Varinha ', error);
        res.status(500).send({ mensagem: 'Erro ao deletar o Varinha ' });
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