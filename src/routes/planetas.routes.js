import { Router } from "express";

const planetasRoutes = Router();

let planetas = [
    {
        id: Number(Math.floor(Math.random() *999999) + 1),
        nome: "Dev",
        temperatura: 13.3,
        agua: false, //Indicação de existencia de água
        atm: ["JS", "NODE", "VS", "CODE"],
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

//Rota para BUSCAR todos os elementos do array planetas
planetasRoutes.get("/", (req, res) => {
    return res.status(200).json(planetas);
});

//Rota para CRIAR nova filmeMarcante.
planetasRoutes.post("/", (req, res) => {
    const { titulo, genero, emCartaz } = req.body;

    const novoFilme = {
        id:Number(Math.floor(Math.random() *99) + 1),
        titulo,
        genero,
        emCartaz,
    };

    planetas.push(novoFilme);
    return res.status(201).json(novoFilme);
});

//Rota para buscar um elemento específico do array planetas.
planetasRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    //console.log(id)

    const filme = planetas.find((movie) => movie.id === Number(id));

    //console.log(filme);

    if (!filme) {
        return res.status(400).send({ message: "Guloseima não encontrada!" });
    } //se eu não encontar "!"

    return res.status(200).send(planetas);

});

//Rota para editar uma filmeMarcante
planetasRoutes.put("/:id", (req, res) => {
    const { id } = req.params

    const filme = planetas.find((movie) => movie.id === Number(id));

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
planetasRoutes.delete("/:id", (req, res) => {
    const { id } = req.params

    const filme = planetas.find((movie) => movie.id === Number(id));

    if (!filme) {
        return res.status(400).send({ message: "filme não encontrado!" });
    }

        planetas = planetas.filter((movie) => movie.id !== Number(id));

        return res.status(200).send({
            message: "filme deletado!",
            filme,
        });
    });

    export default planetasRoutes;