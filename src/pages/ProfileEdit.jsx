import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import { getUser, updateUser } from '../services/userAPI';
import '../style/ProfileEdite.css';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      redirect: false,
      buttonDisabled: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo = async () => {
    const user = await getUser();
    this.setState(
      {
        loading: false,
        ...user,
      }, () => this.inputsValidation(),
    );
  }

  saveInfo = async () => {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({ loading: false, redirect: true });
  };

  changeInput = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      }, () => this.inputsValidation(),
    );
  };

  isEmpty(...inputs) {
    return inputs.some((input) => input.length === 0);
  }

  emailValidation(email) {
    return /^[a-z]?@[a-z]?\.com$/.test(email);
  }

  inputsValidation() {
    const { name, email, description, image } = this.state;
    const inputsValues = this.isEmpty(name, email, description, image);
    const emailVerification = this.emailValidation(email);
    const NotValid = inputsValues && !emailVerification;
    this.setState({
      buttonDisabled: NotValid,
    });
  }

  render() {
    const { state, saveInfo, changeInput } = this;
    const {
      loading,
      buttonDisabled,
      redirect,
      name,
      email,
      image,
      description,
    } = state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="edit-perfil">
            <form className="profile-forms">
              <h1 className="title-perfil">Deixe seu perfil mais completo ;)</h1>
              <input
                className="input-profile"
                name="name"
                value={ name }
                onChange={ changeInput }
                data-testid="edit-input-name"
                type="text"
                placeholder="your name"
              />
              <input
                className="input-profile"
                name="email"
                value={ email }
                onChange={ changeInput }
                data-testid="edit-input-email"
                type="text"
                placeholder="your Email"
              />
              <input
                className="input-profile"
                name="description"
                value={ description }
                onChange={ changeInput }
                data-testid="edit-input-description"
                type="text"
                placeholder="about You"
              />
              <input
                className="input-profile"
                name="image"
                value={ image }
                onChange={ changeInput }
                data-testid="edit-input-image"
                type="text"
                placeholder="profile Picture"
              />
              <br />
              <button
                className="botao-perfil"
                disabled={ buttonDisabled }
                onClick={ saveInfo }
                data-testid="edit-button-save"
                type="button"
              >
                Save
              </button>
            </form>
          </div>
        )}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
