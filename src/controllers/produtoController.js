const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// RF01 — Cadastrar produto (POST /produtos)
const criarProduto = async (req, res) => {
  const { nome, descricao, quantidade, preco } = req.body;

  if (!nome || quantidade === undefined || preco === undefined) {
    return res.status(400).json({
      erro: 'Os campos nome, quantidade e preco sao obrigatorios.'
    });
  }

  if (quantidade < 0 || preco < 0) {
    return res.status(400).json({
      erro: 'Quantidade e preco devem ser valores positivos.'
    });
  }

  try {
    const produto = await prisma.produto.create({
      data: { nome, descricao, quantidade, preco }
    });
    return res.status(201).json(produto);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao cadastrar produto.', detalhe: error.message });
  }
};

// RF02 — Listar produtos (GET /produtos e GET /produtos/:id)
const listarProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: { id: 'asc' }
    });
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar produtos.', detalhe: error.message });
  }
};

const buscarProdutoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id) }
    });

    if (!produto) {
      return res.status(404).json({ erro: `Produto com ID ${id} nao encontrado.` });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar produto.', detalhe: error.message });
  }
};

// RF03 — Atualizar produto (PUT /produtos/:id)
const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, quantidade, preco } = req.body;

  try {
    const existe = await prisma.produto.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existe) {
      return res.status(404).json({ erro: `Produto com ID ${id} nao encontrado.` });
    }

    const produto = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, quantidade, preco }
    });

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar produto.', detalhe: error.message });
  }
};

// RF04 — Excluir produto (DELETE /produtos/:id)
const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const existe = await prisma.produto.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existe) {
      return res.status(404).json({ erro: `Produto com ID ${id} nao encontrado.` });
    }

    await prisma.produto.delete({
      where: { id: parseInt(id) }
    });

    return res.status(200).json({ mensagem: `Produto com ID ${id} excluido com sucesso.` });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao excluir produto.', detalhe: error.message });
  }
};

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
};
