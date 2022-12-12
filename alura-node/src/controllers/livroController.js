import livros from "../models/Livro.js"

class LivroController {

  static listarLivros = (request, response) => {
    livros.find((err, livros) => {
      response.status(200).json(livros)
    })
  }
}

export default LivroController