import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
var apiBaseUrl = "http://localhost:4000/api/";
import axios from 'axios';
import MoviePage from './MoviePage';

class Login extends Component {
    constructor(props){
        super(props);
        var localloginComponent=[];
        localloginComponent.push(
            <MuiThemeProvider>
                <div>
                    <TextField
                        floatingLabelText="Cashier Id"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br/>
                    <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
        )
        this.state={
            username:'',
            password:'',
            menuValue:1,
            loginComponent:localloginComponent,
            loginRole: 'cash'
        }
    }
    componentWillMount(){
        // console.log("willmount prop values",this.props);
        if(this.props.role != undefined){
            console.log('/////')
            console.log(this.props.role);
            console.log('/////')

            if(this.props.role == 'cash'){
                console.log("in  componentWillMount");
                var localloginComponent=[];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                floatingLabelText="Cashier Id"
                                onChange = {(event,newValue) => this.setState({username:newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange = {(event,newValue) => this.setState({password:newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'cash'})
            }

            if(this.props.role == 'admin'){
                console.log("in administrator componentWillMount");
                var localloginComponent=[];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                hintText="Enter your Ciriono Rollno"
                                floatingLabelText="Administrator Id"
                                onChange = {(event,newValue) => this.setState({username:newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange = {(event,newValue) => this.setState({password:newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'admin'})
            }
        }
    }
    handleClick(event){
        var self = this;
        var payload={
            "userid":this.state.username,
            "password":this.state.password,
            "role":this.state.loginRole
        }
        axios.post(apiBaseUrl+'login', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    console.log("Login successfull");
                    var uploadScreen=[];
                    uploadScreen.push(<MoviePage appContext={self.props.appContext} menuitem={self.state.menuValue} role={self.state.loginRole}/>)
                    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
                }
                else if(response.data.code == 204){
                    console.log("Username password do not match");
                    alert(response.data.success)
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleMenuChange(value){
        console.log("menuvalue",value);
        var loginRole;
        if(value==1){
            var localloginComponent=[];
            loginRole='cash';
            localloginComponent.push(
                <MuiThemeProvider>
                    <div>
                        <TextField
                            floatingLabelText="Cashier Id"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            )
        }
        else if(value == 2){
            var localloginComponent=[];
            loginRole='admin';
            localloginComponent.push(
                <MuiThemeProvider>
                    <div>
                        <TextField
                            floatingLabelText="Administrator Id"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            )
        }
        this.setState({menuValue:value,
            loginComponent:localloginComponent,
            loginRole:loginRole})
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Login"
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <div>
                        <p>Login as:</p>
                        <DropDownMenu value={this.state.menuValue} onChange={(event,index,value)=>this.handleMenuChange(value)}>
                            <MenuItem value={1} primaryText="Cashier" />
                            <MenuItem value={2} primaryText="Administrator" />
                        </DropDownMenu>
                    </div>
                </MuiThemeProvider>
                {this.state.loginComponent}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Login;