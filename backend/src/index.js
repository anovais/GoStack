const express = require('express');

const app = express();

app.use(express.json());

/**
 * Tipos de Parâmetros
 * Query params = request.query
 * Route params = request.params
 * Body params = request.body ( exige a declaração use(express.json()))
 */


 /** Middlewares -> são interceptadores (filters) que podem interromper ou modificar/formatar dados da requisição */

function middleWareLogRequests(request,response,next){    
    const {url} = request;
    console.log(url);
    next();
}

app.use(middleWareLogRequests);

const projects = [
    {
        id: 1,
        name: 'SONORA'
    },
    {
        id: 2,
        name: 'SICOM'
    },
    {
        id: 3,
        name: 'FTG'
    }
]

/**Listar projetos */
app.get('/projects', (request, response) => {
    return response.json(projects);
});

/**Adicionar projetos */
app.post('/projects', (request, response) => {
    const { id, name } = request.body;

    projects.push({ id, name });
    return response.json(projects);
});

/** Atualizar um projeto projetos */
app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    const result = projects.map(p => p.id == id ? { id, name } : p);
    return response.status(200).json(result);
});

/** Excluir um projeto */
app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    const result = projects.filter(p => p.id != id);
    response.json(result);
})
app.listen(3333, () => { console.log('starting app 👍') });


