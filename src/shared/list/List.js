import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import ListItem from './ListItem';

class List extends Component {
  render() {
    return (
      <Grid doubling columns={5}>
      {this.props.results && this.props.results.length > 0 && this.props.results.map(result =>
        <ListItem key={result.id} info={result} />)}
      </Grid>
    );
  }
}

List.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.object
  )
};

export default List;
