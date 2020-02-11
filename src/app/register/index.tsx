import * as React from 'react';
import Header from '../common/Header';
import { FormComponentProps } from 'antd/es/form';
import { Form, Input, Button, Select, Upload, Icon, InputNumber } from 'antd';
import { phone } from '../../utils/pattern';
import RegisterStore, { RegisterStoreContext } from './stores/registerStore';

const Option = Select.Option;

const FormItem = Form.Item;

const { useContext, useEffect } = React;

const RegisterForm: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    useEffect(() => {
        form.validateFields(['phone']);
    }, []);

    const store = useContext(RegisterStoreContext);

    const { loading, imgUrl, codeNum, actions } = store;

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className='ant-upload-text'>Upload</div>
        </div>
    );

    const validConfirmPassword = (rule: any, value: any, callback: any) => {
        let password = form.getFieldValue('password');
        if (value !== password) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };

    const phoneError = isFieldTouched('phone') && getFieldError('phone');

    return (
        <div className='register-form-wrapper'>
            <Form className='register-form' {...formItemLayout}>
                <div className='form-left'>
                    <FormItem label='用户名'>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名不为空' }]
                        })(
                            <Input
                                placeholder='请输入用户名'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='密码'>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码不为空' }]
                        })(
                            <Input
                                type='password'
                                placeholder='请输入密码'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='确认密码'>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                { required: true, message: '再次确认密码' },
                                { validator: validConfirmPassword }
                            ]
                        })(
                            <Input
                                type='password'
                                placeholder='再次输入密码'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='邮箱'>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: '邮箱不为空' },
                                { type: 'email', message: '邮箱格式错误' }
                            ]
                        })(
                            <Input
                                placeholder='请输入邮箱'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='手机号' validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: '手机号不为空' },
                                { pattern: phone, message: '手机号格式错误' }
                            ]
                        })(
                            <Input
                                placeholder='请输入手机号'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='验证码' className='phone-code'>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '验证码不为空' }]
                        })(
                            <Input
                                placeholder='请输入验证码'
                                autoComplete='off'
                            />
                        )}
                        <Button
                            type='primary'
                            className='primary-button'
                            disabled={!!getFieldError('phone') || codeNum !== 60}
                            onClick={() => actions.sendCode(form.getFieldValue('phone'))}
                        >
                            {
                                codeNum !== 60
                                    ? `${codeNum}s`
                                    : '发送'
                            }
                        </Button>
                    </FormItem>
                </div>
                <div className='form-right'>
                    <FormItem label='年龄'>
                        {getFieldDecorator('age', {
                            rules: [
                                { required: true, message: '年龄不为空' }
                            ]
                        })(
                            <InputNumber
                                placeholder='请输入年龄'
                                autoComplete='off'
                                min={3}
                                max={100}
                            />
                        )}
                    </FormItem>
                    <FormItem label='性别'>
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: '性别不为空' }]
                        })(
                            <Select placeholder='请选择性别'>
                                <Option value='male'>男性</Option>
                                <Option value='female'>女性</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label='个性签名'>
                        {getFieldDecorator('signature', {
                            rules: [{ required: true, message: '请输入个性签名' }]
                        })(
                            <Input
                                placeholder='请输入个性签名'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='头像'>
                        {getFieldDecorator('headImg', {
                            rules: [{ required: true, message: '请上传头像' }],
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile
                        })(
                            <Upload
                                name='file'
                                listType='picture-card'
                                className='avatar-uploader'
                                showUploadList={false}
                                action='http://localhost:3000/api/common/upload'
                                beforeUpload={actions.beforeUpload}
                                onChange={actions.handleUploadChange}
                            >
                                { imgUrl ? <img src={imgUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                </div>
            </Form>
            <div className='register-footer'>
                <Button
                    type='primary'
                    className='primary-button'
                    onClick={() => actions.register(form)}
                >注册</Button><br />
                <a href='/login'>前往登陆</a>
            </div>
        </div>
    );
};

const RegisterFormWrapper = Form.create({})(RegisterForm);

const Register: React.FunctionComponent<FormComponentProps> = () => {
    return (
        <div className='home'>
            <Header />
            <RegisterStore>
                <RegisterFormWrapper />
            </RegisterStore>
        </div>
    );
};

export default Register;
