import { all , fork ,call ,put,takeLatest,delay,throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
    } from '../reducers/post';
import { ADD_POST_TO_ME,REMOVE_POST_OF_ME }  from '../reducers/user';



function reTweetAPI(data){
    return axios.post(`/post/${data}/retweet`, data); //formdata는 그대로 보내주기
  };
  
  function* reTweet(action) {
      try{
          const result = yield call(reTweetAPI, action.data)
          yield put({
              type: RETWEET_SUCCESS,
              data: result.data,
          });
      }catch(err){
          yield put({
              type:RETWEET_FAILURE,
              error: err.response.data,
          })
      }
  }
  

function uploadImagesAPI(data){
  return axios.post('/post/images', data); //formdata는 그대로 보내주기
};

function* uploadImages(action) {
    try{
        const result = yield call(uploadImagesAPI, action.data)
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({
            type:UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        })
    }
}



function LikePostAPI(data){
    return axios.patch(`/post/${data}/like`)
}
//일부변경 patch

function* LikePost(action) {
    try{
        const result = yield call(LikePostAPI,action.data)
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({
            type:LIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}


function unLikePostAPI(data){
    return axios.delete(`/post/${data}/like`)
}

function* unLikePost(action) {
    try{
        const result = yield call(unLikePostAPI,action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function loadPostAPI(data){
    return axios.get(`/post/${data}`);
}
function* loadPost(action) {
    try{
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type:LOAD_POST_FAILURE,
            error: err.response.data,
        })
    }
}



function loadHashtagPostsAPI(data,lastId){
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
function* LoadHashtagPosts(action) {
    try{
        const result = yield call(loadHashtagPostsAPI,action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type:LOAD_HASHTAG_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}


function loadUserPostsAPI(data,lastId){
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}
function* LoadUserPosts(action) {
    try{
        const result = yield call(loadUserPostsAPI,action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type:LOAD_USER_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}


function loadPostsAPI(lastId){
    return axios.get(`/posts?lastId=${lastId || 0}`);
}
function* LoadPosts(action) {
    try{
        const result = yield call(loadPostsAPI, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type:LOAD_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}



function addPostAPI(data){
    return axios.post('/post', data)
}
function* AddPost(action) {
    try{
        const result = yield call(addPostAPI,action.data)
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}


function removePostAPI(data){
    return axios.delete(`/post/${data}`)
}
function* RemovePost(action) {
    try{
        const result = yield call(removePostAPI,action.data)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data,
        })
    }catch(err){
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`,data)  //post/1/comment
}
function* AddComment(action) {
    try{
        const result = yield call(addCommentAPI,action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type:ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLoadPost(){
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}


function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST, reTweet)
}


function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}


function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST, LikePost)
}


function* watchunLikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost)
}

function* watchLoadPosts(){
    yield throttle(5000,LOAD_POSTS_REQUEST,LoadPosts);
}

function* watchLoadUserPosts(){
    yield throttle(5000,LOAD_HASHTAG_POSTS_REQUEST,LoadHashtagPosts);
}

function* watchLoadHashtagPosts(){
    yield throttle(5000,LOAD_USER_POSTS_REQUEST,LoadUserPosts);
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,AddPost)
}


function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST,RemovePost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, AddComment)
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPost),
        fork(watchRetweet),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchunLikePost),
        fork(watchLoadPosts),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])

}