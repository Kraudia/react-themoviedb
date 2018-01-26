import React, {Component} from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce'
import {Container, Search} from 'semantic-ui-react'

const apiKey = '68b4fe2a513155a58dd0af4adacb281b';
const url  = `https://api.themoviedb.org/3/search/movie`;

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: [],
      query: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.searchMovies = debounce(this.searchMovies.bind(this), 500);
  }

  handleResultSelect(e, { result }){
    this.setState({
      query: result.title
    });
  }

  handleSearchChange(e, { value }) {
    this.setState({
      isLoading: true,
      query: value
    });

    this.searchMovies();
  }

  searchMovies() {
    if (this.state.query !== '') {
      axios.get(url, {
        params: {
          api_key: apiKey,
          language: 'pl',
          query: this.state.query
        }
      })
        .then(response => {
          this.setState({
            isLoading: false,
            results: response.data.results
          });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Container>
            <Search
              fluid
              input={{
                fluid: true
              }}
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              showNoResults={false}
              value={value}
              {...this.props}
            />
      </Container>
    );
    }
}

export default SearchComponent;
