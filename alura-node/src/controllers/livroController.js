import livros from "../models/Livro.js"

class LivroController {

  static listarLivros = (request, response) => {
    livros.find((err, livros) => {
      response.status(200).json(livros)
    })
  }

  static listarLivroPorId = (request, response) => {
    const { id } = request.params

    livros.findById(id, (err, livro) => {
      if(err) {
        response.status(400).json({message: `${err.message} - ID do livro não localizado`})
      }
      else {
        response.status(200).json(livro)
      }
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

  static atualizarLivro = (request, response) => {
    const { id } = request.params

    livros.findByIdAndUpdate(id, {$set: request.body}, (err) => {
      if(!err) {
        response.status(200).json({message: 'Livro atualizado com sucesso'})
      }
      else {
        response.status(500).json({message: err.message})
      }
    })
  }

  static excluirLivro = (request, response) => {
    const { id } = request.params

    livros.findByIdAndDelete(id, (err) => {
      if(!err) {
        response.status(200).json({message: `Livro exluído com sucesso`})
      }
      else {
        response.status(500).json({message: `${err.message} - ID do livro não localizado`})
      }
    })
  }
}

export default LivroController