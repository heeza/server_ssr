import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';

class AdminListPage extends Component {
    componentDidMount() {
        this.props.fetchAdmins();
    }

    renderAdmins() {
        return this.props.admins.map(admin => {
            return <li key={admin.id}>{admin.name}</li>
        })
    }

    render() {
        return (
            <div>
                <he>Protected list of admins</he>
                <ul>{this.renderAdmins()}</ul>
            </div>
        )
    }
}

function mapStateToProps({ admins }) {
    return { admins }
}

export default {
    component: connect(mapStateToProps, { fetchAdmins })(AdminListPage),
    loadData: ( { dispatch} ) => dispatch(fetchAdmins())
}