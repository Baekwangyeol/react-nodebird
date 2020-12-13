import React,{useState,useCallback} from 'react';
import PropTypes from 'prop-types';
import { Button, Card ,Popover,Comment,List} from 'antd';
import PostImages from './PostImages';
import {useSelector,useDispatch} from 'react-redux';
import {EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined ,HeartTwoTone} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST,LIKE_POST_REQUEST ,UNLIKE_POST_REQUEST,RETWEET_REQUEST} from '../reducers/post';
import FollowButton from './FollowButton';
import Link from 'next/link';
import moment from 'moment';

moment.locale('ko');

const PostCard = ({ post }) =>{
    const dispatch = useDispatch();
    const {RemovePostLoading} =useSelector((state)=> state.post);
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const id = useSelector((state) => state.user.me?.id);
    const liked = post.Likers.find((v)=> v.id === id);
   
   //좋아요 시작
    const onLike = useCallback (()=>{
        if(!id){
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        })
    },[])
    const onUnLike = useCallback (()=>{
        if(!id){
            return alert('로그인이 필요합니다.');
        }
        return  dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
        })
    },[])
    //좋아요끝


    const onToggleComment = useCallback (()=>{
        setCommentFormOpend((prev)=> !prev);
    },[])

    const onRemovePost = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다.');
        }
        return    dispatch({
                type: REMOVE_POST_REQUEST,
                data: post.id,
            })
    },[])

    const onRetweet = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type : RETWEET_REQUEST,
            data:post.id
        })
    },[id]);
    
    // const id = me?.id;
    return (
        <div style={{marginBottom :10}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images}/>} //antd 이미지
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet}/>,  //배열안 jsx는 키값이 필요
                    liked
                    ?<HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike}/>
                    :<HeartOutlined key="heart" onClick={onLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                          {id && post.User.id === id 
                          ?(
                          <> 
                          <Button>수정</Button>
                          <Button type="danger" loading={RemovePostLoading} onClick={onRemovePost}>삭제</Button>
                          </>
                          )
                          :   <Button>신고</Button> }  
                          
                        </Button.Group> //popover안의 content는 그걸눌렀을때의 버튼들  
                    )}> 
                        <EllipsisOutlined/>
                    </Popover>,//popover는 손올렸을때 더보기버튼

                ]}  // card안 버튼
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셧습니다.` : null}
                extra={id && <FollowButton post={post}/>}
            >
                {post.RetweetIdId && post.RetweetId
                ? (<Card
                    cover={post.RetweetId.Images[0] && <PostImages images={post.RetweetId.Images}/>}
                    >
                    <div style={{float : 'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')} : 
                {new Date().getFullYear()}</div>
            <Card.Meta
             avatar={(
                <Link href={`/user/${post.RetweetId.User.id}`}>
                 <a><Avatar>{post.RetweetId.User.nickname[0]}</Avatar></a>
                </Link>)}
             title={post.RetweetId.User.nickname}
             description={<PostCardContent postData={post.RetweetId.content} />}
             />
                </Card>)
                :(
                    <>
                    <div style={{float : 'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')} : {moment(post.createdAt).fromNow()}
                    </div>
                    <Card.Meta
                    avatar={(
                    <Link href={`/user/${post.User.id}`}>
                        <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                    </Link>)}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                    />
                    </>
                )}
            </Card>
            { commentFormOpend && (
                <div>
            <CommentForm post={post}/>   
            <List 
                header={`${post.Comments.length}개의 댓글`}
                itemLayout="horizontal"
                dataSource={post.Comments}
                renderItem={(item)=>(
                    <li>
                        <Comment
                        author={item.User.nickname}
                        avatar={(
                        <Link href={`/user/${item.User.id}`}>
                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                        </Link>)}
                          content={item.content}
                        />
                    </li>
                    
                )}
                
            /> 
        </div>)}
        </div>
    )
};

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
      Likers:PropTypes.arrayOf(PropTypes.object),
    }),
  };

export default PostCard;