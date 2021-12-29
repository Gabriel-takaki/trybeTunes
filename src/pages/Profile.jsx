import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    getUser().then((user) => {
      this.setState({
        user,
        loading: false,
      });
    });
  }

  render() {
    const { state } = this;
    const { loading, user } = state;
    const { name, email, image, description } = user;
    return (
      <section className="perfil-section">
        <Header />
        {
          loading ? <LoadingScreen /> : (
            <section className="my-profile-section">
              <div className="my-profile">
                <img data-testid="profile-image" src={ image } alt={ name } />
                <p className="label">Nome *</p>
                <p>{ name }</p>
                <p className="label">Email *</p>
                <p>{ email }</p>
                <p className="label">Sobre *</p>
                <p>{ description }</p>
                <Link className="botao-perfil" to="/profile/edit">Editar perfil</Link>
              </div>
            </section>
          )
        }
      </section>
    );
  }
}
