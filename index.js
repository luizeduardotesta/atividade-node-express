const express = require("express")
const alunos = require("./alunos")

const app = express();
app.use(express.json());


app.get("/alunos", (request, response) => {
    const {nome, media} = request.query
    const nomeEncontrado = alunos.find(aluno => aluno.nome === nome)
    const mediaEncontrada = alunos.find(aluno => aluno.media === media)

    if(nomeEncontrado){
        response.json(nomeEncontrado)
    } else if(mediaEncontrada){
        response.json(mediaEncontrada)
    }else {
    response.json(alunos)
    }
});

app.post("/alunos/novo", (request, response) => {
    const {nome, media, matricula} = request.body
    const novoAluno = {nome: nome, media: media, matricula: matricula}

    if(nome !== undefined && media !== undefined && matricula !== undefined){
        alunos.push(novoAluno)
        response.json({novoAluno: novoAluno})
    }else {
        response.status(400).json({message: "Dados inválidos"})
    }
});

app.post("/alunos/deletar/:index", (request, response) => {
    const index = request.params.index;

    if (index < 0 || index >= alunos.length) {
        response.status(404).json({message: "Aluno não encontrado"})
    } else {
    alunos.splice(index, 1);
    response.send('Aluno removido com sucesso!');
    }
});

app.post('/alunos/atualizar/:index', (request, response, next) => {
    const index = request.params.index;
    const { nome, media } = request.body;

    if (index < 0 || index >= alunos.length) {
        response.status(404).json({message: "Aluno não encontrado"})
    } else {
    alunos[index].nome = nome;
    alunos[index].media = media;
    response.send('Dados do aluno atualizados com sucesso!');
    }
});


app.listen(3000, () => {
    // roda sempre que o servidor iniciar com sucesso
    console.log("Servidor rodando em http://localhost:3000/")
});