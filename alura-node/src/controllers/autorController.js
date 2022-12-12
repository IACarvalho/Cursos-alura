import autores from "../models/Autor.js"

class AutorController {
  static listarAutores = (request, response) => {
    autores.find((err, autores) => {
      response.status(200).json(autores)
    })
  }

  static listarAutorPorId = (request, response) => {
    const { id } = request.params

    autores.findById(id, (err, autor) => {
      if(err) {
        response.status(400).json({message: `${err.message} - ID do autor não localizado`})
      }
      else {
        response.status(200).json(autor)
      }
    })
  }

  static cadastrarAutor = (request, response) => {
    const autor = new autores(request.body)

    autor.save((err) => {
      if(err) {
        response.status(500).send({message: `${err.message} - falha ao cadastrar o autor`})
      }

      else {
        response.status(201).send(autor.toJSON())
      }
    })


  }

  static atualizarAutor = (request, response) => {
    const { id } = request.params

    autores.findByIdAndUpdate(id, {$set: request.body}, (err) => {
      if(!err) {
        response.status(200).json({message: 'Autor atualizado com sucesso'})
      }
      else {
        response.status(500).json({message: err.message})
      }
    })
  }

  static excluirAutor = (request, response) => {
    const { id } = request.params

    autores.findByIdAndDelete(id, (err) => {
      if(!err) {
        response.status(200).json({message: `Autor exluído com sucesso`})
      }
      else {
        response.status(500).json({message: `${err.message} - ID do autor não localizado`})
      }
    })
  }
}

export default AutorController