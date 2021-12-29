import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// importei os arquivos do react router que possibilitam a troca de destinos dos links.
import {
  Album,
  Favorites,
  Login,
  NotFound,
  Profile,
  ProfileEdit,
  Search,
} from './pages/Index';
// importei os compononents que vão ser renderizados como page que foram agrupados no arquivo index.

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {/* o browserRouter é responsável por fazer o roteamento dos componentes (requisito 1) */}
        <Switch>
          {/* O switch compara as rotas e renderiza o primeiro elemento que corresponde a primeira rota */}
          <Route exact path="/" component={ Login } />
          {/* as routes são as rotas de cada component e a exact é a primeira que o switch vai renderizar */}
          <Route path="/search" component={ Search } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/profile" component={ Profile } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
