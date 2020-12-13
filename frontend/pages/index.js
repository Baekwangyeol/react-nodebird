import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST} from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';


const Home = () => {
 const dispatch = useDispatch();
 const { me } = useSelector((state) => state.user);
 const { mainPosts, hasmorePosts,loadPostsLoading ,reTweetError} = useSelector((state) => state.post);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasmorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasmorePosts, loadPostsLoading, mainPosts]);


 
 useEffect(()=>{
  if(reTweetError){
   alert(reTweetError);
  }
},[reTweetError])

  return (
    <AppLayout>
      { me && <PostForm /> }
      { mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type:LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END); // 이게있어야 석세스까지 하고 들고옴
    await context.store.sagaTask.toPromise();// 이게있어야 석세스까지 하고 들고옴
  })

export default Home;