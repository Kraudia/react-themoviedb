import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {
  render() {
    return (
      <div>
        <h1>Movie</h1>
        <p>Movie id: { this.props.match.params.id }</p>
      </div>
    );
  }
}

Movie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  })
};

export default Movie;
