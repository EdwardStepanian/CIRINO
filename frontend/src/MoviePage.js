import React, { Component } from 'react';
import MovieScreen from './MovieScreen';
import './App.css';
import AppBar from 'material-ui/AppBar';


class App extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    componentDidMount(){
        var currentScreen=[];
        currentScreen.push(<MovieScreen appContext={this.props.appContext} role={this.props.role}/>);
        this.setState({currentScreen})
    }
    render() {
        return (
            <MovieScreen appContext={this.props.appContext} role={this.props.role}/>
        );
    }
}

export default App;
