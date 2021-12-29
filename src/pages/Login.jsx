import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingScreen from '../components/LoadingScreen';
import '../style/Login.css';
// importei os components necessários tanto da biblioteca react quanto do proprio projeto.

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isLogged: false,
      disableButton: true,
      inputValue: '',
    };
  } // criei um state pra armazenar as informações dos components, loading recebe um boolean para disparar ou não a tela de loading, isLogged e disableButton também recebem booleans, um para direcionar para proxima page e outro para ativar ou desativar a função 'disable' do button, input value recebe string e é modificado no estado local para depois ser enviado para o estado "global"

  inputChange = ({ target }) => {
    // target é o valor digitado no campo input
    const { value } = target;
    this.setState(
      {
        inputValue: value,
      },
      this.enableButton,
    );
  };
  // essa função que é desparada ao haver alguma mudança no input cria uma variavel com o valor dessa mudança e o setState altera o valor do inputValue para o valor da variavel, após o estado local ser alterado a função enableButton é chamada.

  enableButton = () => {
    const { inputValue } = this.state;
    const minLength = 3;
    const boolValue = inputValue.length < minLength;
    this.setState({
      disableButton: boolValue,
    });
  };
  // essa função que é chamada após haver uma mudança no input verifica se o que foi escrito tem mais de 3 letras, ele captura o valor do input com o this.state e compara se é menor que a constante minLength, e o resultado dessa comparação é um valor booleano que ou ativa ou mantém o botão de submit desativado.

  buttonClicked = () => {
    this.setState({
      loading: true,
    }, () => {
      const { inputValue } = this.state;
      createUser({ name: inputValue }).then(() => {
        this.setState({
          loading: false,
          isLogged: true,
        });
      });
    });
  }

  // essa função é chamada ao clicar no botão, ela captura o valor do state de inputValue, e chama a função create user passando como parametro name esse valor. depois ele seta o estado local de loading para falso e isLogged para true, assim ao isLogged ser true o redirect redireciona o usuario para proxima pagina.

  render() {
    const { inputChange, state, buttonClicked } = this;
    // usa se o this para poder ultilizar as funções e o state presentes no codigo.
    const { disableButton, inputValue, loading, isLogged } = state;
    // essa linha pega o state dos dados definidos no constructor la em cima.
    return (
      <div data-testid="page-login">
        {loading ? (
          <LoadingScreen />
        ) : ( // loading is true ? se sim retorna o component loading se não os elementos input e button são renderizados na tela.]

          <section className="loading-page">
            <form className="loading-forms">
              <h1 className="h1-login">
                Bem vindo
                {' '}
                <br />
                {' '}
                como devemos te chamar ?
              </h1>
              <input
                className="input-login"
                value={ inputValue }
                // valor que vai ser alterado no state.
                onChange={ inputChange }
                // ao haver uma mudança no input (digitação) essa função é chamada.
                data-testid="login-name-input"
                type="text"
              />
              <button
                className={ disableButton === true ? 'botao-desab' : 'botao-hab' }
                disabled={ disableButton }
                // recebe o valor bulean da função enable button para verificação.
                type="button"
                data-testid="login-submit-button"
                onClick={ buttonClicked }
              // chama a função que envia os dados de login para a função createUser da userApi.
              >
                Entrar
              </button>
            </form>
          </section>
        )}
        { isLogged && <Redirect to="/search" /> }
        {/* quando isLogged for true o redirect do react-router encaminha o usuario para o component de rota '/search' */}
      </div>
    );
  }
}
