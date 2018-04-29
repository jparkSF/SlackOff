import React, { Component } from 'react';
import {connect} from 'react-redux';
import socketIOClient from "socket.io-client";

import './message.css';
import MessageListItem from './MessageListItem';
import MessageInput from './MessageInput';
import axios from 'axios';
import isEqual  from 'lodash/isEqual';
import { RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE } from '../../../actions/types';

// var Spinner = require('react-spinkit');
import {FoldingCube} from 'better-react-spinkit';


class Message extends Component {

  constructor(props){
    super();
    this.state = {
      search: "",
      loaded: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.triggerInputCSS = this.triggerInputCSS.bind(this);
    this.exitInputCSS = this.exitInputCSS.bind(this);

  }

   componentDidMount(){
    console.log("MESSAGE MOUNTED");

    }

  componentWillReceiveProps(nextProps){
    console.log("COMPONENT WILL RECIEVE PROPS");
    console.log(this.props, "THIS PROPS");
    console.log(nextProps, "NEXT PROPS");
    if( (nextProps.type_id !== this.props.type_id) &&
    ( isEqual(this.props.channel,nextProps.channel) === false) ){


      this.props.fetchMessages(nextProps.type_id).then( () => {
        this.props.fetchUsers().then( setTimeout( () => {
            this.setState({loaded:true});
        },3000));


      });
    }
  }




  renderConversations(){
    if(!this.state.loaded){
      return(
        <div className="spinner-wrapper">
          <FoldingCube size={75} color='gray'/>
        </div>

      )

    }

    const {users} = this.props;


    return (

        this.props.messages.map( (message) =>
          <MessageListItem
            key={message._id}
            author={users[message.author].username}
            body={message.body}
            timestamp={message.timestamp}
            time_zone={message.time_zone} />
        )

     );

   };



  handleInput(field){
    return(
      (e) => this.setState({[field]: e.target.value})
    );
  }

   handleSubmit(input){

    // const socket = socketIOClient("http://localhost:5000");
    // socket.emit('chat message', this.state.input);



    this.props.createMessage(input,this.props.type_id);
  }

  triggerInputCSS(e){
    e.preventDefault();

    e.currentTarget.classList.add("selected");
  };

  exitInputCSS(e){
    e.preventDefault();

    e.currentTarget.classList.remove("selected");
  }


  renderTopRowLeft(){
    if(!this.state.loaded){
      return;
    }

    return(

      <div className="top-row-left">

      <h4 className="channel-name-header">
        {` # ${this.props.channel.name}`}
      </h4>

      <span className="channel-people">
        <i className="far fa-user fa-2x"></i>
        <span> <strong> {this.props.channel.members.length} </strong> </span>
      </span>

      </div>
    );

  }

  renderTopRowRight(){
    if(!this.state.loaded){
      return;
    }

    return (
      <div className="top-row-right">

        <form  className="msg-input-wrapper search-container" onClick={this.triggerInputCSS} onBlur={this.exitInputCSS}>
          <button type="button" className="msg-input-gif">
            <i className="fas fa-search"></i>
          </button>
          <input
          id="msg-input"
          placeholder="Search"
          value={this.state.search}
          onChange={this.handleInput('search')} />
        </form>

      </div>

    );
  }

  render(){

    const {channel, type_id} = this.props;

    return(

      <div className="col s10">

        <div className="top-row">

          {this.renderTopRowLeft()}
          {this.renderTopRowRight()}

        </div>

        <ul className="ul-messages">

            {this.renderConversations()}

        </ul>

        <MessageInput
        channel={channel}
        type_id={type_id}
        submit={this.handleSubmit}
        />




      </div>

    );
  }


};

export default Message;
