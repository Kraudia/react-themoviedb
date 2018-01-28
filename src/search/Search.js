import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Container, Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import axios from 'axios/index';

import config from '../config';
import List from '../shared/list/List';

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      query: this.props.match.params.query,
      isLoading: true,
      results: null,
      page: 0,
      total_pages: 1,
      sort: 1
    };
    this.getResults = this.getResults.bind(this);
    this.getMoreResults = this.getMoreResults.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
  }

  componentDidMount(){
    if (this.state.query) {
      this.getResults();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.query !== nextProps.match.params.query) {
      this.setState({
        query: nextProps.match.params.query,
        isLoading: true,
        results: null,
        page: 0,
        total_pages: 1,
        sort: 1
      }, () => this.getResults());
    }
  }

  getResults() {
    axios.get(config.apiUrl.search, {
      params: {
        query: this.state.query,
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

  getMoreResults() {
    if (this.state.page < this.state.total_pages) {
      axios.get(config.apiUrl.search, {
        params: {
          query: this.props.match.params.query,
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
          next={this.getMoreResults}
          hasMore={true}
          loader={<Loader />}
        >
        <Container fluid>
          <Segment basic>
            <Grid columns='equal'>
              <Grid.Column verticalAlign='bottom'>
                <Breadcrumb size='big'>
                  <Breadcrumb.Section link><Link to={'/'}>Strona główna</Link></Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right angle' />
                  <Breadcrumb.Section active>Wyniki wyszukiwań dla: <i>{this.props.match.params.query}</i> </Breadcrumb.Section>
                </Breadcrumb>
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

Search.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string
    })
  })
};


export default Search;
