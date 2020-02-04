import * as React from 'react';
import { Form, Switch, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

const FormItem = Form.Item;

const PermissionSetting: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator } = form;

    return (
        <>
            <Form layout='inline' className='filter-form permission-setting-form'>
                <FormItem label='展示对局信息'>
                    {
                        getFieldDecorator('showFight', {})(
                            <Switch defaultChecked />
                        )
                    }
                </FormItem>
                <FormItem label='展示个人信息'>
                    {
                        getFieldDecorator('showPersonal', {})(
                            <Switch defaultChecked />
                        )
                    }
                </FormItem>
            </Form>
            <div className='setting-footer m-t-24 t-r'>
                <Button type='primary' className='primary-button m-r-16'>保存配置</Button>
                <Button type='default' className='default-button'>恢复默认</Button>
            </div>
        </>
    );
};

export default Form.create({})(PermissionSetting);
