import { combineReducers } from 'redux';

// Reducers
import auth from './auth/auth';
import user from './user/user';
import audioPlayer from './audioPlayer/audioPlayer';

export default combineReducers({
    auth,
    user,
    audioPlayer,
});