import produce from '../util/produce';

export const initialState = {
  loadMyInfoLoading: false, // 유저정보 가져오기
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loadUserLoading: false, // 유저정보 가져오기
  loadUserDone: false,
  loadUserError: null,

  loginLoading: false, // 로그인시도중
  loginDone: false,
  loginError: null,

  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  signUpLoading: false,
  signUpDone: false,
  signUpError: null,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,

  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,


  me: null,
  userInfo:null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUREST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUREST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUREST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUREST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUREST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUREST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUREST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUREST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUREST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUREST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUREST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// const dummyUser = (data) => ({
//   ...data,
//   nickname: 'light10',
//   id: 1,
//   Posts: [{ id: 1 }],
//   Followers: [{ nickname: 'light1010' }, { nickname: 'light1010' }, { nickname: 'light1010' }],
//   Followings: [{ nickname: 'light1010' }, { nickname: 'light1010' }, { nickname: 'light1010' }],
// });

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
          draft.loadFollowersLoading=false;
          draft.loadFollowersDone= true;
          draft.me.Followers = action.data;
      break;  
     case LOAD_FOLLOWERS_FAILURE:
     draft.loadFollowersLoading=false;
        draft.loadFollowersError= action.error;
    break;
    case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
          draft.loadFollowingsLoading=false;
          draft.loadFollowingsDone= true;
          draft.me.Followings = action.data;
      break;  
     case LOAD_FOLLOWINGS_FAILURE:
     draft.loadFollowingsLoading=false;
        draft.loadFollowingsError= action.error;
    break;
    case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
    case LOAD_USER_SUCCESS:
          draft.loadUserLoading=false;
          draft.loadUserDone= true;
          draft.userInfo = action.data;
      break;
    case LOAD_USER_FAILURE:
      draft.loadUserLoading=false;
      draft.loadUserError= action.error;
      break;
    case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
    case LOAD_MY_INFO_SUCCESS:
          draft.loadMyInfoLoading=false;
          draft.loadMyInfoDone= true;
          draft.me = action.data;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading=false;
      draft.loadMyInfoError= action.error;
      break;
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginError = null;
      draft.loginDone = false;
      break;
    case LOG_IN_SUCCESS:
        draft.loginLoading=false;
        draft.loginDone= true;
        draft.me = action.data;
    break;  
            case LOG_IN_FAILURE:
                draft.loginLoading=false;
                draft.loginError= action.error;
            break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading=true;
                draft.logOutError = null;
                draft.logOutDone = false;
            break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading=false;
                draft.me = null;
                draft.logOutDone = true;
            break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading=false;
                draft.logOutError = action.error;
            break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading=true;
                draft.signUpError = null;
                draft.signUpDone = false;
            break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading=false;
                draft.signUpDone = true;
            break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading=false;
                draft.signUpError = action.error;
            break;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading=true;
                draft.changeNicknameError = null;
                draft.changeNicknameDone = false;
            break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.me.nickname= action.data.nickname;
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
            break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
            break;
            case FOLLOW_REQUEST:
                draft.followLoading=true;
                draft.followError = null;
                draft.followDone = false;
            break;
            case FOLLOW_SUCCESS:
                draft.followLoading = false;
                draft.followDone = true;
                draft.me.Followings.push({ id: action.data.UserId });
            break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
            break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading=true;
                draft.unfollowError = null;
                draft.unfollowDone = false;
            break;
            case UNFOLLOW_SUCCESS:{
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
            break;
            }
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
            break;
            case REMOVE_FOLLOWER_REQUEST:
                draft.removeFollowerLoading=true;
                draft.removeFollowerError = null;
                draft.removeFollowerDone = false;
            break;
            case REMOVE_FOLLOWER_SUCCESS:{
                draft.removeFollowerLoading = false;
                draft.removeFollowerDone = true;
                draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
            break;
            }
            case REMOVE_FOLLOWER_FAILURE:
                draft.removeFollowerLoading = false;
                draft.removeFollowerError = action.error;
            break;
            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({ id: action.data});
                break;
             case REMOVE_POST_OF_ME:
                 draft.me.Posts = state.me.Posts.filter((v) => v.id !== action.data.PostId);
                 break;
            default:
                break;
        
    }})



export default reducer;