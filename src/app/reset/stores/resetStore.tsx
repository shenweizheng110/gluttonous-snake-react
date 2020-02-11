import * as React from 'react';
import { message } from 'antd';
import { generateHash } from '../../../utils/util';
import axios from '../../../utils/request';
import * as md5 from 'md5';
import { withRouter } from 'react-router-dom';
import Common from '../../../interface/common';

const { useState, createContext } = React;

export const ResetStoreContext = createContext(null);

const ResetStore: React.FunctionComponent<Common.NavigatorComponent> = ({ children, history }) => {
    const [codeNum, setCodeNum] = useState<number>(60);

    const resetPassword: ResetDTS.ResetPassword = (form) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                let params = Object.assign({}, values);
                delete params.confirmPassword;
                params.password = md5(params.password);
                params.hash = sessionStorage.getItem('reset_hash') || '';
                axios.post('/api/user/reset/password', params)
                    .then(res => {
                        let { status } = res.data;
                        if (status.code === 1) {
                            message.success('重置成功');
                            history.push('/login');
                            sessionStorage.removeItem('reset_hash');
                        }
                    })
                    .catch(error => {
                        message.error(error);
                        console.log(error);
                    });
            };
        });
    };

    const sendCode: ResetDTS.SendCode = (phone) => {
        let randomStr = sessionStorage.getItem('reset_hash');
        if (!randomStr) {
            randomStr = generateHash();
            sessionStorage.setItem('reset_hash', randomStr);
        }
        axios.get('/api/common/code', {
            params: {
                phone,
                hash: randomStr
            }
        }).then(res => {
            let { status } = res.data;
            if (status.code === 1) {
                message.success('验证码发送成功');
                let num = codeNum;
                const intervalId = setInterval(() => {
                    if (num === 1) {
                        clearInterval(intervalId);
                        setCodeNum(60);
                    } else {
                        setCodeNum(--num);
                    }
                }, 1000);
            }
        }).catch(error => {
            message.error(error);
            console.log(error);
        });
    };

    const store: ResetDTS.Store = {
        codeNum,

        actions: {
            resetPassword,
            sendCode
        }
    };

    return (
        <>
            <ResetStoreContext.Provider value={store}>
                { children }
            </ResetStoreContext.Provider>
        </>
    );
};

export default withRouter(ResetStore);
