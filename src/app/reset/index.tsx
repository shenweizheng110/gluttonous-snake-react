import * as React from 'react';
import Header from '../common/Header';
import { FormComponentProps } from 'antd/es/form';
import { Form, Input, Button } from 'antd';
import { phone } from '../../utils/pattern';
import ResetStore, { ResetStoreContext } from './stores/resetStore';

const FormItem = Form.Item;

const { useContext, useEffect } = React;

const ResetForm: React.FunctionComponent<FormComponentProps> = ({ form }) => {
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

    const store = useContext<ResetDTS.Store>(ResetStoreContext);

    const { codeNum, actions } = store;

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
        <div className='reset-form-wrapper'>
            <Form className='register-form' {...formItemLayout}>
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
                <FormItem label='新密码'>
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
            </Form>
            <div className='register-footer'>
                <Button
                    type='primary'
                    className='primary-button'
                    onClick={() => actions.resetPassword(form)}
                >重置密码</Button><br />
                <a href='/login'>前往登陆</a>
            </div>
        </div>
    );
};

const ResetFormWrapper = Form.create({})(ResetForm);

const Reset: React.FunctionComponent<FormComponentProps> = () => {
    return (
        <div className='home'>
            <Header />
            <ResetStore>
                <ResetFormWrapper />
            </ResetStore>
        </div>
    );
};

export default Reset;
