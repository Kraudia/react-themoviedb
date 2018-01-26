import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: this.props.match.params
    }
  }

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
      id: PropTypes.string
    })
  })
};

export default Movie;
