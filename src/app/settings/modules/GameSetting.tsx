import * as React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Form, Input, Button, Select } from 'antd';
import { SettingsStoreContext } from '../stores/settingsStrore';
import snakeNodeColors from '../../../utils/snakeNodeColors';

const { useContext } = React;

const Option = Select.Option;

const FormItem = Form.Item;

const GameSetting: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const store = useContext<SettingsDTS.SettingsStore>(SettingsStoreContext);

    const { userConfig, actions } = store;

    const { getFieldDecorator } = form;

    return (
        <>
            <Form layout='inline' className='filter-form game-setting-form'>
                <FormItem label='初始速度'>
                    {
                        getFieldDecorator('initSpeed', {
                            rules: [
                                { required: true, message: '初始速度不为空' },
                                { pattern: /^([1-9]|10)$/, message: '范围1～10' }
                            ],
                            initialValue: userConfig && userConfig.initSpeed
                        })(
                            <Input
                                placeholder='请输入初始速度'
                                className='filter-input'
                                autoComplete='off'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='初始方向'>
                    {
                        getFieldDecorator('initDirection', {
                            rules: [
                                { required: true, message: '初始方向不为空' }
                            ],
                            initialValue: userConfig && userConfig.initDirection
                        })(
                            <Select placeholder='请选择初始方向'>
                                <Option value='Top'>上</Option>
                                <Option value='Bottom'>下</Option>
                                <Option value='Left'>左</Option>
                                <Option value='Right'>右</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='警告颜色'>
                    {
                        getFieldDecorator('dangerColor', {
                            rules: [
                                { required: true, message: '警告颜色不为空' },
                                { pattern: /^#\w{6}$/, message: '格式为#六位颜色值, 例如#000000' }
                            ],
                            initialValue: userConfig && userConfig.dangerColor
                        })(
                            <Input
                                placeholder='请输入警告颜色'
                                className='filter-input'
                                autoComplete='off'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='蛇睛颜色'>
                    {
                        getFieldDecorator('eyeColor', {
                            rules: [
                                { required: true, message: '蛇睛颜色不为空' },
                                { pattern: /^#\w{6}$/, message: '格式为#六位颜色值, 例如#000000' }
                            ],
                            initialValue: userConfig && userConfig.eyeColor
                        })(
                            <Input
                                placeholder='请输入蛇睛颜色'
                                className='filter-input'
                                autoComplete='off'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='节点颜色'>
                    <div className='node-color-choose-area'>
                        {
                            snakeNodeColors.map((item, index) => (
                                <span
                                    key={index}
                                    className='node-color-item'
                                    style={{ backgroundColor: item }}
                                    onClick={() => actions.handleAddNodeColor(item)}
                                ></span>
                            ))
                        }
                    </div>
                </FormItem>
                <FormItem label='已选颜色'>
                    <div className='node-color-choose-area'>
                        {
                            userConfig && userConfig.nodeColor.map((item, index) => (
                                <span
                                    key={index}
                                    className='node-color-item'
                                    style={{ backgroundColor: item }}
                                    onClick={() => actions.handleRemoveNodeColor(index)}
                                ></span>
                            ))
                        }
                    </div>
                </FormItem>
            </Form>
            <div className='setting-footer m-t-24 t-r'>
                <Button
                    type='primary'
                    className='primary-button m-r-16'
                    onClick={() => actions.updateGameSetting(sessionStorage.getItem('userId'), form)}
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

export default Form.create({})(GameSetting);
