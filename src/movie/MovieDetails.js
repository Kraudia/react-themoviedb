import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

class MovieDetails extends Component {
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='film' />
          <Header.Content>
            {this.props.details.title}
            <Header.Subheader>
              {this.props.details.original_title}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    original_title: PropTypes.string
  })
};

export default MovieDetails;
