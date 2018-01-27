import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flag, Header, Icon, Label, List, Segment, Statistic } from 'semantic-ui-react';



class MovieDetails extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment>
          <Header as='h2' color='green'>
            <Icon name='film' color='green'/>
            <Header.Content>
              {this.props.details.title}
              <Header.Subheader color='green'>
                {this.props.details.original_title}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>

        <Segment>
          <Header as='h3'>Opis</Header>
          {this.props.details.overview || <i>Brak opisu</i>}
        </Segment>

        <Segment>
          <Header as='h3'>Gatunki</Header>
          {this.props.details.genres && this.props.details.genres.map(genre => <Label key={genre.id} color='green'> {genre.name} </Label>)}
        </Segment>

        <Segment>
          <Header as='h3'>Kraj produkcji</Header>
          <List horizontal divided>
            {this.props.details.production_countries && this.props.details.production_countries.map(country =>
              <List.Item key={country.iso_3166_1}>
                <List.Content><Flag name={country.iso_3166_1.toLowerCase()} /> {country.name}</List.Content>
              </List.Item>)}
          </List>
        </Segment>

        <Segment>
          <Header as='h3'>Firmy produkcyjne</Header>
          <List horizontal divided>
            {this.props.details.production_companies && this.props.details.production_companies.map(company =>
              <List.Item key={company.id}>
                {company.name}
              </List.Item>)}
          </List>
        </Segment>

        <Segment>
          <Header as='h3'>Dodatkowe informacje</Header>
          {this.props.details.imdb_id ?
            <Label as='a' color='yellow' href={'http://www.imdb.com/title/' + this.props.details.imdb_id}>IMDb</Label> : <div>Brak informacji.</div>}
        </Segment>

        <Segment.Group horizontal>
          <Segment textAlign={'center'}>
            <Statistic size='tiny' color='red'>
              <Statistic.Value>{this.props.details.vote_average}</Statistic.Value>
              <Statistic.Label>Ocena</Statistic.Label>
            </Statistic>
          </Segment>
          <Segment textAlign={'center'}>
            <Statistic size='tiny' color='orange'>
              <Statistic.Value>{this.props.details.vote_count }</Statistic.Value>
              <Statistic.Label>Głosów</Statistic.Label>
            </Statistic>
          </Segment>
          <Segment textAlign={'center'}>
            <Statistic size='tiny' color='yellow'>
              <Statistic.Value>{Number(this.props.details.popularity).toFixed(2)}</Statistic.Value>
              <Statistic.Label>Popularność</Statistic.Label>
            </Statistic>
          </Segment>
          <Segment textAlign={'center'}>
            <Statistic size='tiny' color='olive'>
              <Statistic.Value>{this.props.details.release_date }</Statistic.Value>
              <Statistic.Label>Data publikacji</Statistic.Label>
            </Statistic>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
}

MovieDetails.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    ),
    production_countries: PropTypes.arrayOf(
      PropTypes.shape({
        iso_3166_1: PropTypes.string,
        name: PropTypes.string
      })
    ),
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    ),
    imdb_id: PropTypes.string,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    popularity: PropTypes.number,
    release_date: PropTypes.string,
  })
};

export default MovieDetails;
