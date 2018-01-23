import React, {Component} from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce'
import AutoComplete from 'material-ui/AutoComplete';
import {Card} from 'material-ui/Card';

const apiKey = '68b4fe2a513155a58dd0af4adacb281b';
const url  = `https://api.themoviedb.org/3/search/movie`;

const dataSourceConfig = {
    text: 'title',
    value: 'id',
};

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results : [],
            query : ''
        };

        this.onNewRequest  = this.onNewRequest.bind(this);
        this.onUpdateInput = this.onUpdateInput.bind(this);
        this.searchMovies = debounce(this.searchMovies.bind(this), 500);
    }

    onNewRequest(query) {
        this.setState({
            query: query,
        });
    }

    onUpdateInput(query) {
        this.setState({
            query: query,
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
                        results: response.data.results
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <div>
                <Card
                    style={{padding: '1rem'}}>
                        <AutoComplete
                            hintText='czego szukasz?'
                            dataSource={this.state.results}
                            dataSourceConfig={dataSourceConfig}
                            filter={AutoComplete.noFilter}
                            onNewRequest  ={this.onNewRequest}
                            onUpdateInput ={this.onUpdateInput}
                            floatingLabelText='Szukaj'
                            fullWidth={true}
                        />
                </Card>

            </div>
        );
    }
}

export default Search;
