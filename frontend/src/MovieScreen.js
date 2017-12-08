import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import AppBar from 'material-ui/AppBar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


class MovieScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            selected: [1],
        }
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };

    componentWillMount(){
        this.setState({role:this.props.role});
        // console.log(this.state)
    }
    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };    handleLogout(event){
        // Todo create logout system
        // console.log("logout event");
        var loginPage =[];
        loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
    }
    render() {
        console.log(this.state);

        if (this.state.role == 'admin') {
            return (
                <div className="App">
                    <div className="adminsList">
                        <div className="moviesList">
                            <MuiThemeProvider>
                                <AppBar
                                    title="Administrator panel"
                                />
                            </MuiThemeProvider>
                            <MuiThemeProvider>
                                <Table onRowSelection={this.handleRowSelection}>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>ID</TableHeaderColumn>
                                            <TableHeaderColumn>Name</TableHeaderColumn>
                                            <TableHeaderColumn>Status</TableHeaderColumn>
                                            <TableHeaderColumn>Duration</TableHeaderColumn>
                                            <TableHeaderColumn>Price</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow selected={this.isSelected(0)}>
                                            <TableRowColumn>1</TableRowColumn>
                                            <TableRowColumn>The Godfather</TableRowColumn>
                                            <TableRowColumn>10% busy</TableRowColumn>
                                            <TableRowColumn>2h 10m</TableRowColumn>
                                            <TableRowColumn>2000 AMD</TableRowColumn>
                                        </TableRow>
                                        <TableRow selected={this.isSelected(1)}>
                                            <TableRowColumn>2</TableRowColumn>
                                            <TableRowColumn>The Shawshank Redemption</TableRowColumn>
                                            <TableRowColumn>Busy</TableRowColumn>
                                            <TableRowColumn>2h 20m</TableRowColumn>
                                            <TableRowColumn>2500 AMD</TableRowColumn>
                                        </TableRow>
                                        <TableRow selected={this.isSelected(2)}>
                                            <TableRowColumn>3</TableRowColumn>
                                            <TableRowColumn>Schindler's List</TableRowColumn>
                                            <TableRowColumn>50% busy</TableRowColumn>
                                            <TableRowColumn>3h 20m</TableRowColumn>
                                            <TableRowColumn>3000 AMD</TableRowColumn>
                                        </TableRow>
                                        <TableRow selected={this.isSelected(3)}>
                                            <TableRowColumn>4</TableRowColumn>
                                            <TableRowColumn>Steve Brown</TableRowColumn>
                                            <TableRowColumn>Busy</TableRowColumn>
                                            <TableRowColumn>1h 30m</TableRowColumn>
                                            <TableRowColumn>2500 AMD</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </MuiThemeProvider>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <div className="cashier">
                        <MuiThemeProvider>
                            <AppBar
                                title="Movies List"
                            />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <List>
                                <ListItem primaryText="The Godfather" rightIcon={<ActionInfo />} />
                                <ListItem primaryText="The Shawshank Redemption " rightIcon={<ActionInfo />} />
                                <ListItem primaryText="Schindler's List" rightIcon={<ActionInfo />} />
                                <ListItem primaryText="Fight Club" rightIcon={<ActionInfo />} />
                                <ListItem
                                    key={3}
                                    primaryText="Fight Club"
                                    open={this.state.open}
                                    onNestedListToggle={this.handleNestedListToggle}
                                    nestedItems={[
                                        <ListItem key={1} hintText="Busy" primaryText="Rad Hall" />,
                                        <ListItem key={2} hintText="Busy" primaryText="Dec. 11" />,
                                        <ListItem key={3} hintText="Busy" primaryText="Price. 2500 AMD" />,
                                        <ListItem key={4} hintText="Busy" primaryText="16 left" />,
                                        <FlatButton label="Order " primary={true} />
                                    ]}
                                />
                            </List>
                        </MuiThemeProvider>
                    </div>
                </div>
            )
        }
    }
}

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default MovieScreen;