import React, { Component } from 'react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../style/Album.css';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

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
  };

  handleCheck = async ({ target }) => {
    const { checked, id } = target;
    const { favorites } = this.state;
    const music = favorites.find((song) => song.trackId === Number(id));
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
  }

  render() {
    const { state, handleCheck, isFavorite } = this;
    const { favorites } = state;
    return (
      <div className="page-favorites">
        <Header />
        <h1 className="h1-favorites">My favorites musics</h1>
        {favorites.map((music) => {
          const { trackId, collectionName } = music;
          return (
            <MusicCard
              key={ trackId }
              album={ collectionName }
              music={ music }
              onChange={ handleCheck }
              isChecked={ isFavorite(trackId) }
            />
          );
        })}
      </div>
    );
  }
}
