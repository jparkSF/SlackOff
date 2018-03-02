import axios from 'axios';
import { FETCH_USER, CREATE_CHANNEL } from './types';

// axios pings back-end with a http request.
// res is what the back-end returns
// dispatch a regular pojo contained within res

export const fetchUser = () => async dispatch => {
      const res = await axios.get('/api/current_user');

      return dispatch({type: FETCH_USER, payload: res});
};




export const createChannel = (channel) => async dispatch => {


      //prints out {name: 'Test'}
      const res =  await axios.post(
      '/api/channel/new',
      channel
      );

      return dispatch({type: CREATE_CHANNEL, payload: res});
};
