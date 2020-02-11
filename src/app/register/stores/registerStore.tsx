import * as React from 'react';
import { message } from 'antd';
import { qiniuDomain, generateHash } from '../../../utils/util';
import axios from '../../../utils/request';
import * as md5 from 'md5';
import { withRouter } from 'react-router-dom';
import Common from '../../../interface/common';

const { useState, createContext } = React;

export const RegisterStoreContext = createContext(null);

const RegisterStore: React.FunctionComponent<Common.NavigatorComponent> = ({ children, history }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const [imgUrl, setImgUrl] = useState<string>(null);

    const [codeNum, setCodeNum] = useState<number>(60);

    const [imgBack, setImgBack] = useState<string>(null);

    const getBase64: RegisterDTS.GetBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload: RegisterDTS.BeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleUploadChange: RegisterDTS.HandleUploadChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            let { status, result } = info.file.response;
            if (status.code === 1) {
                setImgBack(`${qiniuDomain}${result.key}`);
            } else {
                message.error(status.message);
            }
            // setLoading(false);
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                setImgUrl(imageUrl);
                setLoading(false);
            });
        }
    };

    const register: RegisterDTS.Register = (form) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                let params = Object.assign({}, values);
                delete params.confirmPassword;
                params.password = md5(params.password);
                params.headImg = imgBack;
                params.hash = sessionStorage.getItem('register_hash') || '';
                axios.post('/api/user/register', params)
                    .then(res => {
                        let { status } = res.data;
                        if (status.code === 1) {
                            message.success('注册成功');
                            history.push('/login');
                            sessionStorage.removeItem('register_hash');
                        }
                    })
                    .catch(error => {
                        message.error(error);
                        console.log(error);
                    });
            };
        });
    };

    const sendCode: RegisterDTS.SendCode = (phone) => {
        let randomStr = sessionStorage.getItem('register_hash');
        if (!randomStr) {
            randomStr = generateHash();
            sessionStorage.setItem('register_hash', randomStr);
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

    const store: RegisterDTS.Store = {
        loading,
        imgUrl,
        codeNum,

        actions: {
            beforeUpload,
            handleUploadChange,
            register,
            sendCode
        }
    };

    return (
        <>
            <RegisterStoreContext.Provider value={store}>
                { children }
            </RegisterStoreContext.Provider>
        </>
    );
};

export default withRouter(RegisterStore);
