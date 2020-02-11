import * as React from 'react';
import { FormComponentProps } from 'antd/es/Form';
import { Form, Input, Button } from 'antd';
import { PersonalStoreContext } from '../stores/personalStore';

const FormItem = Form.Item;

const { useContext } = React;

const Password: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator } = form;

    const store = useContext(PersonalStoreContext);

    const { actions } = store;

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

    const validConfirmPassword = (rule: any, value: any, callback: any) => {
        let password = form.getFieldValue('newPassword');
        if (value !== password) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };

    return (
        <>
            <Form {...formItemLayout} className='phone-form'>
                <FormItem label='旧密码'>
                    {getFieldDecorator('oldPassword', {
                        rules: [{ required: true, message: '密码不为空' }]
                    })(
                        <Input
                            type='password'
                            placeholder='请输入密码'
                            autoComplete='off'
                        />
                    )}
                </FormItem>
                <FormItem label='新密码'>
                    {getFieldDecorator('newPassword', {
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
            <div className='setting-footer m-t-24 t-r'>
                <Button
                    type='primary'
                    className='primary-button m-r-16'
                    onClick={() => actions.handleChangePassword(form)}
                >保存修改</Button>
            </div>
        </>
    );
};

export default Form.create({})(Password);
