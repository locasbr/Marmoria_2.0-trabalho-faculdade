// src/pages/Notas.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const materiais = [
  { nome: 'Verde Ubatuba', metros: 400, preco: 250 },
  { nome: 'Preto São Gabriel', metros: 600, preco: 280 },
  // ... outros materiais ...
];

const clientes = [
  { id: 1, nome: 'João Silva' },
  { id: 2, nome: 'Maria Oliveira' },
];

function Notas() {
  const [material, setMaterial] = useState('');
  const [metrosDisponiveis, setMetrosDisponiveis] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [cliente, setCliente] = useState('');
  const [total, setTotal] = useState(0);
  const [notas, setNotas] = useState([]);
  const [erroEstoque, setErroEstoque] = useState('');

  const handleMaterialChange = (e) => {
    const nome = e.target.value;
    setMaterial(nome);
    const mat = materiais.find((m) => m.nome === nome);
    setMetrosDisponiveis(mat ? mat.metros : 0);
    setPreco(mat ? mat.preco : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtd = parseFloat(quantidade);
    const precoFloat = parseFloat(preco);

    if (!cliente || isNaN(qtd) || isNaN(precoFloat)) {
      setErroEstoque('Preencha todos os campos corretamente.');
      return;
    }

    if (qtd > metrosDisponiveis) {
      setErroEstoque('Quantidade solicitada excede o estoque disponível.');
      return;
    }

    const subtotal = qtd * precoFloat;
    setTotal(subtotal);

    const novaNota = {
      id: notas.length + 1,
      cliente,
      material,
      quantidade: qtd,
      preco: precoFloat,
      total: subtotal,
    };
    setNotas([...notas, novaNota]);

    setErroEstoque('');
    setQuantidade('');
    setMaterial('');
    setPreco('');
    setMetrosDisponiveis(0);
    setCliente('');
  };

  const handleDelete = (id) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Gerenciar Notas</h1>
      <div className="row">
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
                {materiais.map((mat, index) => (
                  <option key={index} value={mat.nome}>
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
              Adicionar Nota
            </button>
            {erroEstoque && (
              <div className="alert alert-warning mt-3" role="alert">
                {erroEstoque}
              </div>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <div className="card p-4 shadow-lg bg-light">
            <h4>Lista de Notas</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Material</th>
                  <th>Quantidade (m²)</th>
                  <th>Preço (R$/m²)</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {notas.map((nota) => (
                  <tr key={nota.id}>
                    <td>{nota.cliente}</td>
                    <td>{nota.material}</td>
                    <td>{nota.quantidade}</td>
                    <td>R$ {nota.preco.toFixed(2)}</td>
                    <td>R$ {nota.total.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(nota.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Total Acumulado:</strong> R${' '}
              {notas.reduce((sum, nota) => sum + nota.total, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notas;