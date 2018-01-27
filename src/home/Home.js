import React, { Component } from 'react';
import { Container, Header, Loader, Segment } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios/index';

import config from '../config';
import List from '../list/List';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      results: null,
      page: 0,
      total_pages: 1
    };
    this.getPopularMovies = this.getPopularMovies.bind(this);
    this.getMorePopularMovies = this.getMorePopularMovies.bind(this);
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
          isLoading: false,
          page: response.data.page,
          total_results: response.data.total_results,
          total_pages: response.data.total_pages
        });
      });
  }

  getMorePopularMovies() {
    if (this.state.page < this.state.total_pages) {
      axios.get(config.apiUrl.popular, {
        params: {
          api_key: config.apiKey,
          language: config.language,
          page: this.state.page + 1
        }
      })
        .then( response => {
          this.setState({
            results: this.state.results.concat(response.data.results),
            page: response.data.page,
            total_results: response.data.total_results,
            total_pages: response.data.total_pages
          });
        });
    }
  }

  render() {
      return (
        <InfiniteScroll
          pageStart={0}
          next={this.getMorePopularMovies}
          hasMore={true}
          loader={<Loader />}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
        <Container fluid>
          <Segment basic padded loading={this.state.isLoading}>
            <Header as='h2' color='green'>Popularne filmy</Header>

              <List results={this.state.results}/>
          </Segment>
        </Container>
        </InfiniteScroll>
      )
  }
}

export default Home;
