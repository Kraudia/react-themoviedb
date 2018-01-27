import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import config from '../config';
import axios from 'axios/index';
import List from '../list/List';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      results: null
    };
    this.getPopularMovies = this.getPopularMovies.bind(this);
  }

  componentDidMount(){
    this.getPopularMovies();
  }

  getPopularMovies() {
    axios.get(config.apiUrl.popular, {
      params: {
        api_key: config.apiKey,
        language: config.language
      }
    })
      .then( response => {
        this.setState({
          results: response.data.results,
          isLoading: false
        });
      });
  }

  render() {
      return (
        <Container fluid>
          <Segment basic padded loading={this.state.isLoading}>
            <Header as='h2' color='green'>Popularne filmy</Header>
            <List results={this.state.results}/>
          </Segment>
        </Container>
      )
  }
}

export default Home;
