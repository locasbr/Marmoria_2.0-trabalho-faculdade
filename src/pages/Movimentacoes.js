// src/pages/Movimentacoes.js
import React, { useState } from 'react';

function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [material, setMaterial] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaMovimentacao = {
      id: movimentacoes.length + 1,
      material,
      tipo,
      quantidade: parseFloat(quantidade),
      data,
    };
    setMovimentacoes([...movimentacoes, novaMovimentacao]);
    setMaterial('');
    setTipo('entrada');
    setQuantidade('');
    setData('');
  };

  const handleDelete = (id) => {
    setMovimentacoes(movimentacoes.filter((mov) => mov.id !== id));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Gerenciar Movimentações</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-4 shadow-lg">
            <h4>Adicionar Movimentação</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Material</label>
                <select
                  className="form-select"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  required
                >
                  <option value="">Selecione um material</option>
                  {/* Substituir por lista do backend */}
                  <option value="Verde Ubatuba">Verde Ubatuba</option>
                  <option value="Preto São Gabriel">Preto São Gabriel</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
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
                <label className="form-label">Data</label>
                <input
                  type="date"
                  className="form-control"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Adicionar
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card p-4 shadow-lg">
            <h4>Lista de Movimentações</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Tipo</th>
                  <th>Quantidade (m²)</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoes.map((mov) => (
                  <tr key={mov.id}>
                    <td>{mov.material}</td>
                    <td>{mov.tipo}</td>
                    <td>{mov.quantidade}</td>
                    <td>{mov.data}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(mov.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movimentacoes;