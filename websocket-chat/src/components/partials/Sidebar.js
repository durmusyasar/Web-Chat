import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class Sidebar extends Component {
    state = {
        search: ''
    }

    search = () => {
        this.props.socket.send(JSON.stringify({
            type: 'SEARCH',
            data: this.state.search
        }))
    }

    findorCreateThread = (id) => {
        this.props.socket.send(JSON.stringify({
            type: 'FIND_TREAD',
            data: [this.props.user.id, id]
        }))
    }

    render () {
        return (
            <div className="sidebar">
                <div className="search-container">
                    <form className="input-group">
                        <input className="form-control" placeholder="Search..." value={this.state.search} onChange={e => {
                            this.setState({ search: e.target.value })
                            }} />
                        <button className="btn btn-send input-group-append" onClick={e => this.search()}><i className="zmdi zmdi-search" /></button>
                    </form>
                </div>
                {this.state.search ? 
                    <ul className="thread-list">
                        <label>Results</label>
                        {this.props.users && this.props.users.filter(u => u.id !== this.props.user.id).map((user, ui) =>{
                            return (
                               <li key={ui}>
                                    <a onClick={e =>{
                                        e.preventDefault()
                                        this.findorCreateThread(user.id)
                                    }}>
                                        <i className="zmdi zmdi-account-circle" />
                                        <h5>{user.name}</h5>
                                        <p>{user.email}</p>
                                    </a>
                                </li> 
                            )
                        })}
                        
                    </ul>
                    :
                    <ul className="thread-list">
                        <label>Messages</label>
                        {this.props.threads.map((thread, threadIndex) => {
                            return (
                                <li>
                                    <Link to={`/${thread.id}`}>
                                        <i className="zmdi zmdi-account-circle" />
                                        <h5>{thread.id}</h5>
                                        <p>S</p>
                                    </Link>
                                </li>
                            )
                        })}
                   </ul> 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Sidebar))