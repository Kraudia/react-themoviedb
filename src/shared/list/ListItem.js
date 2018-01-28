import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, List } from 'semantic-ui-react';
import ListItemImage from './ListItemImage';
import { BASE_NAME } from '../../config';

class ListItem extends Component {
  render() {
    return (
      <Grid.Column>
        <Card href={BASE_NAME + '/movie/' + this.props.info.id} color='green'>
          <ListItemImage poster_path={this.props.info.poster_path}/>
          <Card.Content>
            <Card.Header>
              {this.props.info.title}
            </Card.Header>
            <Card.Description>
              <List>
                <List.Item>
                  <List.Icon name='star' />
                  <List.Content>Popularność: {Number(this.props.info.popularity).toFixed(2)}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='send' />
                  <List.Content>Głosów: {this.props.info.vote_count}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='thumbs up' />
                  <List.Content>Średnia: {this.props.info.vote_average}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='thumbs up' />
                  <List.Content>Publikacja: {this.props.info.release_date}</List.Content>
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

ListItem.propTypes = {
    info: PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
      popularity: PropTypes.number,
      vote_count: PropTypes.number,
      vote_average: PropTypes.number
    })
};

export default ListItem;
