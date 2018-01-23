import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from "./components/Header";
import Search from "./components/Search";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#f44336',
        primary2Color: "#f57c00",
        accent1Color: '#8bc34a'
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header/>
                    <Search/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
