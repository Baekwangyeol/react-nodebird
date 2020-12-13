import React,{ useCallback, useState,useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Form,Input,Checkbox,Button  } from 'antd';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch,useSelector} from 'react-redux';
import Router from 'next/router';

const Signup =() =>{
    const dispatch = useDispatch();
    const {signUpLoading, signUpDone ,signUpError,me } =useSelector((state)=>state.user);

    useEffect(() => {
        if (me && me.id) {
          Router.replace('/');
        }
      }, [me && me.id]);

    useEffect(() => {
        if(signUpDone) {
            Router.replace('/');
        }
    }, [signUpDone]);

    useEffect(() => {
        if(signUpError) {
           alert(signUpError);
        }
    }, [signUpError]);

    const [email , onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password , onChangePassword] = useInput('');
    const [passwordCheck , setPasswordCheck] = useState('');
    const [passwordError , setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value !== password);
    },[password]);

    const [term , setTerm] =useState(false);
    const [termError, setTermError]= useState(false);
    const onChangeTerm = useCallback((e)=>{
        setTermError(false);
        setTerm(e.target.checked);
    },[])



    const onSubmit = useCallback(()=>{
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        console.log(email, password,nickname)

        dispatch({
            type:SIGN_UP_REQUEST,
            data: {email, password,nickname},
        })

    },[email,password,passwordCheck,term]);


    return (
        <AppLayout>
        <Head>
         <meta charset="utf-8"/>
         <title>회원가입 | NodeBird</title>
          </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br/>
                    <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required/>
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br/>
                    <Input name="user-nick" value={nickname} onChange={onChangeNickname}/>
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} onChange={onChangePassword}/>
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br/>
                    <Input name="user-password-check" 
                    type="password"
                     value={passwordCheck} 
                     onChange={onChangePasswordCheck}/>
                     {passwordError && <div style={{color :'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니까</Checkbox>
                    {termError && <div style={{color :'red'}}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button htmlType="submit" type="primary" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>

        </AppLayout>
    )

};


export default Signup;
