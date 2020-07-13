import React from 'react';

import FormProduto from './FormProdutos';
import ListaProdutos from './ListaProdutos';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();

        const storageState = localStorage.getItem('state');
        if (storageState) {
            this.state = JSON.parse(storageState);
        }
        else {
            this.state = {
                nextId: 0,
                produtos: []
            }
        }
    }

    componentDidUpdate = () => {
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    salvarProduto = (produto) => {
        if (produto.id == 0) {
            const nextId = this.state.nextId + 1;
            produto.id = nextId;
            this.setState({ nextId, produtos: [...this.state.produtos, produto] });
            alert("Produto " + produto.nome + " foi adicionado");
        }
        else {
            const index = this.state.produtos.findIndex(x => x.id == produto.id);
            const produtos = [...this.state.produtos];
            produtos[index] = produto;
            this.setState({ produtos });
            alert("Produto " + produto.nome + " foi editado");
        }
    }

    editarProduto = (e, produto) => {
        e.preventDefault();
        this.form.current.abrir(produto);
    }

    excluirProduto = (e, produto) => {
        e.preventDefault();
        var confirmado = confirm("Deseja excluir: " + produto.nome + "?");
        if (confirmado == true) {
            const produtos = this.state.produtos.filter(x => x.id != produto.id);
            this.setState({ produtos });
        }
    }

    render() {
        return (
            <div>
                <FormProduto ref={this.form} salvarProduto={this.salvarProduto} />
                <ListaProdutos produtos={this.state.produtos} excluirProduto={this.excluirProduto} editarProduto={this.editarProduto} />
            </div>
        )
    }

}

export default App;