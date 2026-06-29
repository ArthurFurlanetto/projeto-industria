const express = require('express');
const router = express.Router();
const {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
} = require('../controllers/produtoController');

// RF01 — Cadastrar produto
router.post('/', criarProduto);

// RF02 — Listar todos os produtos
router.get('/', listarProdutos);

// RF02 — Buscar produto por ID
router.get('/:id', buscarProdutoPorId);

// RF03 — Atualizar produto
router.put('/:id', atualizarProduto);

// RF04 — Excluir produto
router.delete('/:id', excluirProduto);

module.exports = router;
