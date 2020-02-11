import * as React from 'react';
import { Form, Switch, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { SettingsStoreContext } from '../stores/settingsStrore';

const { useContext } = React;

const FormItem = Form.Item;

const PermissionSetting: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const store = useContext<SettingsDTS.SettingsStore>(SettingsStoreContext);

    const { userConfig, actions } = store;

    const { getFieldDecorator } = form;

    return (
        <>
            <Form layout='inline' className='filter-form permission-setting-form'>
                <FormItem label='展示对局信息'>
                    {
                        getFieldDecorator('showFight', {
                            initialValue: userConfig && userConfig.showFight === 1,
                            valuePropName: 'checked'
                        })(
                            <Switch />
                        )
                    }
                </FormItem>
                <FormItem label='展示个人信息'>
                    {
                        getFieldDecorator('showPersonal', {
                            initialValue: userConfig && userConfig.showPersonal === 1,
                            valuePropName: 'checked'
                        })(
                            <Switch />
                        )
                    }
                </FormItem>
            </Form>
            <div className='setting-footer m-t-24 t-r'>
                <Button
                    type='primary'
                    className='primary-button m-r-16'
                    onClick={() => actions.updatePersonalPermissionSetting(sessionStorage.getItem('userId'), form)}
                >保存配置</Button>
                {/* <Button
                    type='default'
                    className='default-button'
                    onClick={actions.handleRebackToInit}
                >恢复默认</Button> */}
            </div>
        </>
    );
};

export default Form.create({})(PermissionSetting);
