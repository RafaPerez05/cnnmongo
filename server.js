const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3003;

const url = "mongodb+srv://rafaelsilva707:c1tS4IJi15Eu6NPj@cluster0.zxnap1i.mongodb.net/?retryWrites=true&w=majority";
const dbName = "teste";
const collectionName = "alunos";

app.get('/alunos', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = await collection.find({}).toArray();
    res.json(documents);

    client.close();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
