import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

var apiBaseUrl = "http://localhost:4000/api/";
var request = require('superagent');

class MovieScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            role:'cash',
            filesPreview:[],
            filesToBeSent:[],
        }
    }
    componentWillMount(){
        console.log(this.state)
    }
    handleClick(event){
    }
    handleLogout(event){
        // console.log("logout event fired",this.props);
        var loginPage =[];
        loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
        this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
    }
    render() {
        console.log(this.state);
        if(this.state.role == 'admin'){
            return (
                <div className="App">
                    <div className="adminsList">
                        <div className="halls"></div>
                        <div className="moviesList"></div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="App">
                        <div className="moviesList">
                        </div>
                </div>
            );
        }
    }
}

const style = {
    margin: 15,
};

export default MovieScreen;