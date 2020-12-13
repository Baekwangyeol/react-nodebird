import produce from '../util/produce';

export const initialState  = {
    mainPosts: [],
    singlePost:null,
    imagePaths: [],  //업로드할때 여기경로로 저장
    hasmorePosts: true,
    likePostLoading: false,
    likePostDone: false,
    likePostEroor: null,

    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostEroor: null,

    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesEroor: null,

    reTweetLoading: false,
    reTweetDone: false,
    reTweetError: null,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostEroor: null,

    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsEroor: null,
    addPostLoading: false,
    addPostDone: false,
    addPostEroor: null,
    RemovePostLoading: false,
    RemovePostDone: false,
    RemovePostEroor: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentEroor: null, // 게시글추가가 완료됬을떄 이게 true가됨
  };

export const REMOVE_IMAGES = 'REMOVE_IMAGES';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';


  export const addPost = (data) => ({
      type: ADD_POST_REQUEST,
      data,
    });
    

    export const addComment = (data) => ({
      type: ADD_COMMENT_REQUEST,
      data,
    });

const reducer = (state = initialState , action)=> produce(state, (draft) =>{
  switch (action.type){
    case REMOVE_IMAGES:
      draft.imagePaths = draft.imagePaths.filter((v,i) => i !== action.data); 
      break;
      case RETWEET_REQUEST:
        draft.reTweetLoading = true;
        draft.reTweetDone = false;
        draft.reTweetError =null;
        break;
      case RETWEET_SUCCESS:
        draft.reTweetLoading = false;
        draft.reTweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_FAILURE:
        draft.reTweetLoading =false;
        draft.reTweetError=action.error;
        break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError =null;
      break;
    case UPLOAD_IMAGES_SUCCESS:
      draft.imagePaths =action.data;
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading =false;
      draft.uploadImagesError =action.error;
      break;
        case LIKE_POST_REQUEST:
          draft.likePostLoading = true;
          draft.likePostDone = false;
          draft.likePostError =null;
          break;
        case LIKE_POST_SUCCESS:{
          //action.data <- postId, UserId
          const post = draft.mainPosts.find((v)=> v.id === action.data.PostId);
          post.Likers.push({ id :action.data.UserId });
          draft.likePostLoading = false;
          draft.likePostDone = true;
          break;
        }
        case LIKE_POST_FAILURE:
          draft.likePostLoading =false;
          draft.likePostError =action.error;
          break;
          case UNLIKE_POST_REQUEST:
            draft.unlikePostLoading = true;
            draft.unlikePostDone = false;
            draft.unlikePostError =null;
            break;
          case UNLIKE_POST_SUCCESS:{
            const post = draft.mainPosts.find((v)=> v.id === action.data.PostId);
            post.Likers =  post.Likers.filter((v)=> v.id !== action.data.UserId);
            draft.unlikePostLoading = false;
            draft.unlikePostDone = true;
            break;
          }
          case UNLIKE_POST_FAILURE:
            draft.unlikePostLoading =false;
            draft.unlikePostError =action.error;
            break;
        case LOAD_USER_POSTS_REQUEST:    
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_POSTS_REQUEST:
          draft.loadPostsLoading = true;
          draft.loadPostsDone = false;
          draft.loadPostsError =null;
          break;
        case LOAD_USER_POSTS_SUCCESS:    
        case LOAD_HASHTAG_POSTS_SUCCESS:  
        case LOAD_POSTS_SUCCESS:
          draft.loadPostsLoading = false;
          draft.loadPostsDone = true;
          draft.mainPosts = draft.mainPosts.concat(action.data);
          draft.hasmorePosts = action.data.length === 10;
          break;
        case LOAD_USER_POSTS_FAILURE:    
        case LOAD_HASHTAG_POSTS_FAILURE:   
        case LOAD_POSTS_FAILURE:
          draft.loadPostsLoading =false;
          draft.loadPostsError =action.error;
          break;
          case LOAD_POST_REQUEST:
            draft.loadPostLoading = true;
            draft.loadPostDone = false;
            draft.loadPostError =null;
            break;
          case LOAD_POST_SUCCESS:
            draft.loadPostLoading = false;
            draft.loadPostDone = true;
            draft.singlePost = action.data;
            break;
          case LOAD_POST_FAILURE:
            draft.loadPostLoading =false;
            draft.loadPostError =action.error;
            break;

        case ADD_POST_REQUEST:
          draft.addPostLoading =true;
          draft.addPostDone = false;
          draft.addPostError =null;
          break;
        case ADD_POST_SUCCESS:
          console.log(action.data);
          draft.addPostLoading = false;
          draft.addPostDone = true;
          draft.mainPosts.unshift(action.data);
          draft.imagePaths= [];
          break;
        case ADD_POST_FAILURE:
          draft.addPostLoading =false;
          draft.addPostError =action.error;
          break;
          case REMOVE_POST_REQUEST:
            draft.RemovePostLoading =true;
            draft.RemovePostDone = false;
            draft.RemovePostError =null;
           break;
            case REMOVE_POST_SUCCESS:
              draft.RemovePostLoading =false;
              draft.RemovePostDone = true;
              draft.mainPosts= draft.mainPosts.filter((v) => v.id !== action.data.PostId);
            break;
            case REMOVE_POST_FAILURE:
              draft.RemovePostLoading =false;
              draft.RemovePostError =action.error;
             break;
          case ADD_COMMENT_REQUEST:
            draft.addCommentLoading =true;
            draft.addCommentDone = false;
            draft.addCommentError =null;
            break;
            case ADD_COMMENT_SUCCESS:{
              const post =draft.mainPosts.find((v) => v.id === action.data.PostId);
              post.Comments.unshift(action.data);
              draft.addCommentLoading = false;
              draft.addCommentDone = true;
              break;
            }
            case ADD_COMMENT_FAILURE:
              draft.addCommentLoading =false;
              draft.addCommentError =action.error;
             break;
           default:
           break;
    }
    });



export default reducer;