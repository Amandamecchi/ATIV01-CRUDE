import { Router } from "express";

import planetasRoutes from "./planetas.routes.js";

const docesRoutes = Router();

docesRoutes.use("/planetas", planetasRoutes)

//Rota para BUSCAR todos os elementos do array guloseima
docesRoutes.get("/", (req, res) => {
    return res.status(200).json(guloseimas);
});

//Rota para CRIAR nova guloseima
docesRoutes.post("/", (req, res) => {
    const { nome, preco } = req.body;

    const novoDoce = {
        id:Number(Math.floor(Math.random() *99) + 1),
        nome,
        preco,
    };

    guloseimas.push(novoDoce);

    return res.status(201).json(guloseimas);
});

//Rota para buscar um elemento específico do array guloseimas
docesRoutes.get("/:id", (req, res) => {
    const { id } = req.params

    const guloseima = guloseimas.find((doce) => doce.id === Number(id));

    //console.log(guloseima);

    if (!guloseima) {
        return res.status(400).send({ message: "Guloseima não encontrada!" });
    } //se eu não encontar "!"

    return res.status(200).send(guloseima);

}) //parametro de rotas

//Rota para editar uma guloseima
docesRoutes.put("/:id", (req, res) => {
    const { id } = req.params

    const guloseima = guloseimas.find((doce) => doce.id === Number(id));

    //console.log(guloseima);

    if (!guloseima) {
        return res.status(400).send({ message: "Guloseima não encontrada!" });
    } //se eu não encontar "!"

    const { nome, preco } = req.body;

    guloseima.nome = nome
    guloseima.preco = preco

    return res.status(200).send({
        message: "Guloseima atualizada!",
        guloseima,
    });  //duas informações {}
});

//Rota para deletar uma guloseima 
docesRoutes.delete("/:id", (req, res) => {
    const { id } = req.params

    const guloseima = guloseimas.find((doce) => doce.id === Number(id));

    if (!guloseima) {
        return res.status(400).send({ message: "Guloseima não encontrada!" });
    }

        guloseimas = guloseimas.filter((doce) => doce.id !== Number(id));

        return res.status(200).send({
            message: "Guloseima deletada!",
            guloseima,
        });
    }
)

export default docesRoutes; 
