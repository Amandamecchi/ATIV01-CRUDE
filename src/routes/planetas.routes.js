import { Router } from "express";

const filmesRoutes = Router();

let filmesMarcantes = [
    {
        id: Number(Math.floor(Math.random() *99) + 1),
        titulo: "Harry Potter",
        genero: "animação",
        emCartaz: false
    },
    {
        id: Number(Math.floor(Math.random() *99) + 1),
        titulo: "Cinderela",
        genero: "Animação",
        emCartaz: false
    },
    {
        id: Number(Math.floor(Math.random() *99) + 1),
        nome: "É assim que acaba",
        genero: "Drama",
        emCartaz: true
    }
]

//Rota para BUSCAR todos os elementos do array filmesMarcantes
filmesRoutes.get("/", (req, res) => {
    return res.status(200).json(filmesMarcantes);
});

//Rota para CRIAR nova filmeMarcante.
filmesRoutes.post("/", (req, res) => {
    const { titulo, genero, emCartaz } = req.body;

    const novoFilme = {
        id:Number(Math.floor(Math.random() *99) + 1),
        titulo,
        genero,
        emCartaz,
    };

    filmesMarcantes.push(novoFilme);
    return res.status(201).json(novoFilme);
});

//Rota para buscar um elemento específico do array filmesMarcantes.
filmesRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    //console.log(id)

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id));

    //console.log(filme);

    if (!filme) {
        return res.status(400).send({ message: "Guloseima não encontrada!" });
    } //se eu não encontar "!"

    return res.status(200).send(filmesMarcantes);

});

//Rota para editar uma filmeMarcante
filmesRoutes.put("/:id", (req, res) => {
    const { id } = req.params

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id));

    //console.log(filme);

    if (!filme) {
        return res.status(400).send({ message: "filme não encontrado!" });
    } //se eu não encontar "!"

    const { titulo, genero, emCartaz } = req.body;

    filme.titulo = titulo;
    filme.genero = genero;
    filme.emCartaz = emCartaz;

    return res.status(200).send({
        message: "filme atualizada!",
        filme,
    });  //duas informações {}
});

//Rota para deletar um filme marcante 
filmesRoutes.delete("/:id", (req, res) => {
    const { id } = req.params

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id));

    if (!filme) {
        return res.status(400).send({ message: "filme não encontrado!" });
    }

        filmesMarcantes = filmesMarcantes.filter((movie) => movie.id !== Number(id));

        return res.status(200).send({
            message: "filme deletado!",
            filme,
        });
    });

    export default filmesRoutes;