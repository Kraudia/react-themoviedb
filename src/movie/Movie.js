import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Grid, Segment } from 'semantic-ui-react';

import config from '../config';
import MovieDetails from "./MovieDetails";
import MovieImage from "./MovieImage";

class Movie extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: this.props.match.params.id,
      isLoading: true,
      details: {}
    };

    this.getDetails= this.getDetails.bind(this);
  }

  componentWillMount(){
    if (this.state.id) {
      this.getDetails();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        id: nextProps.match.params.id,
        isLoading: true,
        details: {}
      }, () => this.getDetails());
    }
  }

  getDetails() {
    axios.get(`${config.apiUrl.movie}/${this.state.id}`, {
      params: {
        api_key: config.apiKey,
        language: config.language
      }
    })
      .then( response => {
        this.setState({
          details: response.data,
          isLoading: false
        });
      });
  }

  render() {
    return (
      <Container>
        <Segment basic loading={this.state.isLoading}>
          <Grid columns='equal' padded celled='internally'>
            <Grid.Row>
              <Grid.Column width={6}>
                <MovieImage poster_path={this.state.details.poster_path}/>
              </Grid.Column>
              <Grid.Column>
                <MovieDetails details={this.state.details}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
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
