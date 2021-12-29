import React from 'react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import '../style/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      loading: false,
      searchDone: false,
      albums: [],
      lastSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { searchField } = this.state;
    this.setState({
      loading: true,
    });
    const searchResult = await searchAlbumsAPI(searchField);
    this.setState({
      searchField: '',
      loading: false,
      searchDone: true,
      albums: searchResult,
      lastSearch: searchField,
    });
  }

  renderSearchResults() {
    const { albums, lastSearch } = this.state;
    if (albums.length === 0) {
      return (
        <div>
          <h1>{`Resultado de álbuns de: ${lastSearch}`}</h1>
          <br />
          <p>Nenhum álbum foi encontrado</p>
        </div>
      );
    }
    return (
      <div>
        <h1 className="result">{`- ${lastSearch} -`}</h1>
        <section className="album-cards">
          { albums.map((album) => (
            <AlbumCard key={ album.collectionId } album={ album } />
          ))}
        </section>
      </div>
    );
  }

  render() {
    const { searchField, loading, searchDone } = this.state;
    const minLengthSearch = 2;
    return (
      <div className="page-search">
        <Header />
        <div className={ searchDone ? 'searchDone' : 'search' }>
          <h3
            className={ searchDone ? 'h3-done' : 'search-h3' }
          >
            Procure aqui o seu HIT!

          </h3>
          <input
            className={ searchDone ? 'search-inputDone' : 'search-input' }
            name="searchField"
            value={ searchField }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            className={ searchDone ? 'search-buttonDone' : 'search-button' }
            type="button"
            data-testid="search-artist-button"
            disabled={ searchField.length < minLengthSearch }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        { loading ? <LoadingScreen /> : ''}
        { searchDone ? this.renderSearchResults() : ''}
      </div>
    );
  }
}

export default Search;
