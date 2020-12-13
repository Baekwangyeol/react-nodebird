import React,{useCallback} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST,FOLLOW_REQUEST } from '../reducers/user';
import { Button } from 'antd';


const FollowButton = ({ post }) =>{
    const dispatch = useDispatch();
    const { me,followLoading,unfollowLoading  } = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onClickButton = useCallback(()=>{
        if(isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data:post.User.id,
            })
        }else{
            dispatch({
                type: FOLLOW_REQUEST,
                data:post.User.id,
            })
        }
    },[isFollowing])

    if(post.User.id === me.id){
        return null;
    }
    return(
        <Button loading={followLoading || unfollowLoading } onClick={onClickButton} >
        {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    )

}


export default FollowButton;