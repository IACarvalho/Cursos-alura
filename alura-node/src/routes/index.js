import express from "express";
import  livros  from "./livroRoutes.js"

export const routes = (app) => {
  app.route('/').get((request, response) => {
    return response.status(200).json({titulo: "Curso de Node"})
  })

  app.use(
    express.json(),
    livros
  )
}