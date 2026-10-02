
import { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserFormComponent from "./components/UserFormComponent";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import ModalComponent from "./components/ModalComponent";
import SuccessMessage from "./components/SuccessMessage";
import RemoverUsuario from "./components/RemoverUsuarioComponent";

import "./App.css";


const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();

    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};


function App() {

    const url = "https://jsonplaceholder.typicode.com";

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [novoUsuario, setNovoUsuario] = useState(null);
    const [modalNovoUsuarioAberto, setModalNovoUsuarioAberto] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    const [usuarioRemover, setUsuarioRemover] = useState(null);
    const [modalRemoverUsuarioAberto, setModalRemoverUsuarioAberto] = useState(false);


    const usuariosFiltrados = usuarios.filter(
        filtrarUsuarioPorTermo(busca)
    );


    async function buscarUsuario(id) {

        try {

            const resposta = await axios.get(`${url}/users/${id}`);

            setUsuarioSelecionado(resposta.data);

        } catch (error) {

            console.log("Erro ao buscar usuário:", error);

        }

    }


    async function buscarUsuarios() {

        try {

            setCarregando(true);

            const resposta = await axios.get(`${url}/users`);

            setUsuarios(resposta.data);

        } catch (error) {

            console.log("Erro ao buscar usuários:", error);

            setErro("Não foi possível carregar os usuários.");

        }

        setCarregando(false);

    }




    function limparDetalhesUsuario() {

        setUsuarioSelecionado(null);

    }

    async function cadastrarUsuario(usuario) {

        try {

            const resposta = await axios.post(
                `${url}/users`,
                usuario
            );

            setNovoUsuario(resposta.data);

            setUsuarios([
                ...usuarios,
                resposta.data
            ]);

            setMensagem("Usuário cadastrado com sucesso!");

            setModalNovoUsuarioAberto(false);


            setTimeout(() => {
                setMensagem(null);
            }, 3000);


        } catch (error) {

            console.log("Erro ao cadastrar usuário:", error);

        }

    }


    function abrirRemoverUsuario(usuario) {

        setUsuarioRemover(usuario);

        setModalRemoverUsuarioAberto(true);

    }


    async function removerUsuario(id) {

        try {

            await axios.delete(`${url}/users/${id}`);


            const usuariosAtualizados = usuarios.filter(
                (usuario) => usuario.id !== id
            );

            setUsuarios(usuariosAtualizados);

            setMensagem("Usuário removido com sucesso!");

            setModalRemoverUsuarioAberto(false);

            setUsuarioRemover(null);


            setTimeout(() => {
                setMensagem(null);
            }, 3000);


        } catch (error) {

            console.log("Erro ao remover usuário:", error);

        }

    }



    function cancelarRemocao() {

        setModalRemoverUsuarioAberto(false);

        setUsuarioRemover(null);

    }


    useEffect(() => {

        buscarUsuarios();

    }, []);


    return (
        <div className="app">


            <HeaderComponent
                busca={busca}
                setBusca={setBusca}
            />


            <button
                className="botao-novo-usuario"
                type="button"
                onClick={() => setModalNovoUsuarioAberto(true)}
            >
                Novo Usuário
            </button>


            {carregando && (
                <LoadingComponent />
            )}


            <p className="informacao">
                Usuários encontrados: {usuarios.length}
            </p>


            {erro && (
                <p className="erro">
                    {erro}
                </p>
            )}


            {!carregando && !erro && (
                <>


                    <p className="informacao">
                        {usuariosFiltrados.length} usuário(s) encontrado(s)
                    </p>


                    {usuariosFiltrados.length > 0 ? (

                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                            onRemoverUsuario={abrirRemoverUsuario}
                        />

                    ) : (

                        <p className="sem-resultados">
                            Nenhum usuário encontrado.
                        </p>

                    )}


                    {usuarioSelecionado && (

                        <ModalComponent
                            onFechar={limparDetalhesUsuario}
                        >

                            <UserDetailsComponent
                                usuario={usuarioSelecionado}
                                onFecharDetalhes={limparDetalhesUsuario}
                            />

                        </ModalComponent>

                    )}


                    {novoUsuario && (

                        <NovoUsuarioComponent
                            novoUsuario={novoUsuario}
                        />

                    )}

                </>
            )}


            {mensagem && (

                <SuccessMessage
                    mensagem={mensagem}
                />

            )}


            {modalNovoUsuarioAberto && (

                <ModalComponent
                    titulo="Novo Usuário"
                    onFechar={() => setModalNovoUsuarioAberto(false)}
                >

                    <UserFormComponent
                        onCadastrar={cadastrarUsuario}
                    />

                </ModalComponent>

            )}


            {modalRemoverUsuarioAberto && usuarioRemover && (

                <ModalComponent
                    titulo="Remover Usuário"
                    onFechar={cancelarRemocao}
                >

                    <RemoverUsuario
                        usuario={usuarioRemover}
                        onRemover={removerUsuario}
                        onCancelar={cancelarRemocao}
                    />

                </ModalComponent>

            )}


        </div>
    );

}


export default App;

