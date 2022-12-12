import mongoose from "mongoose"

mongoose.connect("mongodb+srv://iacarvalho:i1s2r3a4e5l6@cursoalura.ruzapkm.mongodb.net/livraria-alura")

export const db = mongoose.connection