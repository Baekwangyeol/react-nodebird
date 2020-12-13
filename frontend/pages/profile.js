import React,{useEffect,useState,useCallback} from 'react';
import Router from 'next/router';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector} from 'react-redux'

import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url, { withCredentials : true}).then((result)=> result.data);

const Profile =() =>{
    const {me }= useSelector((state) => state.user);
    const [followersLimit, setFollowersLimit] =useState(3);
    const [followingsLimit, setFollowingsLimit] =useState(3);
    
    const {data:followersData, error:followerError} = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`,fetcher);
    const {data:followingsData, error:followingError} = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`,fetcher);
   
    useEffect(() => {
      if (!(me && me.id)) {
        Router.push('/');
      }
    }, [me && me.id]);

    const loadMoreFollowings = useCallback(()=>{
      setFollowingsLimit((prev) => prev + 3);
    },[]);

    const loadMoreFollowers = useCallback(()=>{
      setFollowersLimit((prev) => prev + 3);
    },[]);


    if (!me) {
      return '내정보 로딩중..';
    }
    

    if(followerError || followingError){
      console.error(followingError || followerError);
      return '팔로잉/팔로워 로딩중 에러가 발생합니다.';
    }

    return (
        <>
         <Head>
           <meta charset="utf-8"/>
          <title>내 프로필 | NodeBird</title>
         </Head>
          <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
                <FollowList header="팔로워목록" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError}/>
         </AppLayout>
        </>
    )

};

export default Profile;
