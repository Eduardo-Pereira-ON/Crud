const router = require("express").Router();
const Person = require("../models/person");

//creat-criacao de dados
router.post("/", async (req, res) => {
  const { nome, salario, aprovado } = req.body;
  if (!nome) {
    res.status(422).json({ error: "O nome é obrigatorio!" });
    return;
  }
  const person = {
    nome,
    salario,
    aprovado,
  };
  try {
    await Person.create(person);
    res.status(201).json({ message: "Pessoa inserida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read-leitura de dados
router.get("/", async (req, res) => {
  try {
    const pessoa = await Person.find();
    res.status(500).json({ pessoa });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Busca
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const pessoa = await Person.findOne({ _id: id });
    if (!pessoa) {
      res.status(422).json({ message: "O usuario não foi encontrado!" });
      return;
    }
    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Upadate-Atualizar dados
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, salario, aprovado } = req.body;
  const pessoa = {
    nome,
    salario,
    aprovado,
  };
  try {
    const updatePessoa = await Person.updateOne({ _id: id }, pessoa);
    //O metodo matchedCount me informa se ouve uma mudança no obj, ela vai ser diferente de zero entao ouve mudança!
    if (updatePessoa.matchedCount === 0) {
      res.status(422).json({ message: "O usuario não foi encontrado!" });
    }

    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete-excluir dados

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const pessoa = await Person.findOne({ _id: id });
  if (!pessoa) {
    res.status(422).json({ message: "O usuario não foi encontrado!" });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário excluido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
