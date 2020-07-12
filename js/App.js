import React from 'react';

import FormProduto from './FormProdutos';
import ListaProdutos from './ListaProdutos';
// Atualizada em 11/07 às 18:00. Atualizado até produto
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
                alunos: []
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
            this.setState({ nextId, alunos: [...this.state.alunos, produto] });
        }
        else {
            const index = this.state.alunos.findIndex(x => x.id == produto.id);
            const alunos = [...this.state.alunos];
            alunos[index] = produto;
            this.setState({ alunos });
        }
    }

    editarProduto = (e, produto) => {
        e.preventDefault();
        this.form.current.abrir(produto);
    }

    excluirProduto = (e, produto) => {
        e.preventDefault();
        const alunos = this.state.alunos.filter(x => x.id != produto.id);
        this.setState({ alunos });
    }

    render() {
        return (
            <div>
                <FormProduto ref={this.form} salvarProduto={this.salvarProduto} />
                <ListaProdutos alunos={this.state.alunos} excluirProduto={this.excluirProduto} editarProduto={this.editarProduto} />
            </div>
        )
    }

}

export default App;