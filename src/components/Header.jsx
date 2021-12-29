import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../style/Header.css';
// import LoadingScreen from './LoadingScreen';
// importei os components necessários tanto da biblioteca react quanto do proprio projeto.

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      response: {},
      // loading: false,
    };
  }
  // defini dois estados response que retorna um array e loading que faz o mesmo esquema de chamar o component loading ou não.

  componentDidMount() {
    this.onLoading();
  } // nesse momento o componentDidMount é chamado por ser vir depois do render no fluxo de componentes do react, ou seja depois do render ser renderizado na tela o componentDidMount chama a função onLoading que vai captar o response da função getUser para acessar o nome do login.

  onLoading = () => {
    getUser().then((response) => {
      this.setState({
        response, // não é preciso colocar o valor que response recebe porque o valor é response.
      // }, () => this.setState({
      //   loading: false,
      });
    });
  }
  // essa função acessa a função get user e o response que é passado pela simulateRequest que simula o comportamento de uma Requisição de api (por isso Response) (essa parte não ficou muito clara pra mim mas no arquivo userApi declara que não estudamos ainda então fiz assim)

  render() {
    const { response } = this.state;
    // essa função capta o array response e pega só o item name pra fazer um span que vai ficar dentro do header.
    return (
      <header className="header">
        {/* { loading ? <LoadingScreen /> : spanResponse } */}
        {/* como o componentDidMount é executado depois do render da pra verificar se ele ta carregando ou não */}
        <span className="user-name">{ response.name }</span>
        <div className="header-right">
          <Link to="/search" className="header-a">Search</Link>
          <Link to="/favorites" className="header-a">Favorites</Link>
          <Link to="/profile" className="header-a">Profile</Link>
        </div>
      </header>
      // links que levam pra os components selecionados através do route.
    );
  }
}
