import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce'
import { Grid, Image, Search } from 'semantic-ui-react'

const apiKey = '68b4fe2a513155a58dd0af4adacb281b';
const url  = `https://api.themoviedb.org/3/search/movie`;
const tmdb = 'https://www.themoviedb.org/static_cache/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png';

class SearchBar extends Component {
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
            results: response.data.results.map((item) => ({
              title: item.title,
              description: item.original_title,
              image: item.poster_path ? 'https://image.tmdb.org/t/p/w92' + item.poster_path : 'https://dummyimage.com/92x134/d8d8d8/fafafa.png&text=x',
              price: item.original_language.toUpperCase()
            }))
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
      <Grid container equal columns={'equal'}>
        <Grid.Column width={2} only={'tablet computer'}>
          <Image src={tmdb} size={'medium'} centered/>
        </Grid.Column>
        <Grid.Column>
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
        </Grid.Column>
      </Grid>
    );
  }
}

export default SearchBar;
