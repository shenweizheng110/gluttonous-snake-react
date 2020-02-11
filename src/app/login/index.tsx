import * as React from 'react';
import Header from '../common/Header';
import { FormComponentProps } from 'antd/es/form';
import { Form, Input, Icon, Button } from 'antd';
import LoginStore, { LoginStoreContext } from './stores/loginStore';

const FormItem = Form.Item;

const { useContext } = React;

const LoginForm: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator } = form;

    const store = useContext(LoginStoreContext);

    const { actions } = store;

    return (
        <div className='login-form-wrapper'>
            <Form className='login-form'>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '用户名不为空' }]
                    })(
                        <Input
                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='用户名/手机/邮箱'
                            autoComplete='off'
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不为空' }]
                    })(
                        <Input
                            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type='password'
                            placeholder='密码'
                            autoComplete='off'
                        />
                    )}
                </FormItem>
                <Form.Item>
                    <Button
                        type='primary'
                        className='login-form-button primary-button'
                        onClick={() => actions.login(form)}
                    >
                        登陆
                    </Button>
                    <span className='login-footer'>
                        <a href='javascript:;'>忘记密码</a>
                        <a href='/register'>前往注册</a>
                    </span>
                </Form.Item>
            </Form>
        </div>
    );
};

const LoginFormWrapper = Form.create({})(LoginForm);

const LoginRoot: React.FunctionComponent = () => {
    return (
        <div className='home'>
            <Header />
            <LoginStore>
                <LoginFormWrapper />
            </LoginStore>
        </div>
    );
};

export default LoginRoot;
