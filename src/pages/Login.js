    // src/pages/Login.js
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../App.css';

    function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulação de login (substituir por chamada ao backend)
        if (email === 'admin@admin.com' && senha === '123456') {
        // Salva um token fictício (substituir pelo token real do backend)
        localStorage.setItem('token', 'ficticio-token-123');
        navigate('/orcamentos');
        } else {
        setErro('Email ou senha inválidos.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                type="password"
                className="form-control"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
            <button type="button" className="btn btn-primary w-100" style={{marginTop: 7}} onClick={() => navigate('/cadastro')}>Cadastrar-se</button>
            {erro && (
                <div className="alert alert-danger mt-3" role="alert">
                {erro}
                </div>
            )}
            </form>
        </div>
        </div>
    );
    }

    export default Login;