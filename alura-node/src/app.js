import express from "express"
import { db } from "./config/dbConnect.js"
import { livros } from "./models/Livro.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log("Conexão com o banco feita com sicesso")
})
export const app = express()

app.use(express.json())

app.get('/', (request, response) =>{
  response.status(200).send('Curso Node')
})

app.get('/livros', (request, response) => {
  livros.find((err, livros) => {
    response.status(200).json(livros)
  })
})

app.get('/livros/:id', (request, response) => {
  const { id } = request.params

  const index = buscaLivro(Number(id))

  return response.json(livros[index])
})


app.post('/livros', (request, response) => {
  livros.push(request.body)

  return response.status(201).send('Livro cadastrado com sucesso')
})

app.put('/livros/:id', (request, response) => {
  const { id } = request.params
  const { titulo } = request.body

  const index = buscaLivro(Number(id))

  livros[index].titulo = titulo

  return response.json(livros[index])
})

app.delete('/livros/:id', (request, response) => {
  const {id} = request.params

  const index = buscaLivro(Number(id))

  livros.splice(index, 1)

  return response.send(`Livro ${id} removido com sucesso`)
})

function buscaLivro(id) {
  return livros.findIndex(livro => livro.id === id)
}