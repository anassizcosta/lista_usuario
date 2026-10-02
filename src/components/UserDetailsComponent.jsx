function UserDetailsComponent({
    usuario,
    onFecharDetalhes
}) {
    return (
        <div className="detalhes-usuario">

            <h2>Detalhes do usuário</h2>

            <button
                type="button"
                className="botao-fechar-detalhes"
                onClick={onFecharDetalhes}
            >
                Fechar detalhes
            </button>

            <div className="detalhes-grid">

                <div className="detalhes-item">
                    <span className="detalhes-label">
                        Nome
                    </span>

                    <span className="detalhes-valor">
                        {usuario.name}
                    </span>
                </div>


                <div className="detalhes-item">
                    <span className="detalhes-label">
                        E-mail
                    </span>

                    <span className="detalhes-valor">
                        {usuario.email}
                    </span>
                </div>


                <div className="detalhes-item">
                    <span className="detalhes-label">
                        Cidade
                    </span>

                    <span className="detalhes-valor">
                        {usuario.address.city}
                    </span>
                </div>


                <div className="detalhes-item">
                    <span className="detalhes-label">
                        Telefone
                    </span>

                    <span className="detalhes-valor">
                        {usuario.phone}
                    </span>
                </div>


                <div className="detalhes-item">
                    <span className="detalhes-label">
                        Website
                    </span>

                    <span className="detalhes-valor">
                        {usuario.website}
                    </span>
                </div>

            </div>

        </div>
    );
}

export default UserDetailsComponent;