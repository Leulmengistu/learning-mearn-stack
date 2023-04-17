import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component{

    constructor(props){
        super(props)
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username: '',

        }
        
    }

    onChangeUsername(e){
    this.setState({username: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const User = {username: this.state.username};
        console.log('Added User: ',User);
        axios.post('http://localhost:5000/users/add', User).then(res=>alert(`The added username is:  ${User.username}`)).catch(err=>console.log("Error: ",err))
        alert(`You have created a user withe the username: ${User.username}`)
        this.setState({username: ''})
    }

    render(){
        console.log('Create user component loaded')
        return(
            <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
        )
    }
}