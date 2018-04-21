import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header_container';
import Footer from '../footer/Footer';
import './session.css';

class SessionForm extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    

    if(this.props.auth === true){
      //if there is a currentUser already, re-direct them home
      this.props.history.push('/');

    }
  }


  handleClick(e){
    e.preventDefault();
    console.log("this was clicked");
  }




  renderContent(){
    switch(this.props.form_type){
      case 'login':
        return(
          <div>
            <div className="div-account">
             Don't have an account? &nbsp;
            <Link to="/session/signup">
              <span style={{color: 'blue'}}>Register</span>
            </Link>

            </div>

            <div className="input-buttons">
              <button className="authBtn" onClick={this.handleClick}>
              Demo Login
              </button>

              <button className="loginBtn loginBtn-google">
              <a href="/auth/google"> Login with Google </a>
              </button>
            </div>
          </div>
        );
      default:
        return(
          <div>
            <div className="div-account">
             Already have an account? &nbsp;
            <Link to="/session/login">
              <span style={{color: 'blue'}}>Login</span>
            </Link>

            </div>

            <div className="input-buttons">
              <button className="authBtn">
              Register
              </button>

              <button className="loginBtn loginBtn-google">
              <a href="/auth/google"> Signup with Google </a>
              </button>
            </div>
          </div>
        );







    }

  }


  render(){

    const {form_type} = this.props;


    return(


        <div className="container">
          <Header />

          <div className="session-container">

              <form className="session-form">


                <input placeholder="Enter Username" className="input-session" type="text"/>


                <input placeholder="Enter Password" className="input-session" type="password"/>

                {this.renderContent()}



              </form>


          </div>
          <Footer />
        </div>




    )

  }
}

export default SessionForm;