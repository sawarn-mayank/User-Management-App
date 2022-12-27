import React, { Component } from 'react'
import UserService from '../services/UserService'
import {withRouter} from '../components/withRouter'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
                users: []
        }
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        
    }
 
    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    viewUser(id){
        this.props.navigate(`/view-user/${id}`);
        
    }
    updateUser(id){
        this.props.navigate(`/update-user/${id}`);
    }
 
   componentDidMount(){
        UserService.getUsers().then((res) => {
            
            if(res.data==null)
            {
                this.props.navigate('/add-user/_add');
            }
            this.setState({ users: res.data});
        });
    }
 
    addUser(){
        
        this.props.navigate('/add-user/_add')
     
    }
 
        render() {
            return (
                <div>
                    <h2 className="text-center">Users List</h2>
                    <div >
                        <button className="btn btn-primary" onClick={this.addUser}>Add User</button>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>User First Name</th>
                                    <th>User Last Name</th>
                                    <th>User Email Id</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user =>
                                            <tr key={user.id}>
                                                <td> {user.firstName} </td>
                                                <td> {user.lastName}</td>
                                                <td> {user.emailId}</td>
                                                <td>
                                                    <button onClick={() => this.updateUser(user.id)} className="btn btn-info">Update</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewUser(user.id)} className="btn btn-info">View</button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            )
        }
    }

export default withRouter(ListUserComponent)