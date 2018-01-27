import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

class MovieImage extends Component  {
  render() {
    const url = 'https://image.tmdb.org/t/p/w500';
    const dummy = 'https://dummyimage.com/500x730/d8d8d8/fafafa.png&text=x';

    return (
      <Image src={this.props.poster_path ? url + this.props.poster_path : dummy} />
    );
  }
}

MovieImage.propTypes = {
  poster_path: PropTypes.string
};

export default MovieImage;
