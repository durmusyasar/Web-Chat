import React from 'react';
import logo from './logo.svg';
import { Router, Switch, Route, Link, BrowserRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as ChatActions from './store/actions/chatActions'
import Auth from './components/pages/Auth'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import './assets/css/swag.css'
import * as AuthActions from './store/actions/authActions'
import Messenger from './components/pages/Messenger'

class App extends React.Component {
  componentDidMount(){
    this.props.setupSocket(this.props.token, this.props.user.id)
  }

  render() {
    return (
      <div className="App">
        <button onClick={e => {
          this.props.logout()
        }}>Log Out</button>
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={props => {
                if(this.props.token){
                  console.log(this.props.token)
                  return(
                    <Redirect to="/"/>
                  )
                } else {
                  console.log(this.props.token)
                  return (
                    <Auth />
                  )
                }
              }}
              component ={Auth}
            />
            <Route
              path="/signup"
              render={props =>{
                if(this.props.token){
                  return (
                    <Redirect to="/" />
                  )
                } else {
                  return (
                    <Auth />
                  )
                }
                
              }}
            />
            <Route
              path="/"
              render={props =>{
                if(this.props.token){
                  return (
                    <Redirect to="/login" />
                  )
                } else {
                  return (
                    <Messenger />
                  )
                }
                
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps = dispatch => ({
  setupSocket: (token, userId) => {
    dispatch(ChatActions.setupSocket(token, userId))
  },
  logout: () =>{
    dispatch(AuthActions.logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
