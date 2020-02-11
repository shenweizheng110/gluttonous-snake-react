import * as React from 'react';
import axios from '../../../utils/request';
import * as md5 from 'md5';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import Common from '../../../interface/common';

const { createContext } = React;

export const LoginStoreContext = createContext(null);

const LoginStore: React.FunctionComponent<Common.NavigatorComponent> = ({ children, history }) => {
    const login: LoginDTS.Login = (form) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                axios.post('/api/user/login', {
                    account: values.username,
                    password: md5(values.password)
                }).then(res => {
                    let { status, result } = res.data;
                    if (status.code === 1) {
                        sessionStorage.setItem('userId', result.userId);
                        sessionStorage.setItem('headImg', result.headImg);
                        sessionStorage.setItem('username', result.username);
                        history.push('/home');
                    }
                }).catch(error => {
                    message.error(error);
                    console.log(error);
                });
            }
        });
    };

    const store = {
        actions: {
            login
        }
    };

    return (
        <>
            <LoginStoreContext.Provider value={store}>
                { children }
            </LoginStoreContext.Provider>
        </>
    );
};

export default withRouter(LoginStore);
