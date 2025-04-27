// src/pages/Orcamentos.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// Dados fictícios (substituir pelo backend quando disponível)
const materiais = [
  { id: 1, nome: 'Verde Ubatuba', metros: 400, preco: 250 },
  { id: 2, nome: 'Preto São Gabriel', metros: 600, preco: 280 },
  { id: 3, nome: 'Branco Prime', metros: 1200, preco: 350 },
  { id: 4, nome: 'Amarelo Icaraí', metros: 550, preco: 300 },
  { id: 5, nome: 'Cinza Corumbar', metros: 380, preco: 220 },
  { id: 6, nome: 'Cinza Ocre', metros: 400, preco: 240 },
  { id: 7, nome: 'Preto Via Láctea', metros: 770, preco: 400 },
  { id: 8, nome: 'Branco Itaúnas', metros: 900, preco: 370 },
  { id: 9, nome: 'Ornamental', metros: 600, preco: 310 },
  { id: 10, nome: 'Bege Bahia', metros: 700, preco: 330 },
];

const clientes = [
  { id: 1, nome: 'João Silva' },
  { id: 2, nome: 'Maria Oliveira' },
];

function Orcamentos() {
  // Estados para o formulário
  const [material, setMaterial] = useState('');
  const [metrosDisponiveis, setMetrosDisponiveis] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [cliente, setCliente] = useState('');
  const [erro, setErro] = useState('');
  // Estado para a lista de orçamentos
  const [orcamentos, setOrcamentos] = useState([]);
  // Estado para a lista de notas (para simular aprovação)
  const [notas, setNotas] = useState([]);

  // Atualiza material e preço ao selecionar
  const handleMaterialChange = (e) => {
    const nome = e.target.value;
    setMaterial(nome);
    const mat = materiais.find((m) => m.nome === nome);
    setMetrosDisponiveis(mat ? mat.metros : 0);
    setPreco(mat ? mat.preco : '');
  };

  // Cria um novo orçamento
  const handleSubmit = (e) => {
    e.preventDefault();
    const qtd = parseFloat(quantidade);
    const precoFloat = parseFloat(preco);

    if (!cliente || isNaN(qtd) || isNaN(precoFloat)) {
      setErro('Preencha todos os campos corretamente.');
      return;
    }

    if (qtd > metrosDisponiveis) {
      setErro('Quantidade solicitada excede o estoque disponível.');
      return;
    }

    const total = qtd * precoFloat;
    const novoOrcamento = {
      id: orcamentos.length + 1,
      cliente,
      material,
      quantidade: qtd,
      preco: precoFloat,
      total,
      status: 'Pendente',
    };

    setOrcamentos([...orcamentos, novoOrcamento]);
    setErro('');
    setQuantidade('');
    setMaterial('');
    setPreco('');
    setMetrosDisponiveis(0);
    setCliente('');
  };

  // Aprova um orçamento (converte em nota)
  const handleAprovar = (orcamento) => {
    const novaNota = {
      id: notas.length + 1,
      cliente: orcamento.cliente,
      material: orcamento.material,
      quantidade: orcamento.quantidade,
      preco: orcamento.preco,
      total: orcamento.total,
    };

    setNotas([...notas, novaNota]);
    setOrcamentos(
      orcamentos.map((o) =>
        o.id === orcamento.id ? { ...o, status: 'Aprovado' } : o
      )
    );
    // Futuramente, o backend atualizará o estoque aqui
  };

  // Rejeita um orçamento
  const handleRejeitar = (id) => {
    setOrcamentos(
      orcamentos.map((o) =>
        o.id === id ? { ...o, status: 'Rejeitado' } : o
      )
    );
  };

  // Exclui um orçamento
  const handleExcluir = (id) => {
    setOrcamentos(orcamentos.filter((o) => o.id !== id));
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Gerenciar Orçamentos</h1>
      <div className="row">
        {/* Formulário */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
            <div className="mb-3">
              <label className="form-label">Cliente</label>
              <select
                className="form-select"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((cli) => (
                  <option key={cli.id} value={cli.nome}>
                    {cli.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Material</label>
              <select
                className="form-select"
                value={material}
                onChange={handleMaterialChange}
                required
              >
                <option value="">Selecione um material</option>
                {materiais.map((mat) => (
                  <option key={mat.id} value={mat.nome}>
                    {mat.nome} - {mat.metros}m² disponíveis
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Quantidade (m²)</label>
              <input
                type="number"
                className="form-control"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Preço por m² (R$)</label>
              <input
                type="number"
                className="form-control"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Criar Orçamento
            </button>
            {erro && (
              <div className="alert alert-warning mt-3" role="alert">
                {erro}
              </div>
            )}
          </form>
        </div>
        {/* Tabela */}
        <div className="col-md-6">
          <div className="card p-4 shadow-lg bg-light">
            <h4>Lista de Orçamentos</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Material</th>
                  <th>Quantidade (m²)</th>
                  <th>Total (R$)</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {orcamentos.map((orcamento) => (
                  <tr key={orcamento.id}>
                    <td>{orcamento.cliente}</td>
                    <td>{orcamento.material}</td>
                    <td>{orcamento.quantidade}</td>
                    <td>{orcamento.total.toFixed(2)}</td>
                    <td>{orcamento.status}</td>
                    <td>
                      {orcamento.status === 'Pendente' && (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleAprovar(orcamento)}
                          >
                            Aprovar
                          </button>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleRejeitar(orcamento.id)}
                          >
                            Rejeitar
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleExcluir(orcamento.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Total Acumulado (Aprovados):</strong> R${' '}
              {orcamentos
                .filter((o) => o.status === 'Aprovado')
                .reduce((sum, o) => sum + o.total, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orcamentos;