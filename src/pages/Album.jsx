import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import LoadingScreen from '../components/LoadingScreen';
import MusicCard from '../components/MusicCard';
import '../style/Album.css';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: {},
      musics: [],
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchAlbumSounds();
    this.getFavorites();
  } // component didMount chama a função que constroi a lista de musicas, depois o getFavorites.

  getFavorites = () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const favoriteSongs = await getFavoriteSongs();
        this.setState({
          favorites: favoriteSongs,
          loading: false,
        });
      },
    );
  }; // após o componentDidMount chamar essa função ela chama a função nativa getFavoritas songs que retorna um array com as musicas favoritas (no caso inicialmente vazio)

  fetchAlbumSounds = () => {
    const { props } = this;
    const { id } = props.match.params;
    // o match.params é ultilizado para acessar os dados do route no app.js que passaram os parametros (props) que contem o id dos itens.
    this.setState({
      loading: true,
    }, () => {
      getMusics(id).then((response) => this.setState({
        loading: false,
        musics: response.slice(1), // nesse link https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/LookupExamples.html#//apple_ref/doc/uid/TP40017632-CH7-SW1 eu estudei sobre o retorno da api lookup da aple e vi que o resultado que eu queria usar para o nome das canções era o segundo objeto então usei o slice para "fatiar" essa informação e repetir no map.
        album: response[0], // o nome do album é o primeiro objeto dentro do array de response então setei ele como o estado de album.
      }));
    });
  };

  handleCheck = async ({ target }) => {
    const { checked, id } = target;
    const { musics } = this.state;
    const music = musics.find((song) => song.trackId === Number(id));
    this.setState({
      loading: true,
    }, async () => {
      if (checked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      this.getFavorites();
    });
  };

  isFavorite = (id) => {
    const { favorites } = this.state;
    const result = favorites.some((music) => music.trackId === id);
    return result;
  };

  render() {
    const { state, isFavorite, handleCheck } = this;
    const { musics, album } = state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-selected">
          <div className="container-album">
            {' '}
            <img
              className="img"
              src={ album.artworkUrl100 }
              alt="album cover"
            />
            <div className="container-info">
              <h4 data-testid="album-name">{album.collectionName}</h4>
            </div>
          </div>
          <div key={ album.artistId } />
          {musics.map((music) => {
            const { trackId, collectionName } = music;
            return (
              <MusicCard
                key={ trackId }
                album={ collectionName }
                music={ music }
                onChange={ handleCheck }
                isChecked={ isFavorite(trackId) }
                // quando favoritada a função chama is favorite com o trackId de parametro pra armazenar a informação.
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
