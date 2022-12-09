import express from "express"

export const app = express()

app.use(express.json())


const livros = [
  {id: 1, "titulo": "Senho dos Aneis"},
  {id: 2, "titulo": "O hobbit"}
]

app.get('/', (request, response) =>{
  response.status(200).send('Curso Node')
})

app.get('/livros', (request, response) => {
  response.status(200).json(livros)
})

app.post('/livros', (request, response) => {
  livros.push(request.body)

  return response.status(201).send('Livro cadastrado com sucesso')
})