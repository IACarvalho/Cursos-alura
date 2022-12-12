import express from "express"
import { db } from "./config/dbConnect.js"
import livros from "./models/Livro.js"
import { routes } from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log("Conexão com o banco feita com sicesso")
})
export const app = express()

app.use(express.json())

routes(app)

app.get('/livros/:id', (request, response) => {
  const { id } = request.params

  const index = buscaLivro(Number(id))

  return response.json(livros[index])
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