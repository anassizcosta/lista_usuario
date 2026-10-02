function RemoverUsuario({
    usuario,
    onRemover,
    onCancelar
}) {
    return (
        <div className="remover-usuario">

            <p>
                Tem certeza que deseja remover o usuário?
            </p>

            <p>
                <strong>{usuario.name}</strong>
            </p>

            <div className="botoes-remover">

                <button
                    type="button"
                    className="botao-confirmar-remocao"
                    onClick={() => onRemover(usuario.id)}
                >
                    Remover
                </button>

                <button
                    type="button"
                    className="botao-cancelar-remocao"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>

            </div>

        </div>
    );
}

export default RemoverUsuario;