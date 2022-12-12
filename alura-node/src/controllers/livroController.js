import livros from "../models/Livro.js"

class LivroController {

  static listarLivros = (request, response) => {
    livros.find((err, livros) => {
      response.status(200).json(livros)
    })
  }

  static cadastrarLivro = (request, response) => {
    const livro = new livros(request.body)

    livro.save((err) => {
      if(err) {
        response.status(500).send({message: `${err.message} - falha ao cadastrar o livro`})
      }

      else {
        response.status(201).send(livro.toJSON())
      }
    })


  }
}

export default LivroController