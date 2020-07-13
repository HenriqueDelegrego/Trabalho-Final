import React from 'react';
import Produto from './models/Produto';

class FormProdutos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            nome: '',
            preco: '',
            quantidade: '',
            errorMessage: null
        }
    }

    componentDidMount = () => {
        document.getElementById('nome').focus();
    }
    abrir = (produto) => {
        this.setState({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade,
            errorMessage: ''
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.nome) {
            this.setState({ errorMessage: 'Nome é obrigatório' });
            return;
        }
        if (this.props.salvarProduto) {
            const produto = new Produto(this.state.id, this.state.nome, this.state.preco, this.state.quantidade);
            this.props.salvarProduto(produto);
        }
        this.handleReset(e);
        document.getElementById('nome').focus();
    }

    handleReset = (e) => {
        e.preventDefault();
        this.setState({
            id: 0,
            nome: '',
            preco: '',
            quantidade: '',
            errorMessage: ''
        });
    }

    render = () => {
        return (
            <section id="form-produto">
                <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <h1>{this.state.id > 0 ? 'Editar' : 'Adicionar'} PRODUTO</h1>
                    <p>
                        <label htmlFor="nome">Nome:</label>
                        <input name="nome" id="nome" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                    </p>

                    <p>
                        <label htmlFor="preco">Preço:</label>
                        <input name="preco" type="number" value={this.state.preco} onChange={(e) => this.setState({ preco: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input name="quantidade" type="number" value={this.state.quantidade} onChange={(e) => this.setState({ quantidade: e.target.value })} />
                    </p>
                    
                    {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
                    <p>
                        <button type="submit">Salvar</button>
                        <button type="reset">Cancelar</button>
                    </p>
                </form>
            </section>
        )
    }
}

export default FormProdutos;