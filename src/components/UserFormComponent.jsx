import { useState } from "react";

function UserFormComponent({ onCadastrar }) {
    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    function handleSubmit(evento) {
        evento.preventDefault();

        const novoUsuario = {
            name: nome,
            username: username,
            email: email,
            phone: telefone
        };

        onCadastrar(novoUsuario);
        limparFormulario();
    }

    function limparFormulario() {
        setNome("");
        setUsername("");
        setEmail("");
        setTelefone("");
    }

    return (
        <form className="formulario-usuario" onSubmit={handleSubmit}>
            <header>
                <p>Cadastro</p>
                <h2>Novo Usuário</h2>
            </header>

            <div className="campo-formulario">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="novo-usuario-nome"
                    value={nome}
                    onChange={(evento) => {
                        setNome(evento.target.value);
                    }}
                />
            </div>

            <div className="campo-formulario">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="novo-usuario-username"
                    value={username}
                    onChange={(evento) => {
                        setUsername(evento.target.value);
                    }}
                />
            </div>

            <div className="campo-formulario">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="novo-usuario-email"
                    value={email}
                    onChange={(evento) => {
                        setEmail(evento.target.value);
                    }}
                />
            </div>

            <div className="campo-formulario">
                <label htmlFor="telefone">Telefone</label>
                <input
                    type="text"
                    id="novo-usuario-telefone"
                    value={telefone}
                    onChange={(evento) => {
                        setTelefone(evento.target.value);
                    }}
                />
            </div>

            <button className="botao-cadastrar">Cadastrar</button>
        </form>
    );
}

export default UserFormComponent;