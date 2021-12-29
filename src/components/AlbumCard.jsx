import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/Search.css';

export default class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const {
      collectionId,
      collectionName,
      artworkUrl100,
    } = album;
    return (
      <div className="album-card">

        <p className="album-names">{collectionName}</p>

        <div key={ collectionId } className="album">
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <div className="image">
              <img className="img" src={ artworkUrl100 } alt={ collectionName } />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};
