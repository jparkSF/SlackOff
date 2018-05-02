import React, { Component } from 'react';
import {connect} from 'react-redux';


import 'assets/css/Message/message.css';
import 'assets/css/Message/messageUserInfo.css';
import MessageListItem from './MessageListItem';
import MessageInput from './MessageInput';


import axios from 'axios';
import isEqual  from 'lodash/isEqual';
// import { RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE } from '../../../actions/types';
import {RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE} from 'actions/types';

import socketIOClient from "socket.io-client";
import {FoldingCube} from 'better-react-spinkit';





class MessageUserInfo extends Component{
  constructor(props){
    super(props);

    this.triggerPanelCSS = this.triggerPanelCSS.bind(this);

  }

  triggerPanelCSS(){
    this.props.toggleShow();
  }



  render(){
    const {channel} = this.props;
    return(
      <section className="channel-info-panel">
        <div className="about-channel">
          <h4 className="channel-name-header">
          {`About # ${channel.name}`}
          </h4>
          <a className="a-channel-info" onClick={this.triggerPanelCSS} >
            <h5> X </h5>
          </a>
        </div>

        <div className="members-list-info">
          <i className="far fa-user" aria-hidden="true"></i>
          {Object.keys(this.props.subscribers).length}
          <span> Members </span>
        </div>




      </section>

    );
  }


};

export default MessageUserInfo;
