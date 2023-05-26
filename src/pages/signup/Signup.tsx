import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import {  useContext, useState } from 'react'
import { LoginForm } from '@ant-design/pro-components'
import { Tabs, notification } from 'antd'
import {
  LockOutlined,
  UserOutlined,
  SmileOutlined
} from '@ant-design/icons';
import {
  ProFormText
} from '@ant-design/pro-components';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'



type LoginType = 'login' | 'signup';

type SignUpFormType = {
  username: string,
  password: string
} 

export default function Signup() {
  const [loginType, setLoginType] = useState<LoginType>('login');
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate()

  const {dispatch} : any = useContext(AuthContext)

  const openNotification = () => {
    api.open({
      message: 'Action Successfully',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />
    });
  };

  const errorNotification = (error: any) => {
    api.open({
      message: `${error}`,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />
    });
  };

  const onFinish = async(values: SignUpFormType) => {
    if(loginType === 'signup'){
      try{
        await createUserWithEmailAndPassword(auth, values.username, values.password)
        openNotification()
        //localstorage
      }catch(err){
        errorNotification(err)
      }
    }
    if(loginType === 'login'){
      try{
        const user = await signInWithEmailAndPassword(auth, values.username, values.password)
        dispatch({ type: 'LOGIN', payload: user })
        openNotification()
        //localstorage
        navigate(`user/${auth?.currentUser?.uid}/fileList`)
      }catch(err){
        errorNotification(err)
      }
    }
  };


  return (
    <div style={{ backgroundColor: 'white' }}>
    {contextHolder}
    <LoginForm
      logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
      title="Cloud Platform"
      subTitle="Cloud Platform"
      submitter={{ searchConfig: { submitText: 'Login'}}}
      onFinish={onFinish}
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
      >
        <Tabs.TabPane key={'login'} tab={'Login'} />
        <Tabs.TabPane key={'signup'} tab={'Signup'} />
      </Tabs>
      {loginType === 'login' && (
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'Email'}
            rules={[
              {
                required: true,
                message: 'email must be fill',
              },
            ]}
           
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />
            }}
            placeholder={'Password'}
            rules={[
              {
                required: true,
                message: 'Password',
              },
            ]}
          />
        </>
      )}
      {loginType === 'signup' && (
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />
            }}
            placeholder={'Email'}
            rules={[
              {
                required: true,
                message: 'email must be fill'
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />
            }}
            placeholder={'Password'}
            rules={[
              {
                required: true,
                message: 'Password'
              },
            ]}
          />
        </>
      )}
      <div
        style={{
          marginBlockEnd: 24
        }}
      >
        {/* <a
          style={{
            float: 'right',
          }}
        >
          Forgot Password
        </a> */}
      </div>
    </LoginForm>
  </div>
  )
}