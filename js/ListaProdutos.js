import React from 'react';

class ListaProdutos extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {

        return (
            <section id="lista-alunos">
                <h1>Lista de Produtos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-alunos">
                        {!this.props.alunos.length && <tr><td colSpan="4">Nenhum produto cadastrado.</td></tr>}
                        {this.props.alunos.map((produto) =>
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.preco}</td>
                                <td>{produto.quantidade}</td>
                                <td>
                                    <a href="#" onClick={(e) => this.props.editarProduto(e, produto)}>Editar</a> | <a href="#" onClick={(e) => this.props.excluirProduto(e, produto)}>Excluir</a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        );
    }
}

export default ListaProdutos;