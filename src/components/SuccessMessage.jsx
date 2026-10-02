function SuccessMessage({ mensagem }) {
    return (
        <p className="success-snackbar" role="status" aria-live="polite">
            {mensagem}
        </p>
    );
}

export default SuccessMessage;