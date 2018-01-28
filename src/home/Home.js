import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react';
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
      total_pages: 1,
      sort: 1
    };
    this.getPopularMovies = this.getPopularMovies.bind(this);
    this.getMorePopularMovies = this.getMorePopularMovies.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
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
          let results = this.state.results.concat(response.data.results);
          this.setState({
            results: results,
            page: response.data.page,
            total_results: response.data.total_results,
            total_pages: response.data.total_pages
          });
        });
    }
  }

  sortByTitle() {
    if (this.state.results && this.state.results.length > 0) {
      if (this.state.sort === 1) {
        let results = this.state.results.reverse();
        this.setState({
          results: results,
          sort: -1
        });
      } else {
        let results = this.state.results.sort((a, b) => a.title.localeCompare(b.title, {sensitivity: 'base'}));
        this.setState({
          results: results,
          sort: 1
        });
      }
    }
  }

  sortByPopularity() {
    if (this.state.results && this.state.results.length > 0) {
      if (this.state.sort === 2) {
        let results = this.state.results.reverse();
        this.setState({
          results: results,
          sort: -2
        });
      } else {
        let results = this.state.results.sort((a, b) => (a.popularity < b.popularity) ? -1 : ((a.popularity > b.popularity) ? 1 : 0));
        this.setState({
          results: results,
          sort: 2
        });
      }
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
          <Segment basic>
            <Grid columns='equal'>
              <Grid.Column verticalAlign='bottom'>
                <Header as='h2' color='green'>Popularne filmy</Header>
              </Grid.Column>
              <Grid.Column textAlign='right' verticalAlign='bottom'>
                <Header sub>Sortuj</Header>
                <Button icon labelPosition='left' onClick={this.sortByTitle}>
                  <Icon name='font'/> Tytuł
                </Button>
                <Button icon labelPosition='left' onClick={this.sortByPopularity}>
                  <Icon name='star'/> Popularność
                </Button>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment basic loading={this.state.isLoading}>
            <List results={this.state.results}/>
          </Segment>
        </Container>
        </InfiniteScroll>
      )
  }
}

export default Home;
