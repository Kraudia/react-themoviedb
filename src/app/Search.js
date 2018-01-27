import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Image, Search } from 'semantic-ui-react';
import axios from 'axios';
import debounce from 'lodash/debounce'

import config, { tmdb } from '../config';

const resultRenderer = ({ image, price, title, description, movie }) => <Link to={'/movie/' + movie}>
  {image && <div key='image' className='image'><Image src={image} rounded/></div>}
    <div key='content' className='content'>
      {price && <div className='price'>{price}</div>}
      {title && <div className='title'>{title}</div>}
      {description && <div className='description'>{description}</div>}
    </div>
  </Link>
;

resultRenderer.propTypes = {
  movie: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

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
    this.handleSubmit = this.handleSubmit.bind(this);
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
      results: [],
      query: value
    });
    this.searchMovies();
  }

  handleSubmit(e) {
    if (e.key === 'Enter') {
      this.context.router.history.push('/movie/' + this.state.query);
      e.preventDefault();
    }
  }

  searchMovies() {
    if (this.state.query) {
      axios.get(config.apiUrl.search, {
        params: {
          api_key: config.apiKey,
          language: config.language,
          query: this.state.query
        }
      })
        .then(response => {
          this.setState({
            isLoading: false,
            results: response.data.results.map((item) => ({
              movie: item.id,
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
      <Grid container columns={'equal'}>
        <Grid.Column width={2} only={'tablet computer'}>
          <Image src={tmdb} size={'medium'} centered/>
        </Grid.Column>
        <Grid.Column>
          <form onKeyPress={this.handleSubmit}>
            <Search

              fluid
              input={{
                fluid: true
              }}
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              resultRenderer={resultRenderer}
              results={results}
              showNoResults={false}
              value={value}
              size={'big'}
              {...this.props}
            />
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}

SearchBar.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchBar;
