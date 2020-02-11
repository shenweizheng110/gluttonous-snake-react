import * as React from 'react';
import axios from '../../../utils/request';
import { message } from 'antd';
import { qiniuDomain, generateHash } from '../../../utils/util';
import * as md5 from 'md5';

const { createContext, useState } = React;

export const PersonalStoreContext = createContext(null);

const PersonalStore: React.FunctionComponent = ({ children }) => {
    const [userInfo, setUserInfo] = useState<PersonalDTS.UserInfo>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [imgUrl, setImgUrl] = useState<string>(null);

    const [imgBack, setImgBack] = useState<string>(null);

    const [codeNum, setCodeNum] = useState<number>(60);

    const getUserInfo: PersonalDTS.GetUserInfo = (userId) => {
        axios.get('/api/user/detail/' + userId)
            .then(res => {
                let { status, result } = res.data;
                if (status.code !== 1) {
                    return;
                }
                setUserInfo(result.data);
                setImgUrl(result.data.headImg);
            })
            .catch((error: any) => {
                message.error(error);
                console.log(error);
            });
    };

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
            setImgUrl(null);
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

    const handleBaseInfoSubmit: PersonalDTS.HandleSubmit = (form) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                axios.put('/api/user/update', {
                    userId: userInfo.id,
                    username: values.username,
                    email: values.email,
                    age: values.age,
                    gender: values.gender,
                    signature: values.signature,
                    headImg: imgBack || imgUrl
                }).then(res => {
                    let { status } = res.data;
                    if (status.code === 1) {
                        message.success('修改成功');
                        setImgBack(null);
                        getUserInfo(userInfo.id);
                    }
                }).catch(error => {
                    message.error(error);
                    console.log(error);
                });
            }
        });
    };

    const sendCode: RegisterDTS.SendCode = (phone) => {
        let randomStr = sessionStorage.getItem('phone_hash');
        if (!randomStr) {
            randomStr = generateHash();
            sessionStorage.setItem('phone_hash', randomStr);
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

    const handleChangePhone: PersonalDTS.HandleChangePhone = (form: any) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                axios.put('/api/user/update/phone', {
                    userId: userInfo.id,
                    password: md5(values.password),
                    phone: values.phone,
                    code: values.code,
                    hash: sessionStorage.getItem('phone_hash') || ''
                }).then(res => {
                    let { status } = res.data;
                    if (status.code === 1) {
                        message.success('修改成功');
                        sessionStorage.removeItem('phone_hash');
                        getUserInfo(userInfo.id);
                        form.resetFields();
                    }
                }).catch(error => {
                    message.error(error);
                    console.log(error);
                });
            }
        });
    };

    const handleChangePassword: PersonalDTS.HandleChangePassword = (form: any) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                axios.put('/api/user/update/password', {
                    userId: userInfo.id,
                    oldPassword: md5(values.oldPassword),
                    newPassword: md5(values.newPassword)
                }).then(res => {
                    let { status } = res.data;
                    if (status.code === 1) {
                        message.success('修改成功');
                        getUserInfo(userInfo.id);
                        form.resetFields();
                    }
                }).catch(error => {
                    message.error(error);
                    console.log(error);
                });
            }
        });
    };

    const store: PersonalDTS.Store = {
        userInfo,
        loading,
        imgUrl,
        imgBack,
        codeNum,

        actions: {
            getUserInfo,
            handleBaseInfoSubmit,
            beforeUpload,
            handleUploadChange,
            sendCode,
            handleChangePhone,
            handleChangePassword
        }
    };

    return (
        <>
            <PersonalStoreContext.Provider value={store}>
                { children }
            </PersonalStoreContext.Provider>
        </>
    );
};

export default PersonalStore;
