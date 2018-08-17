import React, { Component } from 'react';
import './App.css';
import 'react-table/react-table.css'

import ReactTable 	from "react-table";
import axios		from "axios";
import Notifications, {notify} from 'react-notify-toast';


 

class App extends Component {
	
	
	constructor(props) {
		super(props);
		
		this.state = {
			
			userName: '',
			loadedUsers : []
		};

		this.loadUserByUserName = this.loadUserByUserName.bind(this);
		this.loadAllUsers 		= this.loadAllUsers.bind(this);
		this.clearUsers 		= this.clearUsers.bind(this);
	}
	
	clearUsers() {
		this.setState({ loadedUsers: [] });		
		this.setState({ userName : ''   });
	}

	loadAllUsers() {
		
		this.setState({ loadedUsers: [] });
		
		var  url = 'http://localhost:8080/rest/users';
		
		axios.get(url)
		.then( (response) => {
			this.setState({ loadedUsers: response.data });
			console.log(this.state.loadedUsers);
		})
		.catch(function (error) {
			console.log(error);
		});
			
	}
	
	loadUserByUserName() {
		
		var  userName = this.state.userName;
		this.setState({ loadedUsers: [] });
		
		if(this.state.userName === ""  || this.state.userName === '')
		{
			notify.show('Please Enter User Name' , "warning",2000,"#FF0000");

		}
		
		else { 
		
			var  url = 'http://localhost:8080/rest/user?name=' + userName;
			
			axios.get(url)
			.then( (response) => {
				this.setState({ loadedUsers: response.data });
				console.log(this.state.loadedUsers);
			})
			.catch(function (error) {
				console.log(error);
			});
		}

	}
	// For input text field
	onUserNameChange(value){
        this.setState({
             userName: value
        });
    }
	
	 	
	render() {
		
		const tableColumns = 
		[{
			Header	: 'ID',
			accessor: 'id' 
		  }, 
		  {
			Header	: 'Name',
			accessor: 'name'
			
		  }, 
		  {
			Header	: 'PhoneNumber',
			accessor: 'phoneNumber'
			
		  }, 
		  {
			Header	: 'Address',
			accessor: 'address'
		}];
		
		return (
     
		<div className ="App" >
			<Notifications options={{zIndex: 200, top: '20px'}} />
			<div className = "InputDiv" >
			
				<button onClick={this.loadUserByUserName} className = "loadButton">
					Load User
				</button>
				
				<input 
					type	= "text" 
					name	= "userName" 
					value   = {this.state.userName}
					onChange= {e => this.onUserNameChange(e.target.value)}
					placeholder = "Enter User Name Here"	
					className  	= "userNameInput"
				/>
				
			</div>
			<div className = "InputDivAll" >
			
				<button onClick={this.loadAllUsers} className = "loadAllButton">
					Load All Users
				</button>
				<button onClick={this.clearUsers}   className = "clearButton">
					Clear
				</button>
				
			</div>
		
			<div class = "tableDiv" >
				< ReactTable
					data	= { this.state.loadedUsers }
					columns	= { tableColumns }
					defaultPageSize	={10}
					
				/>
			</div>
        
		</div>
    );
  }
}

export default App;
