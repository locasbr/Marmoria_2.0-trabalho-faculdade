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

function Notas() {
  // Estados para o formulário
  const [material, setMaterial] = useState('');
  const [metrosDisponiveis, setMetrosDisponiveis] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [cliente, setCliente] = useState('');
  const [clienteInput, setClienteInput] = useState(''); // Novo estado para o input de busca
  const [sugestoes, setSugestoes] = useState([]); // Novo estado para sugestões
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false); // Controla visibilidade das sugestões
  const [erro, setErro] = useState('');
  // Estado pra edição
  const [editando, setEditando] = useState(null);
  // Estado pra lista de notas
  const [notas, setNotas] = useState([]);
  // Estado pra filtro
  const [filtroCliente, setFiltroCliente] = useState('');

  // Atualiza material e preço ao selecionar
  const handleMaterialChange = (e) => {
    const nome = e.target.value;
    setMaterial(nome);
    const mat = materiais.find((m) => m.nome === nome);
    setMetrosDisponiveis(mat ? mat.metros : 0);
    setPreco(mat ? mat.preco : '');
  };

  // Lida com a busca de clientes
  const handleClienteInputChange = (e) => {
    const valor = e.target.value;
    setClienteInput(valor);
    setCliente(valor); // Mantém o valor do cliente para o formulário

    if (valor.trim() === '') {
      setSugestoes([]);
      setMostrarSugestoes(false);
    } else {
      const filtrados = clientes.filter((cli) =>
        cli.nome.toLowerCase().includes(valor.toLowerCase())
      );
      setSugestoes(filtrados);
      setMostrarSugestoes(true);
    }
  };

  // Seleciona uma sugestão
  const handleSelecionarSugestao = (nome) => {
    setCliente(nome);
    setClienteInput(nome);
    setSugestoes([]);
    setMostrarSugestoes(false);
  };

  // Cria ou edita uma nota
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

    if (editando) {
      // Edição
      setNotas(
        notas.map((n) =>
          n.id === editando.id
            ? { ...n, cliente, material, quantidade: qtd, preco: precoFloat, total }
            : n
        )
      );
      setEditando(null);
    } else {
      // Criação
      const novaNota = {
        id: notas.length + 1,
        cliente,
        material,
        quantidade: qtd,
        preco: precoFloat,
        total,
      };
      setNotas([...notas, novaNota]);
    }

    setErro('');
    setQuantidade('');
    setMaterial('');
    setPreco('');
    setMetrosDisponiveis(0);
    setCliente('');
    setClienteInput('');
    setSugestoes([]);
    setMostrarSugestoes(false);
  };

  // Preenche o formulário pra edição
  const handleEditar = (nota) => {
    setEditando(nota);
    setCliente(nota.cliente);
    setClienteInput(nota.cliente); // Preenche o input de busca
    setMaterial(nota.material);
    setQuantidade(nota.quantidade);
    setPreco(nota.preco);
    const mat = materiais.find((m) => m.nome === nota.material);
    setMetrosDisponiveis(mat ? mat.metros : 0);
  };

  // Exclui uma nota
  const handleExcluir = (id) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  // Filtra as notas
  const notasFiltradas = notas.filter((n) =>
    n.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Gerenciar Notas</h1>
      <div className="row">
        {/* Formulário */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
            <div className="mb-3 position-relative">
              <label className="form-label">Cliente</label>
              <input
                type="text"
                className="form-control"
                value={clienteInput}
                onChange={handleClienteInputChange}
                placeholder="Digite o nome do cliente"
                required
              />
              {mostrarSugestoes && sugestoes.length > 0 && (
                <ul
                  className="list-group position-absolute w-100"
                  style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                >
                  {sugestoes.map((cli) => (
                    <li
                      key={cli.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelecionarSugestao(cli.nome)}
                      style={{ cursor: 'pointer' }}
                    >
                      {cli.nome}
                    </li>
                  ))}
                </ul>
              )}
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
              {editando ? 'Salvar Alterações' : 'Criar Nota'}
            </button>
            {editando && (
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={() => {
                  setEditando(null);
                  setQuantidade('');
                  setMaterial('');
                  setPreco('');
                  setMetrosDisponiveis(0);
                  setCliente('');
                  setClienteInput('');
                }}
              >
                Cancelar Edição
              </button>
            )}
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
            <h4>Lista de Notas</h4>
            {/* Filtro */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por cliente"
                value={filtroCliente}
                onChange={(e) => setFiltroCliente(e.target.value)}
              />
            </div>
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
                {notasFiltradas.map((nota) => (
                  <tr key={nota.id}>
                    <td>{nota.cliente}</td>
                    <td>{nota.material}</td>
                    <td>{nota.quantidade}</td>
                    <td>R$ {nota.preco.toFixed(2)}</td>
                    <td>R$ {nota.total.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEditar(nota)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleExcluir(nota.id)}
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
              {notasFiltradas.reduce((sum, nota) => sum + nota.total, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notas;