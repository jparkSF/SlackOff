import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ChannelDisplay from './ChannelDisplay';

import { createChannel, fetchChannels } from '../../../../actions/index';
import {RECEIVE_CHANNEL} from '../../../../actions/types';

function checkValidChannels(state){
    if(Object.keys(state.channels).length > 0){

      let objSpread = Object.keys(state.channels).map((key) => {
        return state.channels[key];

      });

      return objSpread;

    } else{
      return [];
    }
}



function mapStateToProps(state,ownProps){
  const { channels,auth } = state;

  return {
    channels: checkValidChannels(state),
    errors: state.errors.channel,
    auth_type: Object.keys(auth)[0],
    type: ownProps.match.params.type,
    type_id: ownProps.match.params.type_id



  };

}

function mapDispatchToProps(dispatch){
  return{
      createChannel: (channel,type) => dispatch(createChannel(channel,type)),
      fetchChannels: () => dispatch(fetchChannels()),
      clearErrors: () => dispatch({type: RECEIVE_CHANNEL, payload: []}),
  };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelDisplay));