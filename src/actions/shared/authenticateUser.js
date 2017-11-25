import { push } from 'connected-react-router';
import {
    /*dismissError,*/
    receiveValidToken
} from './actionCreators';
import {
    // failAuthentication,
    startAuthentication
} from './actionCreators';
import { fetchAuthToken } from '../../utils/api/fetchAuthToken';
import { USER_EMAIL } from '../../constants/api';
// import {
//     // MILISECONDS_TO_AUTO_DISMISS_ERROR,
//     FAILED_AUTHENTICATION_MESSAGE
// } from '../../constants/uiConstants';


