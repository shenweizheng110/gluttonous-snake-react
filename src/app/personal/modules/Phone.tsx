import * as React from 'react';
import { FormComponentProps } from 'antd/es/Form';
import { Form, Input, Button } from 'antd';
import { PersonalStoreContext } from '../stores/personalStore';
import { phone } from '../../../utils/pattern';

const FormItem = Form.Item;

const { useContext, useEffect } = React;

const Phone: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;

    const store = useContext(PersonalStoreContext);

    const { actions, codeNum, userInfo } = store;

    useEffect(() => {
        form.validateFields(['phone']);
    }, []);

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

    const phoneError = isFieldTouched('phone') && getFieldError('phone');

    return (
        <>
            <Form {...formItemLayout} className='phone-form'>
                <FormItem label='旧手机号'>
                    {getFieldDecorator('oldPhone', {
                        initialValue: userInfo && userInfo.phone
                    })(
                        <Input
                            disabled
                            placeholder='请输入手机号'
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
                <FormItem label='新手机号' validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
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
            </Form>
            <div className='setting-footer m-t-24 t-r'>
                <Button
                    type='primary'
                    className='primary-button m-r-16'
                    onClick={() => actions.handleChangePhone(form)}
                >保存修改</Button>
            </div>
        </>
    );
};

export default Form.create({})(Phone);
