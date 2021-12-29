import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Album.css';

export default class MusicCard extends Component {
  render() {
    const { music, onChange, isChecked } = this.props;
    const { trackName, previewUrl, trackId } = music;
    return (
      <div>
        <div className="player-container">
          <p className="">{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            {`O seu navegador não suporta o elemento ${(<code>audio</code>)}.`}
          </audio>
          {/* esse formato de disponibilizar um audio pega o src do state, usa o track pra definir a faixa de tempo e caso o navegador não suporte retorna o template literals, peguei o formato pra usar esse tipo de audio do https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/track */}
          <label className="favLabel" htmlFor={ trackId }>
            FAV
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              onChange={ onChange }
              checked={ isChecked }
              // checkBox pra favoritar musica.
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
