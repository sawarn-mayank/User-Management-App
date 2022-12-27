import React, { Component } from 'react'
import UserService from '../services/UserService'
import { withRouter } from '../components/withRouter'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            user: {}
        }
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( res => {
            this.setState({user: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View User Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> <b> User First Name: </b> </label>
                            <div> { this.state.user.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> <b> User Last Name: </b> </label>
                            <div> { this.state.user.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> <b> User Email ID: </b> </label>
                            <div> { this.state.user.emailId }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(ViewUserComponent)